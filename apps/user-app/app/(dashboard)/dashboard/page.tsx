import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { ActionCard } from "../../../components/ActionCard";
import { RecentTransfers } from "../../../components/RecentTransfers";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const p2pTxns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }, include: {
            toUser: {
                select: {
                    name: true,
                }
            }
        },orderBy: {
            timestamp: 'desc'  // Order by timestamp descending
        }
    });
    return p2pTxns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        sentTo: t.toUser.name
    }))

}
async function getP2PTransactionsFrom() {
    const session = await getServerSession(authOptions);
    const p2pTxns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        }, include: {
            fromUser: {
                select: {
                    name: true,
                }
            }
        },orderBy: {
            timestamp: 'desc'  // Order by timestamp descending
        }
    });
    return p2pTxns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        sentFrom: t.fromUser.name
    }))

}

export default async function () {
    const session = await getServerSession(authOptions);
    const balance = await getBalance();
    const transactionsFrom = await getP2PTransactionsFrom();
    const transactionsTo = await getP2PTransactions();
    const toSentenceCase = (name: string | undefined) => {
        if (!name) return "";
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    return <div className="w-full">
        <div className="font-bold text-left text-2xl p-2 ">
            Hi, {toSentenceCase(session?.user?.name)}.
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
            <ActionCard />
            <RecentTransfers transactionsFrom={transactionsFrom} transactionsTo={transactionsTo} />
        </div>
    </div>

}
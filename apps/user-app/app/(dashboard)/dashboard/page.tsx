import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { ActionCard } from "../../../components/ActionCard";
import { RecentTransfers } from "../../../components/RecentTransfers";
import ErrorPage from "../../../components/ErrorPage";

async function getBalance(userId: number) {
    const balance = await prisma.balance.findFirst({
        where: { userId }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}

async function getP2PTransactions(userId: number) {
    const p2pTxns = await prisma.p2pTransfer.findMany({
        where: { fromUserId: userId },
        include: { toUser: { select: { name: true } } },
        orderBy: { timestamp: "desc" }
    });
    return p2pTxns.map((t: typeof p2pTxns[0]) => ({
        time: t.timestamp,
        amount: t.amount,
        sentTo: t.toUser.name
    }));
}

async function getP2PTransactionsFrom(userId: number) {
    const p2pTxns = await prisma.p2pTransfer.findMany({
        where: { toUserId: userId },
        include: { fromUser: { select: { name: true } } },
        orderBy: { timestamp: "desc" }
    });
    return p2pTxns.map((t: typeof p2pTxns[0]) => ({
        time: t.timestamp,
        amount: t.amount,
        sentFrom: t.fromUser.name
    }));
}

const toSentenceCase = (name: string | null | undefined) => {
    if (!name) return "";
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return (
            <div>
                <ErrorPage/>
            </div>
        );
    }

    const userId = Number(session.user.id);
    const balance = await getBalance(userId);
    const transactionsFrom = await getP2PTransactionsFrom(userId);
    const transactionsTo = await getP2PTransactions(userId);

    return (
        <div className="w-full">
            <div className="font-bold text-left text-2xl p-2">
                Hi, {toSentenceCase(session.user.name)}.
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <ActionCard />
                <RecentTransfers transactionsFrom={transactionsFrom} transactionsTo={transactionsTo} />
            </div>
        </div>
    );
}
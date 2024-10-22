import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { P2PTransactionsFrom } from "../../../components/P2PTransactionFrom";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { WithdrawTransactions } from "../../../components/WithdrawTxns";

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
        },include:{
            toUser:{
                select:{
                    name : true,
                }
            }
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
        },include:{
            fromUser:{
                select:{
                    name : true,
                }
            }
        }
    });
    return p2pTxns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        sentFrom: t.fromUser.name
    }))
    
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

async function getWithdrawalTxns() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.withdrawals.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function () {
    const balance = await getBalance();
    const p2pTransctions = await getP2PTransactions();
    const p2pTransctionsFrom = await getP2PTransactionsFrom();
    const transactions = await getOnRampTransactions();
    const withdrawals = await getWithdrawalTxns()

    return <div className="w-full">
        <div className="text-4xl text-center text-[#6a51a6] pt-4 mb-4 font-bold">
            Transactions
        </div>
            <div className="p-4">
                <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div><P2PTransactions transactions={p2pTransctions}/></div>
                <div><P2PTransactionsFrom transactions ={p2pTransctionsFrom}/></div>
                <div><OnRampTransactions transactions={transactions} /></div>
                <div><WithdrawTransactions transactions={withdrawals} /></div>
            
        </div>
    </div>
}
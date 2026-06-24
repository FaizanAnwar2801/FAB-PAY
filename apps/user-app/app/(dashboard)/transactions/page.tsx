import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { P2PTransactionsFrom } from "../../../components/P2PTransactionFrom";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { WithdrawTransactions } from "../../../components/WithdrawTxns";
import ErrorPage from "../../../components/ErrorPage";


async function getBalance(userId: number) {
    const balance = await prisma.balance.findFirst({
        where: {
            userId
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getP2PTransactions(userId: number) {
    const p2pTxns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: userId},
            include:{toUser:{select:{name : true}}},
            orderBy: {timestamp: 'desc'}  // Order by timestamp descending
    });

    return p2pTxns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        sentTo: t.toUser.name
    }));
    
};

async function getP2PTransactionsFrom(userId:number) {
    const p2pTxns = await prisma.p2pTransfer.findMany({
        where: {toUserId: userId},
        include:{fromUser:{select:{name : true,}}},
        orderBy: {timestamp: 'desc'}  // Order by timestamp descending

    });
    return p2pTxns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        sentFrom: t.fromUser.name
    }));
    
};

async function getOnRampTransactions(userId:number) {
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: userId},
            orderBy: {startTime: 'desc' } // Order by timestamp descending
        
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
};

async function getWithdrawalTxns(userId:number) {
    const txns = await prisma.withdrawals.findMany({
        where: {userId: userId},
        orderBy: {startTime: 'desc'}  // Order by timestamp descending
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
};

export default async function () {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return <ErrorPage/>;
    }

    const userId = Number(session.user.id);
    const balance = await getBalance(userId);
    const p2pTransctions = await getP2PTransactions(userId);
    const p2pTransctionsFrom = await getP2PTransactionsFrom(userId);
    const transactions = await getOnRampTransactions(userId);
    const withdrawals = await getWithdrawalTxns(userId)

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
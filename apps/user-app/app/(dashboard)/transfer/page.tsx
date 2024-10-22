import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { WithdrawMoney } from "../../../components/WithdrawMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
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

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    const withdrawals = await getWithdrawalTxns()

    return <div className="w-full">
        <div className="text-4xl text-center text-[#6a51a6] pt-4 mb-4 font-bold">
            Bank Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div className="space-y-4">
                <AddMoney />
                <WithdrawMoney/>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4 space-y-4">
                    <OnRampTransactions transactions={transactions} />
                    <WithdrawTransactions transactions={withdrawals} />
                </div>
            </div>
        </div>
    </div>
}
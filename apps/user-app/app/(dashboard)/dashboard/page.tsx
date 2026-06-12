import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { ActionCard } from "../../../components/ActionCard";
import { RecentTransfers } from "../../../components/RecentTransfers";
import Link from "next/link";

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
            <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-10 flex flex-col items-center gap-4 max-w-sm w-full">
                    <div className="text-4xl">🔒</div>
                    <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
                    <p className="text-gray-500 text-sm text-center">
                        You must be signed in to view the dashboard.
                    </p>
                    <Link
                        href="/"
                        className="mt-2 w-full text-center text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 transition-colors duration-150 rounded-lg px-5 py-2.5"
                    >
                        Return to Home
                    </Link>
                </div>
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
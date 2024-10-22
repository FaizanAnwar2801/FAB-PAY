import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";

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


export default async function () {
    const session = await getServerSession(authOptions);
    const balance = await getBalance();
    const toSentenceCase = (name: string | undefined) => {
        if (!name) return "";
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    return <div className="w-full">
        <div className="font-bold text-left text-2xl p-2 ">
            Hi, {toSentenceCase(session?.user?.name)}.
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>
    </div>
    
}
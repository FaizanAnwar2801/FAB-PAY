"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createWithdrawals(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        };
    }

    await prisma.$transaction(async (tx) => {
        // for update as locking method (prevents negative balance.)
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session?.user?.id)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(session?.user?.id) },
        });
        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
        }
        const token = (Math.random() * 1000).toString(); // supposed to be fetched from the bank API
        await tx.withdrawals.create({
            data: {
                provider,
                status: "Processing",
                startTime: new Date(),
                token: token,
                userId: Number(session?.user?.id),
                amount: amount * 100,
            },
        });
    });

    return {
        message: "Done",
    };
}

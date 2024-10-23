import { Card } from "@repo/ui/card";

export const RecentTransfers = ({
    transactionsFrom,
    transactionsTo
}: {
    transactionsFrom: {
        time: Date,
        amount: number,
        sentFrom: string | null,
    }[],
    transactionsTo: {
        time: Date,
        amount: number,
        sentTo: string | null,
    }[]
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Transfers From User */}
            <Card title="Transfers From User">
                <div className="pt-2">
                    {transactionsFrom.length ? (
                        transactionsFrom.slice(0, 10).map(t => (
                            <div className="flex justify-between">
                                <div>
                                    <div className="text-slate-600 text-sm font-bold">
                                        From {t.sentFrom}
                                    </div>
                                    <div className="text-xs">Sent INR</div>
                                    <div className="text-slate-600 text-xs">
                                        {t.time.toDateString()}
                                    </div>
                                </div>
                                <div className="text-red-600 flex flex-col justify-center">
                                    - Rs {t.amount / 100}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center pb-8 pt-8">No Recent transfers</div>
                    )}
                </div>
            </Card>

            {/* Transfers To User */}
            <Card title="Transfers To User">
                <div className="pt-2">
                    {transactionsTo.length ? (
                        transactionsTo.slice(0, 10).map(t => (
                            <div className="flex justify-between">
                                <div>
                                    <div className="text-slate-600 text-sm font-bold">
                                        To {t.sentTo}
                                    </div>
                                    <div className="text-xs">Received INR</div>
                                    <div className="text-slate-600 text-xs">
                                        {t.time.toDateString()}
                                    </div>
                                </div>
                                <div className="text-green-600 flex flex-col justify-center">
                                    + Rs {t.amount / 100}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center pb-8 pt-8">No Recent transfers</div>
                    )}
                </div>
            </Card>
        </div>
    );
};

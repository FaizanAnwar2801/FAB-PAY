import { Card } from "@repo/ui/card"

export const P2PTransactions = ({
    transactions
}: {
    transactions: {
    
        time: Date,
        amount: number,
        sentTo: string | null,
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Transfers To User">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Transfers To User">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                <div className="text-slate-600 text-sm font-bold">
                        To {t.sentTo}
                    </div>
                    <div className="text-xs">
                        Sent INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}

                    </div>
                </div>
                <div className="text-red-600 flex flex-col justify-center">
                    - Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}
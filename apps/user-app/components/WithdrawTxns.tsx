import { Card } from "@repo/ui/card"

type TransactionStatus = "Success" | "Processing" | "Failure";

export const WithdrawTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: TransactionStatus,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Withdrawals To Bank">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    const getStatusColor = (status: TransactionStatus) => {
        switch (status) {
            case "Success":
                return "text-green-700";
            case "Processing":
                return "text-yellow-500";
            case "Failure":
                return "text-red-500";
            default:
                return "text-gray-700"; // Fallback for unknown statuses
        }
    };

    return <Card title="Withdrawals To Bank">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Withdrawn INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.provider}
                    </div>
                    <div className={`text-xs font-bold ${getStatusColor(t.status)}`}>
                        {t.status}
                    </div>

                </div>
                <div className="flex flex-col justify-center text-red-600">
                    - Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}
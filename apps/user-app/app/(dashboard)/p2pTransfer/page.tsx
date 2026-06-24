import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import ErrorPage from "../../../components/ErrorPage";


// TODO: Add pop-up for successful transfer.
export default async function P2PTransfer() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return <ErrorPage/>;
    }

    return (
        <div className="w-full pt-4 text-center font-bold">
            <SendCard />
        </div>
    );
}
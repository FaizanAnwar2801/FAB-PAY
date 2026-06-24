import React from "react";
import Link from "next/link";

interface ErrorPageProps {
    pageName?: string;
}

const ErrorPage = ({ pageName }: ErrorPageProps) => {
    const page = pageName ?? "this page";

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-10 flex flex-col items-center gap-4 max-w-sm w-full">
                <div className="text-4xl">🔒</div>
                <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
                <p className="text-gray-500 text-sm text-center">
                    You must be signed in to view {page}.
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
};

export default ErrorPage;
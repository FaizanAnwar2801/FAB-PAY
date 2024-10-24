"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const ActionCardItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    pathname === href

    return <div className="cursor-pointer text-slate-500 hover:text-[#6a51a6]" onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className="font-bold cursor-pointer text-slate-500 hover:text-[#6a51a6]">
            {title}
        </div>
    </div>
}
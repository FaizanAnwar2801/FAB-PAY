"use client"
import React from 'react';
import { useRouter } from "next/navigation";

const Hero = () => {
    const router = useRouter()
    return (
        <section className="text-center py-16 bg-gray-50">
            <h1 className="text-4xl font-bold mb-4">Your Digital Wallet for Seamless Transactions</h1>
            <p className="text-lg mb-8">Secure. Fast. Effortless.</p>
            <div className="space-x-4">
                <button className="bg-gray-800 hover:bg-gray-600 text-white py-3 px-8 rounded-lg" onClick={()=>{router.push("/api/auth/signin")}}>Sign-Up</button>
                <button className="bg-transparent hover:bg-blue-100 text-blue-500 py-3 px-6 rounded-lg">Learn More</button>
            </div>
        </section>
    );
};

export default Hero;

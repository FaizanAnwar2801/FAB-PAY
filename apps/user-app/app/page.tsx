import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Security from "../components/Security";
import Footer from "../components/Footer";

// Adding a comment for test-PR
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    return <div>
      <Hero />
      <Features />
      <Security />
      <Footer />
    </div>

  }
}
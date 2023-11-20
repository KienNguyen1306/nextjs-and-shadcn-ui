import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-2 p-24 ${inter.className}`}
    >
      <div>HOME PAGE</div>
      <Button asChild>
        <Link href="/login">xem thông tin cá nhân</Link>
      </Button>
    </main>
  );
}

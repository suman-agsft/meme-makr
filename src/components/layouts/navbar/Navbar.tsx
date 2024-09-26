"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToogle";
import AppLogo from "../../../assets/icons/makrai-logo.svg";

export default function Navbar() {
  const router = useRouter();
  const handleNavigateToSignIn = () => {
    router.push("/signin");
  };
  return (
    <nav className="flex items-center justify-between p-4 m-0 bg-background">
      <Link href="/" className="text-2xl font-bold">
        <Image src={AppLogo} alt="logo" height={50} width={50} />
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Button
          variant="outline"
          className="rounded-full border-gray"
          onClick={handleNavigateToSignIn}
        >
          Sign in
        </Button>
      </div>
    </nav>
  );
}

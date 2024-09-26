"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex items-center justify-center gap-4 p-4 text-[14px] text-gray-foreground">
      <p>meme.makr.ai 2024 © All rights reserved</p>
      <Link href="" className="underline">
        terms
      </Link>
      <Link href="" className="underline">
        privacy
      </Link>
    </div>
  );
}

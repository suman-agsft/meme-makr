import { Button } from "@/components/ui/button";
import Image from "next/image";
import MemeCover from "../../assets/images/meme-cover.png";

export function EmptyMessageScreen() {
  return (
    <div className="mx-auto w-full  p-2">
      <div className="flex xs:flex-col md:items-center md:flex-row gap-4 rounded-[16px] border bg-secondary  p-8 ">
        <div className="rounded-[12px] !h-[6rem] !w-[6rem] overflow-hidden">
          <Image
            src={MemeCover}
            height={80}
            width={80}
            alt="cover"
            objectFit="cover"
            className="h-full w-full"
          />
        </div>
        <div className="flex flex-col flex-1">
          <p className="leading-normal text-gray">
            Welcome to <span className="font-[600]">Meme Makr</span>, anything
            you type will instantly generate a political meme.{" "}
            <span className="font-[600]">Enjoy!</span> ✨
          </p>
        </div>
      </div>
    </div>
  );
}

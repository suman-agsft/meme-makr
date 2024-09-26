"use client";

import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import TooltipComponent from "./TooltipComponent";
import { SendHorizonal } from "lucide-react";

export function PromptForm({
  input,
  setInput,
}: {
  input: string;
  setInput: (value: string) => void;
}) {
  const router = useRouter();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = React.useState<any>([]);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault();

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target["message"]?.blur();
        }

        const value = input.trim();
        setInput("");
        if (!value) return;

        // Optimistically add user message UI
        // setMessages((currentMessages: any) => [
        //   ...currentMessages,
        //   {
        //     id: nanoid(),
        //     display: <UserMessage>{value}</UserMessage>,
        //   },
        // ]);

        // Submit and get response message
        // const responseMessage = await submitUserMessage(value);
        // setMessages((currentMessages: any) => [
        //   ...currentMessages,
        //   responseMessage,
        // ]);
      }}
    >
      <div className="relative flex items-center justify-between h-[2.8rem] bg-background    overflow-hidden  rounded-full ">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="What meme do you want to create today?..."
          className=" w-full resize-none  px-4 py-8   border-0 ring-0 hover:ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0 sm:text-sm "
          name="message"
          rows={1}
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
        />
        <TooltipComponent label="Send Message">
          <Button
            type="submit"
            size="icon"
            className=" rounded-none !h-full w-16 bg-background border-l-2 border-gray-300 dark:border-gray-800  cursor-pointer"
            disabled={input === ""}
          >
            <SendHorizonal />
          </Button>
        </TooltipComponent>
      </div>
    </form>
  );
}

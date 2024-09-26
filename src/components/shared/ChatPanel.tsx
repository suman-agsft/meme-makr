import * as React from "react";
import { ButtonScrollToBottom } from "./ButtonScrollToBottom";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { SendHorizonal } from "lucide-react";

export interface ChatPanelProps {
  currentUserMessage: string;
  setCurrentUserMessage: (value: string) => void;
  handleNewMessage: (e: any) => void;
  sendMessage: (message: string) => void;
  streamingFinish: boolean;
  textStreaming: string;
  stopStreaming: () => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
  handleSendMessage: (value: string) => void;
}

export function ChatPanel({
  currentUserMessage,
  setCurrentUserMessage,
  handleNewMessage,
  sendMessage,
  streamingFinish,
  textStreaming,
  stopStreaming,
  isAtBottom,
  scrollToBottom,
  handleSendMessage,
}: ChatPanelProps) {
  return (
    <div className="inset-x-0 bottom-0  w-full duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 ">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <div className="space-y-4 bg-secondary p-2 shadow-lg rounded-full sm:border mb-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(currentUserMessage);
          }}
          className="relative flex items-center"
        >
          <div className="relative flex items-center justify-between h-[2.8rem] w-full bg-background    overflow-hidden  rounded-full ">
            <Textarea
              tabIndex={0}
              placeholder="What meme do you want to create today?..."
              className=" w-full resize-none  px-4 pt-6   border-0 ring-0 hover:ring-0 focus:outline-none focus:ring-0 focus-visible:ring-0 sm:text-sm "
              onChange={(e) =>
                setCurrentUserMessage(e.target.value.replace(/^\s+/, ""))
              }
              onKeyDown={handleNewMessage}
              value={currentUserMessage}
            />
            <Button
              type="submit"
              size="icon"
              className=" rounded-none !h-full w-16 bg-background border-l-2 border-gray-300 dark:border-gray-800  cursor-pointer"
              disabled={
                currentUserMessage.trim().length === 0 || !streamingFinish
              }
            >
              <SendHorizonal />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

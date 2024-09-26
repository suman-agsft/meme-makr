import { Separator } from "@/components/ui/separator";
import { Bot, User } from "lucide-react";
import { ConversationMessageType, CharacterType } from "@/common/types";
import Image from "next/image";

interface ChatListProps {
  messages: ConversationMessageType[];
  currentCharacter: CharacterType;
  getImageUrl: (character: CharacterType) => string;
  mediaTypes: Record<string, { mimeType: string; fileName: string }>;
}

export function ChatList({
  messages,
  currentCharacter,
  getImageUrl,
  mediaTypes,
}: ChatListProps) {
  return (
    <div className="relative w-full  px-4">
      {messages?.map((message, index) => (
        <div key={message.id}>
          <div
            className={`flex items-end gap-2 ${
              message.sender !== "assistant" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "assistant" && (
              <div className="w-8 h-8  rounded-full overflow-hidden">
                <Image
                  src={getImageUrl(currentCharacter)}
                  alt={currentCharacter.characterName}
                  width={32}
                  height={32}
                  objectFit="cover"
                  className="h-full w-full"
                />
              </div>
            )}
            <div
              className={`max-w-[90%] p-2 px-4 ${
                message.sender !== "assistant"
                  ? "text-gray rounded-[20px] rounded-br-none bg-secondary"
                  : "text-gray rounded-[20px] rounded-bl-none bg-secondary"
              }`}
            >
              {message.mediaUrls && message.mediaUrls.length > 0 ? (
                <div
                  className={`${
                    message.mediaUrls.length > 1 ? "w-36 h-36" : "w-64 h-72"
                  } grid grid-cols-1 gap-2`}
                >
                  {message.mediaUrls.map(
                    (mediaUrl: string, mediaIndex: number) => (
                      <div
                        key={mediaIndex}
                        className="overflow-auto subtle-scrollbar"
                      >
                        {mediaTypes[mediaUrl]?.mimeType ===
                        "application/pdf" ? (
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-8 h-8 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            <span>{mediaTypes[mediaUrl].fileName}</span>
                          </div>
                        ) : (
                          <>
                            {message.mediaUrls && (
                              <Image
                                src={mediaUrl}
                                alt={`media_${mediaIndex}`}
                                width={message.mediaUrls.length > 1 ? 144 : 256}
                                height={
                                  message.mediaUrls.length > 1 ? 144 : 288
                                }
                                className="cursor-pointer rounded-lg object-cover"
                              />
                            )}
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>
              ) : null}
              <p className="text-sm text-left">{message.message}</p>
            </div>
            {message.sender !== "assistant" && (
              <User className="text-gray-foreground" />
            )}
          </div>
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}

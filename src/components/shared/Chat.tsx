"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { ChatList } from "./ChatList";
import { EmptyMessageScreen } from "./EmptyMessageScreen";
import { ChatPanel } from "./ChatPanel";
import { useChatMessages } from "@/lib/hooks/use-chat-messages";
import Lottie from "lottie-react";
import TypingAnimationJson from "../../assets/icons/typing-animation.json";

import useSWR from "swr";
import Image from "next/image";
import { StorageHelper } from "@/services/StorageHelper";
import {
  CharacterType,
  ConversationMessageType,
  EnvType,
} from "@/common/types";
import { getFileFromURL, safeParse } from "@/lib/utils";
import { WS_ACTIONS } from "@/common/constants";
import { useUser } from "../providers/UserProvider";
import { useAppEnvironment, useGenerateImage } from "@/lib/hooks/common-hook";
import { initCharacterValues } from "@/common/initial-states";
import { createAxiosInstance } from "@/services/AxiosClient";

export const Chat = () => {
  const [currentUserMessage, setCurrentUserMessage] = useState<string>("");
  const [currentCharacter, setCurrentCharacter] =
    useState<CharacterType>(initCharacterValues);
  const [typing, setTyping] = useState<boolean>(false);
  const [streamingFinish, setStreamingFinish] = useState<boolean>(true);
  const [confirmationModalOn, setConfirmationModalOn] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});
  const [mediaTypes, setMediaTypes] = useState<
    Record<string, { mimeType: string; fileName: string }>
  >({});
  const isImageGeneratedRef = useRef(false);
  const isMessagesFetchedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>();

  const {
    messages,
    sendMessage,
    isLoading,
    textStreaming,
    stopStreaming,
    setMessages,
    currentConv,
    setCurrentConv,
  } = useChatMessages();
  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();
  const { user } = useUser();
  const { getImageUrl } = useGenerateImage();
  const { getEnv } = useAppEnvironment();

  const env: EnvType = getEnv();

  const participantId = "5364";

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom, scrollToBottom, textStreaming]);

  useEffect(() => {
    setStreamingFinish(true);
    StorageHelper.setValue(
      "env",
      process.env.NEXT_PUBLIC_ENV ? process.env.NEXT_PUBLIC_ENV : "dev"
    );
    const createUser = async () => {
      try {
        const env = getEnv() as EnvType;
        if (!env) {
          throw new Error("Environment is not set");
        }
        if (user) {
          setUserData(user);
          await getCharacterDetails();
          const storedConversation = StorageHelper.getValue("conversation");
          if (storedConversation) {
            setCurrentConv(JSON.parse(storedConversation));
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    createUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const initializeChat = async () => {
      if (userData) {
        // Initialize socket connection
        if (currentConv && currentConv.id && !isMessagesFetchedRef.current) {
          getMessages(currentConv.id);
        }
      }
    };

    initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, currentConv]);

  const genImage = async (assistantMessage: any) => {
    try {
      if (assistantMessage && assistantMessage.id) {
        isImageGeneratedRef.current = true;
        const payload = {
          message: assistantMessage.message,
          conversationId: assistantMessage.conversationId,
          stream: false,
          modelId: "black-forest-labs/flux-schnell",
          parentMessageId: assistantMessage.id,
          userId: userData.id,
          aspectRatio: "4:3",
        };
        const response = await fetch(
          "https://prod-talktoo-api.talktoo.ai/api/v1/messages/images",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              user: userData?.id,
            },
            body: JSON.stringify(payload),
          }
        );
        const generatedImageData = await response.json();
        if (generatedImageData.success) {
          setTyping(false);
          const message = generatedImageData.data;
          let newMsg: ConversationMessageType = message;
          setMessages((prevMessages) => [...prevMessages, newMsg]);
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
      isImageGeneratedRef.current = false;
    }
  };

  const getMessages = useCallback(async (conversationId: string) => {
    if (conversationId) {
      isMessagesFetchedRef.current = true;
      const response = await fetch(`
https://prod-talktoo-api.talktoo.ai/api/v1/messages/${conversationId}`);
      if (response.ok) {
        const msgs = await response.json();
        let newMediaTypes: Record<
          string,
          { mimeType: string; fileName: string }
        > = {};
        msgs.data.forEach((msg: ConversationMessageType) => {
          const messageContent =
            typeof msg.message === "string"
              ? safeParse(msg.message)
              : msg.message;
          if (typeof messageContent === "object" && messageContent?.media) {
            messageContent.media.forEach((mediaUrl: string) => {
              if (mediaUrl.endsWith(".pdf")) {
                const fileName = getFileFromURL(mediaUrl);
                newMediaTypes[mediaUrl] = {
                  mimeType: "application/pdf",
                  fileName,
                };
              }
            });
          }
        });
        setMediaTypes((prevMediaTypes) => ({
          ...prevMediaTypes,
          ...newMediaTypes,
        }));
        setMessages(msgs.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCharacterDetails = async () => {
    const response = await fetch(
      "https://prod-talktoo-api.talktoo.ai/api/v1/admin/characters?type=&limit=200&offset=0&globalFilter=Meme&sorting=[]&filters=[]"
    );
    if (response.ok) {
      const chars = await response.json();
      const char = chars.data.find(
        (c: CharacterType) => c.id === participantId
      );
      if (char) {
        setCurrentCharacter(char);
        const localStrgUserData = StorageHelper.getValue("user");

        if (localStrgUserData) {
          const user = JSON.parse(localStrgUserData || "");
          syncConversation(user?.id, char.id);
        }
      }
    }
  };

  const syncConversation = async (
    userId: string,
    characterId: string,
    newChat?: boolean
  ) => {
    const AxiosClient = createAxiosInstance("prod");
    const response = await AxiosClient.post(
      `https://prod-talktoo-api.talktoo.ai/api/v1/conversations`,
      { userId, participantId: characterId, newChat }
    );

    if (response.data) {
      const chats = response?.data;
      if (chats && chats.data?.length > 0) {
        StorageHelper.setValue("conversation", JSON.stringify(chats.data[0]));
        if (chats.data?.length === 1 && chats.data[0]?.id) {
          setCurrentConv(chats.data[0]);
        }
      }
    }
  };

  const handleSendMessage = async (value: string) => {
    if (value && streamingFinish) {
      scrollToBottom();
      await sendMessage(value);
      setCurrentUserMessage("");
      genImage({
        message: currentConv?.lastMessage?.message,
        conversationId: currentConv?.lastMessage?.conversationId,
        id: currentConv?.lastMessageId,
      });
    }
  };

  const handleNewMessage = async (e: any) => {
    let value = e.currentTarget.value.trim();

    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      value = value + "\n";
      setCurrentUserMessage(value);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage(value);
    }
  };

  return (
    <div className="flex justify-center mx-auto relative items-center flex-col h-full w-full  xs:w-full md:max-w-[55%] space-y-4  opacity-100 transition-opacity duration-300 ease-in-out   p-0">
      <div
        className="flex flex-col w-full overflow-auto  subtle-scrollbar p-2 h-full  rounded-lg "
        ref={scrollRef}
      >
        {messages.length > 0 ? (
          <ChatList
            messages={messages}
            currentCharacter={currentCharacter}
            getImageUrl={getImageUrl}
            mediaTypes={mediaTypes}
          />
        ) : (
          <EmptyMessageScreen />
        )}

        {textStreaming && (
          <div className="flex px-4  items-end  flex-row my-4 space-x-2">
            <div className="!w-8 !h-8 rounded-full ">
              <Image
                alt={currentCharacter.characterName}
                src={getImageUrl(currentCharacter)}
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
              />
            </div>
            <div className=" flex-1 max-w-[90%] rounded-bl-none bg-secondary rounded-[20px]  py-2 px-4 shadow-md">
              <p className="text-gray text-sm text-left">{textStreaming}</p>
            </div>
          </div>
        )}
        {typing && (
          <div className="flex items-end flex-row w-full  px-4 my-4 space-x-2">
            <div className="w-8 h-8 rounded-full ">
              <Image
                alt={currentCharacter.characterName}
                src={getImageUrl(currentCharacter)}
                className="w-full h-full rounded-full"
                width={32}
                height={32}
              />
            </div>
            <div className="rounded-bl-none bg-secondary rounded-[20px]  p-1 shadow-md">
              <Lottie
                animationData={TypingAnimationJson}
                loop={true}
                className="w-10"
              />
            </div>
          </div>
        )}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>

      <ChatPanel
        currentUserMessage={currentUserMessage}
        setCurrentUserMessage={setCurrentUserMessage}
        handleNewMessage={handleNewMessage}
        sendMessage={sendMessage}
        streamingFinish={streamingFinish}
        textStreaming={textStreaming}
        stopStreaming={stopStreaming}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;

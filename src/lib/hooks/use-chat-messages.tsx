import { useState, useCallback } from "react";
import { ConversationMessageType } from "@/common/types";
import { StorageHelper } from "@/services/StorageHelper";

export function useChatMessages() {
  const [messages, setMessages] = useState<ConversationMessageType[]>([]);
  const [textStreaming, setTextStreaming] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingFinish, setStreamingFinish] = useState(true);
  const [currentConv, setCurrentConv] = useState<any>({});

  const sendMessageToAPI = useCallback(
    async (
      payload: any,
      url: string,
      onLoad?: (streamText: string) => void,
      onFinish?: (streamText: string) => void
    ) => {
      return new Promise(async (resolve, _reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);

        xhr.onreadystatechange = async () => {
          if (xhr.readyState === 3 && xhr.status === 200) {
            onLoad?.(xhr.responseText);
          } else if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // Handle successful completion
            }
            onFinish?.(xhr.responseText);
            // setStreamingFinish(true);
            resolve(xhr.responseText);
          }
        };

        xhr.onerror = (event) => {
          console.error("Request error:", event);
        };

        const token = null;
        if (token) {
          xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        } else {
          const storedUser = StorageHelper.getValue("user");
          if (storedUser) {
            xhr.setRequestHeader("user", JSON.parse(storedUser).id);
          }
        }

        xhr.send(payload);
      });
    },
    []
  );

  const sendMessage = useCallback(
    async (content: string) => {
      // Create a new message locally
      const newMessage: ConversationMessageType = {
        id: Date.now().toString(),
        conversationId: currentConv.id, // Replace with actual ID
        sender: "user",
        message: content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isRead: false,
        isMedia: null,
        mediaText: null,
        mediaId: null,
        parentMessageId: null,
        mediaUrls: [],
      };

      // Update local state
      setMessages((prev) => [...prev, newMessage]);
      setIsLoading(true);

      const url = `
https://prod-talktoo-api.talktoo.ai/api/v1/messages/send`; // Update this to your actual endpoint
      const payload = {
        conversationId: currentConv.id, // Replace with actual conversation ID
        message: content,
        stream: true,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));

      // Call the sendMessageToAPI function
      await sendMessageToAPI(
        formData,
        url,
        (streamText) => {
          setTextStreaming(streamText);
        },
        (streamText) => {
          const assistantMessage: ConversationMessageType = {
            id: (Date.now() + 1).toString(),
            conversationId: currentConv.id, // Replace with actual ID
            sender: "assistant",
            message: streamText,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isRead: false,
            isMedia: null,
            mediaText: null,
            mediaId: null,
            parentMessageId: null,
            mediaUrls: [],
          };

          setMessages((prev) => [...prev, assistantMessage]);
          setTextStreaming("");
        }
      );

      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentConv]
  );

  const stopStreaming = useCallback(async () => {
    try {
      const response = await fetch("/api/stop-streaming", { method: "POST" });
      if (response.ok) {
        setTextStreaming("");
      }
    } catch (error) {
      console.error("Error stopping streaming:", error);
    }
  }, []);

  return {
    messages,
    setMessages,
    sendMessage,
    isLoading,
    textStreaming,
    stopStreaming,
    setCurrentConv,
    currentConv,
  };
}

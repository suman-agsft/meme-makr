"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useAppEnvironment } from "@/lib/hooks/common-hook";
import { StorageHelper } from "@/services/StorageHelper";
import { createAxiosInstance } from "@/services/AxiosClient";
import { EnvType, UserType } from "@/common/types";

type UserContextType = {
  user: UserType | null;
  setUserData: (user: UserType) => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const { getEnv } = useAppEnvironment();
  const isUserCreated = useRef(false);

  const setUserData = (userData: UserType) => {
    setUser(userData);
    StorageHelper.setValue("user", JSON.stringify(userData));
  };

  const createUserAsync = async ({
    environment,
    data,
  }: {
    environment: EnvType;
    data: any;
  }) => {
    const AxiosClient = createAxiosInstance(environment);
    const res = await AxiosClient.post("/users/sync", data);
    return res.data;
  };

  useEffect(() => {
    const createUser = async () => {
      const env: EnvType = (process.env.NEXT_PUBLIC_ENV as EnvType) || "dev";
      try {
        // const env = getEnv() as EnvType;
        if (!env) {
          throw new Error("Environment is not set");
        }
        const storedUser = StorageHelper.getValue("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          return;
        } else {
          const newUser = await createUserAsync({ environment: env, data: {} });
          if (newUser?.data) {
            setUserData(newUser.data);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    if (!user && !isUserCreated.current) {
      isUserCreated.current = true; // Mark as initiated
      createUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

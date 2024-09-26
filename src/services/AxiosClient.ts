"use-client";

import axios from "axios";
import { EnvType } from "../common/types";

export function createAxiosInstance(env: EnvType) {
  const AxiosClient = axios.create({
    baseURL: "https://prod-talktoo-api.talktoo.ai/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });
  //Request
  AxiosClient.interceptors.request.use(
    async (config: any) => {
      // const firebaseApp = initializeApp(fbConfig.FIREBASE_CREDENTIALS);

      // const appInstance = () => {
      //   return firebaseApp;
      // };
      // const app = appInstance();
      //   const auth = getFirebaseAuth();

      //   if (auth?.currentUser?.email) {
      //     console.log(auth.currentUser.email);
      //     const token = await auth.currentUser.getIdToken();
      //     if (token) {
      //       StorageHelper.setValue("accessToken", token);
      //       config.headers["Authorization"] = `Bearer ${token}`;
      //     }
      //   }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return AxiosClient;
}

import {
  CharacterType,
  CollectionType,
  EnvType,
  JourneyType,
} from "@/common/types";
import { StorageHelper } from "@/services/StorageHelper";

export const useAppEnvironment = () => {
  const getEnv = () => {
    const storedEnv = StorageHelper.getValue("env") as EnvType;

    if (storedEnv) {
      return storedEnv;
    } else {
      console.error("No environment set. Falling back to default.");
      return "local"; // Replace "default" with your actual default environment key
    }
  };

  return { getEnv };
};

export const useGenerateImage = () => {
  const { getEnv } = useAppEnvironment();
  const DEV_MODE = getEnv() === "dev" ? true : false;

  //possible to have other enviornments later
  const ENV_TYPE =
    getEnv() === "dev" ? "dev" : getEnv() === "stage" ? "stage" : "prod";
  const IMAGE_API_URL = "https://d2e4n1tcihf17q.cloudfront.net/"; //`${characterId}.${character.ext}`

  const IMAGE_API_DEV_URL = "https://d2e4n1tcihf17q.cloudfront.net/dev/"; //`${characterId}.${character.ext}`
  const IMAGE_API_STAGE_URL = "https://d2e4n1tcihf17q.cloudfront.net/stage/"; //`${characterId}.${character.ext}`

  const getImageUrl = (character: CharacterType, thumbnail?: boolean) => {
    return decodeURIComponent(
      `${
        // getEnv() === "dev"
        //   ? // && character?.primaryCategory === CUSTOM_USER_CATEGORY_NAME
        //     IMAGE_API_DEV_URL
        //   : getEnv() === "stage"
        //   ? IMAGE_API_STAGE_URL
        //   :
        IMAGE_API_URL
      }characters/${thumbnail ? "thumbnails/" : ""}${character?.characterId}.${
        character?.extension || "jpg"
      }`
    );
  };

  const getCollectionImageUrl = (collection: CollectionType) =>
    `${
      getEnv() === "dev"
        ? // && character?.primaryCategory === CUSTOM_USER_CATEGORY_NAME
          IMAGE_API_DEV_URL
        : getEnv() === "stage"
        ? IMAGE_API_STAGE_URL
        : IMAGE_API_URL
    }collections/${collection?.collectionId}.${collection?.extension || "jpg"}`;

  const getJourneyImageUrl = (journey: JourneyType) =>
    `${
      getEnv() === "dev"
        ? // && character?.primaryCategory === CUSTOM_USER_CATEGORY_NAME
          IMAGE_API_DEV_URL
        : getEnv() === "stage"
        ? IMAGE_API_STAGE_URL
        : IMAGE_API_URL
    }journeys/${journey?.journeyId}.${journey?.extension || "jpg"}`;

  return {
    ENV_TYPE,
    DEV_MODE,
    getImageUrl,
    getCollectionImageUrl,
    getJourneyImageUrl,
  };
};

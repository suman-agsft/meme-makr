export type EnvType = "dev" | "prod" | "stage" | "local";
export interface UserType {
  id: string;
  type?: string;
  firebaseUserId?: string | null;
  email?: string | null;
  lastAccessedAt?: string | null;
  name?: string | null;
  username?: string | null;
  active?: string;
  clearDataAt?: string | null;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CharacterType {
  id: string;
  characterId: string;
  characterName: string;
  primaryCategory: string;
  categories?: string[];
  background: string;
  bio?: string;
  firstPersonBio?: string;
  reason?: string;
  visibility?: string;
  publishingInfo?: string;
  keywords?: string[];
  priority: number;
  createdAt: string;
  createdBy?: string;
  updatedAt: null;
  attitude?: string;
  // tutorMode?: boolean | string;
  extension?: string;
  description?: string;
  relatedChacters?: string[];
  user?: UserType;
  active?: string;
  tagLine?: string;
  isInvisibleContextActive?: string;
  age?: string;
  profession?: string;
  gender?: string;
}

type CharacterListType = {
  rows: CharacterType[];
  count: number;
};

export interface CharactersListDataType {
  characters: CharacterListType;
}

export type ConversationMessageType = {
  active?: string;
  conversationId: string;
  createdAt: string;
  id: string;
  isRead: boolean;
  message: string;
  sender: string;
  updatedAt: string;
  mediaUrls?: string[];
  isMedia?: null;
  mediaText?: null;
  mediaId?: null;
  parentMessageId?: null;
};

export interface JourneyType {
  id: string;
  journeyId?: string;
  title?: string;
  description?: string;
  active?: string;
  position?: number;
  remainingMessageCount?: number | null;
  systemPrompt?: string;
  userPrompt?: string;
  invisiblePrompt?: string;
  gptModel?: string;
  extension?: string;
  characters: CharacterType[];
  createdAt: string;
  updatedAt: string;
}

export interface CollectionType {
  id: string;
  collectionId?: string;
  title?: string;
  description?: string;
  collectionType?: string;
  active?: string;
  position?: number;
  extension?: string;
  characters: CharacterType[];
  createdAt: string;
  updatedAt: string;
}
export interface JourneyType {
  id: string;
  journeyId?: string;
  title?: string;
  description?: string;
  active?: string;
  position?: number;
  remainingMessageCount?: number | null;
  systemPrompt?: string;
  userPrompt?: string;
  invisiblePrompt?: string;
  gptModel?: string;
  extension?: string;
  characters: CharacterType[];
  createdAt: string;
  updatedAt: string;
}

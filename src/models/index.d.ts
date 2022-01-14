import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ"
}



type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Message {
  readonly id: string;
  readonly content?: string;
  readonly user?: User;
  readonly chatRoom?: ChatRoom;
  readonly image?: string;
  readonly audio?: string;
  readonly status?: MessageStatus | keyof typeof MessageStatus;
  readonly replyToMessageID?: string;
  readonly forUserId?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly userMessageId?: string;
  readonly chatRoomMessagesId?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class User {
  readonly id: string;
  readonly clinicaID: string;
  readonly name: string;
  readonly imageUri?: string;
  readonly status?: string;
  readonly message?: (Message | null)[];
  readonly chatRoomUser?: ChatRoomUser;
  readonly chatRoom?: ChatRoom;
  readonly lastOnlineAt?: number;
  readonly online?: boolean;
  readonly publicKey?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly userChatRoomUserId?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class ChatRoomUser {
  readonly id: string;
  readonly chatroom: ChatRoom;
  readonly user: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly chatRoomChatRoomUsersId?: string;
  constructor(init: ModelInit<ChatRoomUser, ChatRoomUserMetaData>);
  static copyOf(source: ChatRoomUser, mutator: (draft: MutableModel<ChatRoomUser, ChatRoomUserMetaData>) => MutableModel<ChatRoomUser, ChatRoomUserMetaData> | void): ChatRoomUser;
}

export declare class ChatRoom {
  readonly id: string;
  readonly newMessages?: number;
  readonly messages?: (Message | null)[];
  readonly chatRoomUsers?: (ChatRoomUser | null)[];
  readonly admin: User;
  readonly name?: string;
  readonly imageUri?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly chatRoomAdminId: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}
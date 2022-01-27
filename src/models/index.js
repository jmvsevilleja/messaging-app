// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserType = {
  "USER": "USER"
};

const MessageStatus = {
  "SENT": "SENT",
  "READ": "READ"
};

const { Message, User, ChatRoomUser, ChatRoom } = initSchema(schema);

export {
  Message,
  User,
  ChatRoomUser,
  ChatRoom,
  UserType,
  MessageStatus
};
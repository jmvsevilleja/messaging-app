/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessageByChatRoomMessagesId = /* GraphQL */ `
  subscription OnCreateMessageByChatRoomMessagesId($chatRoomMessagesId: ID) {
    onCreateMessageByChatRoomMessagesId(
      chatRoomMessagesId: $chatRoomMessagesId
    ) {
      id
      content
      image
      audio
      status
      userMessageId
      createdAt
    }
  }
`;
export const onUpdateMessageByChatRoomMessagesId = /* GraphQL */ `
  subscription OnUpdateMessageByChatRoomMessagesId($chatRoomMessagesId: ID) {
    onUpdateMessageByChatRoomMessagesId(
      chatRoomMessagesId: $chatRoomMessagesId
    ) {
      id
      content
      status
      userMessageId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      imageUri
      status
      lastOnlineAt
      online
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
        chatRoomUsers {
            items {
                user {
                    id
                    name
                }
            }
        }
        id
        name
    }
  }
`;
export const onCreateChatRoomUserByChatRoomUserUserId = /* GraphQL */ `
  subscription onCreateChatRoomUserByChatRoomUserUserId($chatRoomUserUserId: ID) {
    onCreateChatRoomUserByChatRoomUserUserId(chatRoomUserUserId: $chatRoomUserUserId) {
      chatRoomUserUserId
      chatRoomChatRoomUsersId
    }
  }
`;
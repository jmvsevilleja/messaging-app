/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessageByChatRoomMessagesId = /* GraphQL */ `
  subscription OnCreateMessageByChatRoomMessagesId($chatRoomMessagesId: ID) {
    onCreateMessageByChatRoomMessagesId(
      chatRoomMessagesId: $chatRoomMessagesId
    ) {
      id
      content
      type
      image {
        name
        path
      }
      audio {
        name
        path
      }
      file {
        name
        path
      }
      status
      userMessageId
      createdAt
      chatRoom {
        id
        newMessages
      }
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
      bookmark
      deleted
      chatRoom {
        id
        newMessages
      }
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
      id
      newMessages
      lastMessage
      lastMessageBy
      chatRoomUsers {
        items {
          id
          createdAt
          updatedAt
          chatRoomUserUserId
          chatRoomChatRoomUsersId
          notification
        }
        nextToken
      }
      name
      imageUri
      createdAt
      updatedAt
      chatRoomAdminId
      deleted
      group
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      imageUri
      status
      lastOnlineAt
      online
    }
  }
`;
export const onUpdateChatRoomUserByChatRoomChatRoomUsersId = /* GraphQL */ `
  subscription OnUpdateChatRoomUserByChatRoomChatRoomUsersId(
    $chatRoomChatRoomUsersId: ID
  ) {
    onUpdateChatRoomUserByChatRoomChatRoomUsersId(
      chatRoomChatRoomUsersId: $chatRoomChatRoomUsersId
    ) {
      id
      typing
      deleted
      chatRoomUserUserId
      updatedAt
      notification
    }
  }
`;
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
      id
      chatRoomChatRoomUsersId
      chatRoomUserUserId
      updatedAt
      deleted
      notification
      typing
      user{
        id
        imageUri
        name
        online
        publicKey
        status
      }
    }
  }
`;
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
      messages {
        items {
          id
          content
          image
          audio
          status
          replyToMessageID
          forUserId
          createdAt
          updatedAt
          chatRoomMessagesId
          userMessageId
        }
        nextToken
      }
      chatRoomUsers {
        items {
          id
          createdAt
          updatedAt
          chatRoomUserUserId
          chatRoomChatRoomUsersId
        }
        nextToken
      }
      admin {
        id
        clinicaID
        name
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          createdAt
          updatedAt
          chatRoomUserUserId
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          name
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      name
      imageUri
      createdAt
      updatedAt
      chatRoomAdminId
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
      typing
    }
  }
`;
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
      id
      newMessages
      lastMessage {
        id
        content
        user {
          id
          clinicaID
          name
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userChatRoomId
          userChatRoomUserId
        }
        chatRoom {
          id
          newMessages
          name
          imageUri
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomAdminId
        }
        image
        audio
        status
        replyToMessageID
        forUserId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomMessagesId
        userMessageId
      }
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
          _version
          _deleted
          _lastChangedAt
          chatRoomMessagesId
          userMessageId
        }
        nextToken
        startedAt
      }
      chatRoomUsers {
        items {
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
          startedAt
        }
        chatRoomUser {
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        publicKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userChatRoomId
        userChatRoomUserId
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomAdminId
    }
  }
`;
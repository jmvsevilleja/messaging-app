/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessageByChatRoomMessagesId = /* GraphQL */ `
  subscription OnCreateMessageByChatRoomMessagesId($chatRoomMessagesId: ID) {
    onCreateMessageByChatRoomMessagesId(
      chatRoomMessagesId: $chatRoomMessagesId
    ) {
      id
      content
      user {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      image
      audio
      file
      status
      replyToMessageID
      forUserId
      createdAt
      chatRoomMessagesId
      updatedAt
      userMessageId
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
      user {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      image
      audio
      file
      status
      replyToMessageID
      forUserId
      createdAt
      chatRoomMessagesId
      updatedAt
      userMessageId
    }
  }
`;
export const onCreateChatRoomUserByChatRoomUserUserId = /* GraphQL */ `
  subscription OnCreateChatRoomUserByChatRoomUserUserId(
    $chatRoomUserUserId: ID
  ) {
    onCreateChatRoomUserByChatRoomUserUserId(
      chatRoomUserUserId: $chatRoomUserUserId
    ) {
      id
      chatroom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      user {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      chatRoomUserUserId
      createdAt
      updatedAt
      chatRoomChatRoomUsersId
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      content
      user {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      image
      audio
      file
      status
      replyToMessageID
      forUserId
      createdAt
      chatRoomMessagesId
      updatedAt
      userMessageId
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      content
      user {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      image
      audio
      file
      status
      replyToMessageID
      forUserId
      createdAt
      chatRoomMessagesId
      updatedAt
      userMessageId
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      content
      user {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      image
      audio
      file
      status
      replyToMessageID
      forUserId
      createdAt
      chatRoomMessagesId
      updatedAt
      userMessageId
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
      id
      newMessages
      lastMessage
      messages {
        items {
          id
          content
          image
          audio
          file
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          updatedAt
          userMessageId
        }
        nextToken
      }
      chatRoomUsers {
        items {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        nextToken
      }
      admin {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      name
      group
      imageUri
      createdAt
      updatedAt
      chatRoomAdminId
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
          file
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          updatedAt
          userMessageId
        }
        nextToken
      }
      chatRoomUsers {
        items {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        nextToken
      }
      admin {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      name
      group
      imageUri
      createdAt
      updatedAt
      chatRoomAdminId
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
      id
      newMessages
      lastMessage
      messages {
        items {
          id
          content
          image
          audio
          file
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          updatedAt
          userMessageId
        }
        nextToken
      }
      chatRoomUsers {
        items {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        nextToken
      }
      admin {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      name
      group
      imageUri
      createdAt
      updatedAt
      chatRoomAdminId
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      clinicaID
      name
      type
      imageUri
      status
      message {
        items {
          id
          content
          image
          audio
          file
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          updatedAt
          userMessageId
        }
        nextToken
      }
      chatRoomUser {
        id
        chatroom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        user {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        chatRoomUserUserId
        createdAt
        updatedAt
        chatRoomChatRoomUsersId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      lastOnlineAt
      online
      typing
      publicKey
      createdAt
      updatedAt
      userChatRoomId
      userChatRoomUserId
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      clinicaID
      name
      type
      imageUri
      status
      message {
        items {
          id
          content
          image
          audio
          file
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          updatedAt
          userMessageId
        }
        nextToken
      }
      chatRoomUser {
        id
        chatroom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        user {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        chatRoomUserUserId
        createdAt
        updatedAt
        chatRoomChatRoomUsersId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      lastOnlineAt
      online
      typing
      publicKey
      createdAt
      updatedAt
      userChatRoomId
      userChatRoomUserId
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      clinicaID
      name
      type
      imageUri
      status
      message {
        items {
          id
          content
          image
          audio
          file
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          updatedAt
          userMessageId
        }
        nextToken
      }
      chatRoomUser {
        id
        chatroom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        user {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        chatRoomUserUserId
        createdAt
        updatedAt
        chatRoomChatRoomUsersId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      lastOnlineAt
      online
      typing
      publicKey
      createdAt
      updatedAt
      userChatRoomId
      userChatRoomUserId
    }
  }
`;
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
      id
      chatroom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      user {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      chatRoomUserUserId
      createdAt
      updatedAt
      chatRoomChatRoomUsersId
    }
  }
`;
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser {
    onUpdateChatRoomUser {
      id
      chatroom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      user {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      chatRoomUserUserId
      createdAt
      updatedAt
      chatRoomChatRoomUsersId
    }
  }
`;
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser {
    onDeleteChatRoomUser {
      id
      chatroom {
        id
        newMessages
        lastMessage
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          clinicaID
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          typing
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        createdAt
        updatedAt
        chatRoomAdminId
      }
      user {
        id
        clinicaID
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          chatRoomUserUserId
          createdAt
          updatedAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          createdAt
          updatedAt
          chatRoomAdminId
        }
        lastOnlineAt
        online
        typing
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      chatRoomUserUserId
      createdAt
      updatedAt
      chatRoomChatRoomUsersId
    }
  }
`;

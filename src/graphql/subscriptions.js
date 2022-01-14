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
      chatRoom {
        id
        newMessages
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
      chatRoom {
        id
        newMessages
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomAdminId
      }
      user {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomUserUserId
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
      chatRoom {
        id
        newMessages
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
      chatRoom {
        id
        newMessages
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
      chatRoom {
        id
        newMessages
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      clinicaID
      name
      imageUri
      status
      message {
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
      chatRoomUser {
        id
        chatroom {
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
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      clinicaID
      name
      imageUri
      status
      message {
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
      chatRoomUser {
        id
        chatroom {
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
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      clinicaID
      name
      imageUri
      status
      message {
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
      chatRoomUser {
        id
        chatroom {
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
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
  }
`;
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
      id
      chatroom {
        id
        newMessages
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomAdminId
      }
      user {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomUserUserId
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
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomAdminId
      }
      user {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomUserUserId
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
        lastMessage {
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
        messages {
          nextToken
          startedAt
        }
        chatRoomUsers {
          nextToken
        }
        admin {
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
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomAdminId
      }
      user {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomUserUserId
      chatRoomChatRoomUsersId
    }
  }
`;

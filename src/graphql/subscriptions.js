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
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      chatRoom {
        id
        newMessages
        lastMessage
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
        createdAt
        updatedAt
        chatRoomAdminId
      }
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
      type
      status
      replyToMessageID
      forUserId
      createdAt
      chatRoomMessagesId
      bookmark
      deleted
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
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      chatRoom {
        id
        newMessages
        lastMessage
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
        createdAt
        updatedAt
        chatRoomAdminId
      }
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
      type
      status
      replyToMessageID
      forUserId
      createdAt
      chatRoomMessagesId
      bookmark
      deleted
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
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
        createdAt
        updatedAt
        chatRoomAdminId
      }
      user {
        id
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      typing
      updatedAt
      chatRoomUserUserId
      deleted
      notification
      bookmarks
      createdAt
      chatRoomChatRoomUsersId
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
      chatroom {
        id
        newMessages
        lastMessage
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
        createdAt
        updatedAt
        chatRoomAdminId
      }
      user {
        id
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      typing
      updatedAt
      chatRoomUserUserId
      deleted
      notification
      bookmarks
      createdAt
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
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      chatRoom {
        id
        newMessages
        lastMessage
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
        createdAt
        updatedAt
        chatRoomAdminId
      }
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
      type
      status
      replyToMessageID
      forUserId
      createdAt
      chatRoomMessagesId
      bookmark
      deleted
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
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      chatRoom {
        id
        newMessages
        lastMessage
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
        createdAt
        updatedAt
        chatRoomAdminId
      }
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
      type
      status
      replyToMessageID
      forUserId
      createdAt
      chatRoomMessagesId
      bookmark
      deleted
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
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      chatRoom {
        id
        newMessages
        lastMessage
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
        createdAt
        updatedAt
        chatRoomAdminId
      }
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
      type
      status
      replyToMessageID
      forUserId
      createdAt
      chatRoomMessagesId
      bookmark
      deleted
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
      lastMessageBy
      messages {
        items {
          id
          content
          type
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          bookmark
          deleted
          updatedAt
          userMessageId
        }
        nextToken
      }
      chatRoomUsers {
        items {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        nextToken
      }
      admin {
        id
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      group
      imageUri
      pin
      deleted
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
      lastMessageBy
      messages {
        items {
          id
          content
          type
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          bookmark
          deleted
          updatedAt
          userMessageId
        }
        nextToken
      }
      chatRoomUsers {
        items {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        nextToken
      }
      admin {
        id
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      group
      imageUri
      pin
      deleted
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
      lastMessageBy
      messages {
        items {
          id
          content
          type
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          bookmark
          deleted
          updatedAt
          userMessageId
        }
        nextToken
      }
      chatRoomUsers {
        items {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        nextToken
      }
      admin {
        id
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      group
      imageUri
      pin
      deleted
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
      name
      type
      imageUri
      status
      message {
        items {
          id
          content
          type
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          bookmark
          deleted
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
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
          createdAt
          updatedAt
          chatRoomAdminId
        }
        user {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        typing
        updatedAt
        chatRoomUserUserId
        deleted
        notification
        bookmarks
        createdAt
        chatRoomChatRoomUsersId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
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
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      type
      imageUri
      status
      message {
        items {
          id
          content
          type
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          bookmark
          deleted
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
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
          createdAt
          updatedAt
          chatRoomAdminId
        }
        user {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        typing
        updatedAt
        chatRoomUserUserId
        deleted
        notification
        bookmarks
        createdAt
        chatRoomChatRoomUsersId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
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
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      type
      imageUri
      status
      message {
        items {
          id
          content
          type
          status
          replyToMessageID
          forUserId
          createdAt
          chatRoomMessagesId
          bookmark
          deleted
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
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
          createdAt
          updatedAt
          chatRoomAdminId
        }
        user {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        typing
        updatedAt
        chatRoomUserUserId
        deleted
        notification
        bookmarks
        createdAt
        chatRoomChatRoomUsersId
      }
      chatRoom {
        id
        newMessages
        lastMessage
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
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
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
        createdAt
        updatedAt
        chatRoomAdminId
      }
      user {
        id
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      typing
      updatedAt
      chatRoomUserUserId
      deleted
      notification
      bookmarks
      createdAt
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
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
        createdAt
        updatedAt
        chatRoomAdminId
      }
      user {
        id
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      typing
      updatedAt
      chatRoomUserUserId
      deleted
      notification
      bookmarks
      createdAt
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
        lastMessageBy
        messages {
          nextToken
        }
        chatRoomUsers {
          nextToken
        }
        admin {
          id
          name
          type
          imageUri
          status
          lastOnlineAt
          online
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        name
        group
        imageUri
        pin
        deleted
        createdAt
        updatedAt
        chatRoomAdminId
      }
      user {
        id
        name
        type
        imageUri
        status
        message {
          nextToken
        }
        chatRoomUser {
          id
          typing
          updatedAt
          chatRoomUserUserId
          deleted
          notification
          bookmarks
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          lastMessageBy
          name
          group
          imageUri
          pin
          deleted
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
      typing
      updatedAt
      chatRoomUserUserId
      deleted
      notification
      bookmarks
      createdAt
      chatRoomChatRoomUsersId
    }
  }
`;
export const onCreateEmailSetting = /* GraphQL */ `
  subscription OnCreateEmailSetting {
    onCreateEmailSetting {
      id
      signature
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEmailSetting = /* GraphQL */ `
  subscription OnUpdateEmailSetting {
    onUpdateEmailSetting {
      id
      signature
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEmailSetting = /* GraphQL */ `
  subscription OnDeleteEmailSetting {
    onDeleteEmailSetting {
      id
      signature
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserAccount = /* GraphQL */ `
  subscription OnCreateUserAccount(
    $id: String
    $code: String
    $email: String
    $first_name: String
    $gender: String
  ) {
    onCreateUserAccount(
      id: $id
      code: $code
      email: $email
      first_name: $first_name
      gender: $gender
    ) {
      id
      code
      email
      first_name
      gender
      last_name
      user_type
    }
  }
`;
export const onUpdateUserAccount = /* GraphQL */ `
  subscription OnUpdateUserAccount(
    $id: String
    $code: String
    $email: String
    $first_name: String
    $gender: String
  ) {
    onUpdateUserAccount(
      id: $id
      code: $code
      email: $email
      first_name: $first_name
      gender: $gender
    ) {
      id
      code
      email
      first_name
      gender
      last_name
      user_type
    }
  }
`;
export const onDeleteUserAccount = /* GraphQL */ `
  subscription OnDeleteUserAccount(
    $id: String
    $code: String
    $email: String
    $first_name: String
    $gender: String
  ) {
    onDeleteUserAccount(
      id: $id
      code: $code
      email: $email
      first_name: $first_name
      gender: $gender
    ) {
      id
      code
      email
      first_name
      gender
      last_name
      user_type
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createChatRoomUser = /* GraphQL */ `
  mutation CreateChatRoomUser(
    $input: CreateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    createChatRoomUser(input: $input, condition: $condition) {
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
export const updateChatRoomUser = /* GraphQL */ `
  mutation UpdateChatRoomUser(
    $input: UpdateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    updateChatRoomUser(input: $input, condition: $condition) {
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
export const deleteChatRoomUser = /* GraphQL */ `
  mutation DeleteChatRoomUser(
    $input: DeleteChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    deleteChatRoomUser(input: $input, condition: $condition) {
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
export const createEmailSetting = /* GraphQL */ `
  mutation CreateEmailSetting(
    $input: CreateEmailSettingInput!
    $condition: ModelEmailSettingConditionInput
  ) {
    createEmailSetting(input: $input, condition: $condition) {
      id
      signature
      createdAt
      updatedAt
    }
  }
`;
export const updateEmailSetting = /* GraphQL */ `
  mutation UpdateEmailSetting(
    $input: UpdateEmailSettingInput!
    $condition: ModelEmailSettingConditionInput
  ) {
    updateEmailSetting(input: $input, condition: $condition) {
      id
      signature
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmailSetting = /* GraphQL */ `
  mutation DeleteEmailSetting(
    $input: DeleteEmailSettingInput!
    $condition: ModelEmailSettingConditionInput
  ) {
    deleteEmailSetting(input: $input, condition: $condition) {
      id
      signature
      createdAt
      updatedAt
    }
  }
`;
export const createUserAccount = /* GraphQL */ `
  mutation CreateUserAccount($input: CreateUserAccountInput!) {
    createUserAccount(input: $input) {
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
export const updateUserAccount = /* GraphQL */ `
  mutation UpdateUserAccount($input: UpdateUserAccountInput!) {
    updateUserAccount(input: $input) {
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
export const deleteUserAccount = /* GraphQL */ `
  mutation DeleteUserAccount($input: DeleteUserAccountInput!) {
    deleteUserAccount(input: $input) {
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

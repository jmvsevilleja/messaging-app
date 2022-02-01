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
          typing
          updatedAt
          chatRoomUserUserId
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          pin
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
          typing
          updatedAt
          chatRoomUserUserId
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          pin
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
          typing
          updatedAt
          chatRoomUserUserId
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          pin
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
          createdAt
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
          typing
          updatedAt
          chatRoomUserUserId
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          pin
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
          createdAt
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
          typing
          updatedAt
          chatRoomUserUserId
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          pin
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
          createdAt
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
          typing
          updatedAt
          chatRoomUserUserId
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          pin
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
      clinicaID
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
          pin
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
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        typing
        updatedAt
        chatRoomUserUserId
        createdAt
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
      clinicaID
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
          pin
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
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        typing
        updatedAt
        chatRoomUserUserId
        createdAt
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
      clinicaID
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
          pin
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
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        typing
        updatedAt
        chatRoomUserUserId
        createdAt
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
          typing
          updatedAt
          chatRoomUserUserId
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          pin
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
          typing
          updatedAt
          chatRoomUserUserId
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          pin
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
          typing
          updatedAt
          chatRoomUserUserId
          createdAt
          chatRoomChatRoomUsersId
        }
        chatRoom {
          id
          newMessages
          lastMessage
          name
          group
          imageUri
          pin
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
      createdAt
      chatRoomChatRoomUsersId
    }
  }
`;
export const createUserTest = /* GraphQL */ `
  mutation CreateUserTest($input: CreateUserTestInput!) {
    createUserTest(input: $input) {
      id
      code
      email
      first_name
      gender
      last_name
      phones
      user_type
      photo
    }
  }
`;
export const updateUserTest = /* GraphQL */ `
  mutation UpdateUserTest($input: UpdateUserTestInput!) {
    updateUserTest(input: $input) {
      id
      code
      email
      first_name
      gender
      last_name
      phones
      user_type
      photo
    }
  }
`;
export const deleteUserTest = /* GraphQL */ `
  mutation DeleteUserTest($input: DeleteUserTestInput!) {
    deleteUserTest(input: $input) {
      id
      code
      email
      first_name
      gender
      last_name
      phones
      user_type
      photo
    }
  }
`;

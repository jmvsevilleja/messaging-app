/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
      updatedAt
      userMessageId
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
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
        updatedAt
        userMessageId
      }
      nextToken
    }
  }
`;
export const messageByMessageType = /* GraphQL */ `
  query MessageByMessageType(
    $type: MessageType!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    MessageByMessageType(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
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
        updatedAt
        userMessageId
      }
      nextToken
    }
  }
`;
export const messageByChatRoomMessagesId = /* GraphQL */ `
  query MessageByChatRoomMessagesId(
    $chatRoomMessagesId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    MessageByChatRoomMessagesId(
      chatRoomMessagesId: $chatRoomMessagesId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
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
        updatedAt
        userMessageId
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
          updatedAt
          userMessageId
        }
        nextToken
      }
      chatRoomUsers {
        items {
          id
          typing
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
          typing
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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        chatRoomAdminId
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        typing
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
      publicKey
      createdAt
      updatedAt
      userChatRoomId
      userChatRoomUserId
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      nextToken
    }
  }
`;
export const userByClinicaID = /* GraphQL */ `
  query UserByClinicaID(
    $clinicaID: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByClinicaID(
      clinicaID: $clinicaID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      nextToken
    }
  }
`;
export const userByName = /* GraphQL */ `
  query UserByName(
    $name: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByName(
      name: $name
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      nextToken
    }
  }
`;
export const userByType = /* GraphQL */ `
  query UserByType(
    $type: UserType!
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByType(
      type: $type
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        publicKey
        createdAt
        updatedAt
        userChatRoomId
        userChatRoomUserId
      }
      nextToken
    }
  }
`;
export const chatRoomUserByChatRoomUserUserId = /* GraphQL */ `
  query ChatRoomUserByChatRoomUserUserId(
    $chatRoomUserUserId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ChatRoomUserByChatRoomUserUserId(
      chatRoomUserUserId: $chatRoomUserUserId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          publicKey
          createdAt
          updatedAt
          userChatRoomId
          userChatRoomUserId
        }
        typing
        chatRoomUserUserId
        createdAt
        updatedAt
        chatRoomChatRoomUsersId
      }
      nextToken
    }
  }
`;

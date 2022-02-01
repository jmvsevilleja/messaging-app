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
      nextToken
    }
  }
`;
export const messageByMessageType = /* GraphQL */ `
  query MessageByMessageType(
    $type: MessageType
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
      nextToken
    }
  }
`;
export const messageByChatRoomMessagesId = /* GraphQL */ `
  query MessageByChatRoomMessagesId(
    $chatRoomMessagesId: ID
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
        pin
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
      nextToken
    }
  }
`;
export const userByClinicaID = /* GraphQL */ `
  query UserByClinicaID(
    $clinicaID: String
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
      nextToken
    }
  }
`;
export const userByName = /* GraphQL */ `
  query UserByName(
    $name: String
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
      nextToken
    }
  }
`;
export const userByType = /* GraphQL */ `
  query UserByType(
    $type: UserType
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
      nextToken
    }
  }
`;
export const chatRoomUserByChatRoomUserUserId = /* GraphQL */ `
  query ChatRoomUserByChatRoomUserUserId(
    $chatRoomUserUserId: ID
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ChatRoomUserByChatRoomUserUserId(
      chatRoomUserUserId: $chatRoomUserUserId
      updatedAt: $updatedAt
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
      nextToken
    }
  }
`;
export const getUserTest = /* GraphQL */ `
  query GetUserTest($id: String!) {
    getUserTest(id: $id) {
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
export const listUserTests = /* GraphQL */ `
  query ListUserTests(
    $filter: TableUserTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const queryUserTestsByCodeIndex = /* GraphQL */ `
  query QueryUserTestsByCodeIndex($code: String!, $first: Int, $after: String) {
    queryUserTestsByCodeIndex(code: $code, first: $first, after: $after) {
      items {
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
      nextToken
    }
  }
`;
export const queryUserTestsByUserTypeIndex = /* GraphQL */ `
  query QueryUserTestsByUserTypeIndex(
    $user_type: String!
    $first: Int
    $after: String
  ) {
    queryUserTestsByUserTypeIndex(
      user_type: $user_type
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
    }
  }
`;
export const queryUserTestsByLastNameIndex = /* GraphQL */ `
  query QueryUserTestsByLastNameIndex(
    $last_name: String!
    $first: Int
    $after: String
  ) {
    queryUserTestsByLastNameIndex(
      last_name: $last_name
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
    }
  }
`;
export const queryUserTestsByPhonesIndex = /* GraphQL */ `
  query QueryUserTestsByPhonesIndex(
    $phones: String!
    $first: Int
    $after: String
  ) {
    queryUserTestsByPhonesIndex(phones: $phones, first: $first, after: $after) {
      items {
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
      nextToken
    }
  }
`;
export const queryUserTestsByGenderIndex = /* GraphQL */ `
  query QueryUserTestsByGenderIndex(
    $gender: String!
    $first: Int
    $after: String
  ) {
    queryUserTestsByGenderIndex(gender: $gender, first: $first, after: $after) {
      items {
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
      nextToken
    }
  }
`;
export const queryUserTestsByEmailIndex = /* GraphQL */ `
  query QueryUserTestsByEmailIndex(
    $email: String!
    $first: Int
    $after: String
  ) {
    queryUserTestsByEmailIndex(email: $email, first: $first, after: $after) {
      items {
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
      nextToken
    }
  }
`;
export const queryUserTestsByFirstNameIndex = /* GraphQL */ `
  query QueryUserTestsByFirstNameIndex(
    $first_name: String!
    $first: Int
    $after: String
  ) {
    queryUserTestsByFirstNameIndex(
      first_name: $first_name
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
    }
  }
`;

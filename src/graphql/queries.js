/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const getUserAccount = /* GraphQL */ `
  query GetUserAccount($id: String!) {
    getUserAccount(id: $id) {
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
export const listUserAccounts = /* GraphQL */ `
  query ListUserAccounts(
    $filter: TableUserAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        email
        first_name
        gender
        last_name
        user_type
      }
      nextToken
    }
  }
`;
export const queryUserAccountsByCodeIndex = /* GraphQL */ `
  query QueryUserAccountsByCodeIndex(
    $code: String!
    $first: Int
    $after: String
  ) {
    queryUserAccountsByCodeIndex(code: $code, first: $first, after: $after) {
      items {
        id
        code
        email
        first_name
        gender
        last_name
        user_type
      }
      nextToken
    }
  }
`;
export const queryUserAccountsByUserTypeIndex = /* GraphQL */ `
  query QueryUserAccountsByUserTypeIndex(
    $user_type: String!
    $first: Int
    $after: String
  ) {
    queryUserAccountsByUserTypeIndex(
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
        user_type
      }
      nextToken
    }
  }
`;
export const queryUserAccountsByLastNameIndex = /* GraphQL */ `
  query QueryUserAccountsByLastNameIndex(
    $last_name: String!
    $first: Int
    $after: String
  ) {
    queryUserAccountsByLastNameIndex(
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
        user_type
      }
      nextToken
    }
  }
`;
export const queryUserAccountsByGenderIndex = /* GraphQL */ `
  query QueryUserAccountsByGenderIndex(
    $gender: String!
    $first: Int
    $after: String
  ) {
    queryUserAccountsByGenderIndex(
      gender: $gender
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
        user_type
      }
      nextToken
    }
  }
`;
export const queryUserAccountsByEmailIndex = /* GraphQL */ `
  query QueryUserAccountsByEmailIndex(
    $email: String!
    $first: Int
    $after: String
  ) {
    queryUserAccountsByEmailIndex(email: $email, first: $first, after: $after) {
      items {
        id
        code
        email
        first_name
        gender
        last_name
        user_type
      }
      nextToken
    }
  }
`;
export const queryUserAccountsByFirstNameIndex = /* GraphQL */ `
  query QueryUserAccountsByFirstNameIndex(
    $first_name: String!
    $first: Int
    $after: String
  ) {
    queryUserAccountsByFirstNameIndex(
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
        user_type
      }
      nextToken
    }
  }
`;

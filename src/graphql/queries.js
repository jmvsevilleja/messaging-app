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
          lastMessage
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
        lastMessage
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
          lastMessage
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
      nextToken
      startedAt
    }
  }
`;
export const syncMessages = /* GraphQL */ `
  query SyncMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          lastMessage
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
      nextToken
      startedAt
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
          lastMessage
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
      nextToken
      startedAt
    }
  }
`;
export const syncChatRooms = /* GraphQL */ `
  query SyncChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncChatRooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        newMessages
        lastMessage
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
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          lastMessage
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
        lastMessage
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
          lastMessage
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          lastMessage
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
      nextToken
      startedAt
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
          lastMessage
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
      nextToken
      startedAt
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
          lastMessage
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
      nextToken
      startedAt
    }
  }
`;

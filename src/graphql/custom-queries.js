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
          type
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
          status
          userMessageId
          createdAt
      }
      nextToken
    }
  }
`;
export const chatRoomUserByChatRoomUserUserId = /* GraphQL */ `
  query ChatRoomUserByChatRoomUserUserId(
    $chatRoomUserUserId: ID!
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
        name
        group
        lastMessage
        newMessages
        updatedAt
        chatRoomUsers {
          items {
            id
            typing
            user {
              id
              name
              online
            }
          }
        }
      }
    }
      nextToken
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
        imageUri
        status
        lastOnlineAt
        online
        publicKey
      }
      nextToken
    }
  }
`;
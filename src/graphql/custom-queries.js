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
    $chatRoomUserUserId: ID
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
        name
        group
        lastMessage
        newMessages
        updatedAt
        chatRoomUsers {
          items {
            user {
              id
              name
              online
              typing
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
        typing
        publicKey
      }
      nextToken
    }
  }
`;
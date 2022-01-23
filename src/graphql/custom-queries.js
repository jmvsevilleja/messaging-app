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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
        chatRoomUsers {
            items {
            user {
                id
                name
            }
            }
        }
        id
        name
        group
        newMessages
        lastMessage
        updatedAt
        }
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
            }
          }
        }
      }
    }
      nextToken
    }
  }
`;

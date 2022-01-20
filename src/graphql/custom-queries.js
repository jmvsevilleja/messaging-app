export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
        getChatRoom(id: $id) {
        id
        name
        messages {
            items {
                id
                content
                status
                userMessageId
                createdAt
            }
        }
        chatRoomUsers {
            items {
                user {
                    id
                    name
                }
            }
        }
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
        }
    }
  }
`;
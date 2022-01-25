
export const createMessage = /* GraphQL */ `
mutation CreateMessage(
  $input: CreateMessageInput!
  $condition: ModelMessageConditionInput
) {
  createMessage(input: $input, condition: $condition) {
    id
    content
    chatRoomMessagesId
    userMessageId
    status
    createdAt
    updatedAt
    chatRoom {
      id
      newMessages
    }
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
        chatRoomMessagesId
        userMessageId
        status
        createdAt
        updatedAt
        chatRoom {
          id
          newMessages
        }
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
        userChatRoomId
        userChatRoomUserId
      }
      chatRoomUsers {
        items {
          id
          createdAt
          updatedAt
          chatRoomUserUserId
          chatRoomChatRoomUsersId
        }
        nextToken
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      online
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
      typing
      chatRoomUserUserId
      createdAt
      updatedAt
      chatRoomChatRoomUsersId
    }
  }
`;
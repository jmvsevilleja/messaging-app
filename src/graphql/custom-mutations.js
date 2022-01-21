
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
    }
  }
`;
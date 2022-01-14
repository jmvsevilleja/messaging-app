export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
          name
          imageUri
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomLastMessageId
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
        lastMessage {
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
          messageChatRoomId
          chatRoomMessagesId
          userMessageId
        }
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
        chatRoomLastMessageId
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
      messageChatRoomId
      chatRoomMessagesId
      userMessageId
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
        lastMessage {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
        lastMessage {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      newMessages
      lastMessage {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      newMessages
      lastMessage {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      newMessages
      lastMessage {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
        lastMessage {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
        lastMessage {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
        lastMessage {
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
export const createChatRoomUser = /* GraphQL */ `
  mutation CreateChatRoomUser(
    $input: CreateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    createChatRoomUser(input: $input, condition: $condition) {
      id
      chatroom {
        id
        newMessages
        lastMessage {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomUserUserId
      chatRoomChatRoomUsersId
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
      chatroom {
        id
        newMessages
        lastMessage {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomUserUserId
      chatRoomChatRoomUsersId
    }
  }
`;
export const deleteChatRoomUser = /* GraphQL */ `
  mutation DeleteChatRoomUser(
    $input: DeleteChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    deleteChatRoomUser(input: $input, condition: $condition) {
      id
      chatroom {
        id
        newMessages
        lastMessage {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomUserUserId
      chatRoomChatRoomUsersId
    }
  }
`;

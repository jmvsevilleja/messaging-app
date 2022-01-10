/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      content
      userID
      chatroomID
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
      userMessagesId
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      content
      userID
      chatroomID
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
      userMessagesId
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      content
      userID
      chatroomID
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
      userMessagesId
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
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
        userMessagesId
      }
      Messages {
        items {
          id
          content
          userID
          chatroomID
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
          userMessagesId
        }
        nextToken
        startedAt
      }
      ChatRoomUsers {
        items {
          id
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomChatRoomUsersId
          userChatroomsId
        }
        nextToken
      }
      Admin {
        id
        userID
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
        }
        lastOnlineAt
        publicKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
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
        userMessagesId
      }
      Messages {
        items {
          id
          content
          userID
          chatroomID
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
          userMessagesId
        }
        nextToken
        startedAt
      }
      ChatRoomUsers {
        items {
          id
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomChatRoomUsersId
          userChatroomsId
        }
        nextToken
      }
      Admin {
        id
        userID
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
        }
        lastOnlineAt
        publicKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
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
        userMessagesId
      }
      Messages {
        items {
          id
          content
          userID
          chatroomID
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
          userMessagesId
        }
        nextToken
        startedAt
      }
      ChatRoomUsers {
        items {
          id
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomChatRoomUsersId
          userChatroomsId
        }
        nextToken
      }
      Admin {
        id
        userID
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
        }
        lastOnlineAt
        publicKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      userID
      name
      imageUri
      status
      Messages {
        items {
          id
          content
          userID
          chatroomID
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
          userMessagesId
        }
        nextToken
        startedAt
      }
      chatrooms {
        items {
          id
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomChatRoomUsersId
          userChatroomsId
        }
        nextToken
      }
      lastOnlineAt
      publicKey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      userID
      name
      imageUri
      status
      Messages {
        items {
          id
          content
          userID
          chatroomID
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
          userMessagesId
        }
        nextToken
        startedAt
      }
      chatrooms {
        items {
          id
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomChatRoomUsersId
          userChatroomsId
        }
        nextToken
      }
      lastOnlineAt
      publicKey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      userID
      name
      imageUri
      status
      Messages {
        items {
          id
          content
          userID
          chatroomID
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
          userMessagesId
        }
        nextToken
        startedAt
      }
      chatrooms {
        items {
          id
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          chatRoomChatRoomUsersId
          userChatroomsId
        }
        nextToken
      }
      lastOnlineAt
      publicKey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
      id
      chatroomID
      userID
      chatroom {
        id
        newMessages
        LastMessage {
          id
          content
          userID
          chatroomID
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
          userMessagesId
        }
        Messages {
          nextToken
          startedAt
        }
        ChatRoomUsers {
          nextToken
        }
        Admin {
          id
          userID
          name
          imageUri
          status
          lastOnlineAt
          publicKey
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        userID
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
        }
        lastOnlineAt
        publicKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomChatRoomUsersId
      userChatroomsId
    }
  }
`;
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser {
    onUpdateChatRoomUser {
      id
      chatroomID
      userID
      chatroom {
        id
        newMessages
        LastMessage {
          id
          content
          userID
          chatroomID
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
          userMessagesId
        }
        Messages {
          nextToken
          startedAt
        }
        ChatRoomUsers {
          nextToken
        }
        Admin {
          id
          userID
          name
          imageUri
          status
          lastOnlineAt
          publicKey
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        userID
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
        }
        lastOnlineAt
        publicKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomChatRoomUsersId
      userChatroomsId
    }
  }
`;
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser {
    onDeleteChatRoomUser {
      id
      chatroomID
      userID
      chatroom {
        id
        newMessages
        LastMessage {
          id
          content
          userID
          chatroomID
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
          userMessagesId
        }
        Messages {
          nextToken
          startedAt
        }
        ChatRoomUsers {
          nextToken
        }
        Admin {
          id
          userID
          name
          imageUri
          status
          lastOnlineAt
          publicKey
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        userID
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
        }
        lastOnlineAt
        publicKey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomChatRoomUsersId
      userChatroomsId
    }
  }
`;

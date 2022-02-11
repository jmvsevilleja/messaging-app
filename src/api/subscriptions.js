import {API, graphqlOperation} from 'aws-amplify'

import {
    onUpdateUser,
    onCreateChatRoomUser,
    onCreateChatRoomUserByChatRoomUserUserId,
    onUpdateChatRoom,
    onCreateMessageByChatRoomMessagesId,
    onUpdateMessageByChatRoomMessagesId,
    onUpdateChatRoomUserByChatRoomChatRoomUsersId,
} from "../graphql/custom-subscriptions";

export const subOnCreateChatRoomUser = (callbackfunction) => {
    try {
        console.log("Subscribe to onCreateChatRoomUser");
        return API.graphql(
            graphqlOperation(onCreateChatRoomUser)
        ).subscribe({
            next: ({provider, value: {data: {onCreateChatRoomUser}}}) => {
                console.log("ON CREATE CHATROOM", onCreateChatRoomUser);
                callbackfunction(onCreateChatRoomUser);
            },
            error: (error) => console.warn(error),
        });
    } catch (err) {
        console.error(err);
    }
};

export const subOnCreateChatRoomUserByChatRoomUserUserId = (user_id, callbackfunction) => {
    try {
        console.log("Subscribe to onCreateChatRoomUserByChatRoomUserUserId");
        return API.graphql(
            graphqlOperation(onCreateChatRoomUserByChatRoomUserUserId, {
                chatRoomUserUserId: user_id,
            })
        ).subscribe({
            next: ({provider, value: {data: {onCreateChatRoomUserByChatRoomUserUserId}}}) => {
                console.log("ON CREATE CHATROOM USER BY USER ID", onCreateChatRoomUserByChatRoomUserUserId);
                callbackfunction(onCreateChatRoomUserByChatRoomUserUserId);
            },
            error: (error) => console.warn(error),
        });
    } catch (err) {
        console.error(err);
    }
};

export const subOnUpdateUser = (callbackfunction) => {
    try {
        console.log("Subscribe to onUpdateUser");
        return API.graphql(
            graphqlOperation(onUpdateUser)
        ).subscribe({
            next: ({provider, value: {data: {onUpdateUser}}}) => {
                console.log("ON UPDATE USER", onUpdateUser);
                callbackfunction(onUpdateUser);
            },
            error: (error) => console.warn(error),
        });
    } catch (err) {
        console.error(err);
    }
};
export const subOnCreateMessageByChatRoomMessagesId = (chatroom_id, callbackfunction) => {
    try {
        console.log('Subscribe to onCreateMessageByChatRoomMessagesId');
        return API.graphql(
            graphqlOperation(onCreateMessageByChatRoomMessagesId, {chatRoomMessagesId: chatroom_id})
        ).subscribe({
            next: ({provider, value: {data: {onCreateMessageByChatRoomMessagesId}}}) => {
                console.log("ON CREATE MESSAGE BY ID", onCreateMessageByChatRoomMessagesId);
                callbackfunction(onCreateMessageByChatRoomMessagesId);
            },
            error: (error) => console.warn(error),
        });
    } catch (err) {
        console.error(err);
    }
};

export const subOnUpdateMessageByChatRoomMessagesId = (chatroom_id, callbackfunction) => {
    try {
        console.log('Subscribe to onUpdateMessageByChatRoomMessagesId');
        return API.graphql(
            graphqlOperation(onUpdateMessageByChatRoomMessagesId, {
                chatRoomMessagesId: chatroom_id,
            })
        ).subscribe({
            next: ({provider, value: {data: {onUpdateMessageByChatRoomMessagesId}}}) => {
                console.log("ON UPDATE MESSAGE BY CHATROOM ID", onUpdateMessageByChatRoomMessagesId);
                callbackfunction(onUpdateMessageByChatRoomMessagesId);
            },
            error: (error) => console.warn(error),
        });
    } catch (err) {
        console.error(err);
    }
};
export const subOnUpdateChatRoomUserByChatRoomChatRoomUsersId = (chatroom_id, callbackfunction) => {
    try {
        console.log("Subscribe to onUpdateChatRoomUserByChatRoomChatRoomUsersId");
        return API.graphql(
            graphqlOperation(onUpdateChatRoomUserByChatRoomChatRoomUsersId, {
                chatRoomChatRoomUsersId: chatroom_id,
            })
        ).subscribe({
            next: ({provider, value: {data: {onUpdateChatRoomUserByChatRoomChatRoomUsersId}}}) => {
                console.log("ON UPDATE CHATROOM USER BY USER ID", onUpdateChatRoomUserByChatRoomChatRoomUsersId);
                callbackfunction(onUpdateChatRoomUserByChatRoomChatRoomUsersId);
            },
            error: (error) => console.warn(error),
        });
    } catch (err) {
        console.error(err);
    }
};
export const subOnUpdateChatRoom = (callbackfunction) => {
    try {
        console.log("Subscribe to onUpdateChatRoom");
        // Subscribe to update of chatroom
        return API.graphql(
            graphqlOperation(onUpdateChatRoom)
        ).subscribe({
            next: ({provider, value: {data: {onUpdateChatRoom}}}) => {
                console.log("ON UPDATE CHATROOM", onUpdateChatRoom);
                callbackfunction(onUpdateChatRoom);

            },
            error: (error) => console.warn(error),
        });
    } catch (err) {
        console.error(err);
    }
};


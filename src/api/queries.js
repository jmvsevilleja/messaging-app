import {API, graphqlOperation} from 'aws-amplify'
import {getUser, getUserAccount} from "../graphql/queries";
import {
    messageByChatRoomMessagesId,
    chatRoomUserByChatRoomUserUserId
} from "../graphql/custom-queries";

export const getAccountById = async (user_id) => {
    if (!user_id) return;
    try {
        return await API.graphql(
            graphqlOperation(getUserAccount, {id: user_id})
        ).then(({data: {getUserAccount}}) => {
            console.log('GET ACCOUNT', getUserAccount);
            return getUserAccount;
        });
    } catch (e) {
        console.log(e);
    }
}

export const getAccountByEmail = async (email) => {
    if (!email) return;
    try {
        return await API.graphql(
            graphqlOperation(getUserAccount, {email: email})
        ).then(({data: {getUserAccount}}) => {
            console.log('GET ACCOUNT', getUserAccount);
            return getUserAccount;
        });
    } catch (e) {
        console.log(e);
    }
}


export const getUserById = async (user_id) => {
    if (!user_id) return;
    try {
        return await API.graphql(
            graphqlOperation(getUser, {id: user_id})
        ).then(({data: {getUser}}) => {
            console.log('GET USER', getUser);
            return getUser;
        });
    } catch (e) {
        console.log(e);
    }
};

export const getChatRooms = async (user_id) => {
    if (!user_id) return;
    try {
        return await API.graphql(
            graphqlOperation(chatRoomUserByChatRoomUserUserId, {chatRoomUserUserId: user_id})
        ).then(({data: {ChatRoomUserByChatRoomUserUserId}}) => {
            console.log('GET CHAT ROOMS', ChatRoomUserByChatRoomUserUserId);
            return ChatRoomUserByChatRoomUserUserId.items;
        });
    } catch (e) {
        console.log(e);
    }
};

export const getMessages = async (chatroom_id) => {
    if (!chatroom_id) return;
    try {
        return await API.graphql(
            graphqlOperation(messageByChatRoomMessagesId, {chatRoomMessagesId: chatroom_id, sortDirection: "DESC", limit: 100})
        ).then(({data: {MessageByChatRoomMessagesId}}) => {
            console.log('GET MESSAGES', MessageByChatRoomMessagesId);
            return MessageByChatRoomMessagesId.items;
        });
    } catch (e) {
        console.log(e);
    }
};
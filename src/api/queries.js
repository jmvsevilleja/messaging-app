import {API, graphqlOperation} from 'aws-amplify'
import {getUserAccount, queryUserAccountsByEmailIndex, getEmailSetting} from "../graphql/queries";
import {
    getUser,
    messageByChatRoomMessagesId,
    chatRoomUserByChatRoomUserUserId
} from "../graphql/custom-queries";

export const getAccountById = async (user_id) => {
    if (!user_id) return;
    try {
        return await API.graphql(
            graphqlOperation(getUserAccount, {id: user_id})
        ).then(({data: {getUserAccount}}) => {
            console.log('GET ACCOUNT BY ID', getUserAccount);
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
            graphqlOperation(queryUserAccountsByEmailIndex, {email: email})
        ).then(({data: {queryUserAccountsByEmailIndex}}) => {
            console.log('GET ACCOUNT BY EMAIL', queryUserAccountsByEmailIndex);
            return queryUserAccountsByEmailIndex.items[0];
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
            console.log('GET USER BY ID', getUser);
            return getUser;
        });
    } catch (e) {
        console.log(e);
    }
};


export const getEmailSignatureById = async (user_email) => {
    if (!user_email) return;
    try {
        return await API.graphql(
            graphqlOperation(getEmailSetting, {id: user_email})
        ).then(({data: {getEmailSetting}}) => {
            console.log('GET EMAIL SETTING BY ID', getEmailSetting);
            return getEmailSetting;
        });
    } catch (e) {
        console.log(e);
    }
};

export const getChatRooms = async (user_id) => {
    if (!user_id) return;
    try {
        return await API.graphql(
            graphqlOperation(chatRoomUserByChatRoomUserUserId,
                {
                    chatRoomUserUserId: user_id,
                    filter: {
                        deleted: {ne: true}
                    }
                })
        ).then(({data: {ChatRoomUserByChatRoomUserUserId}}) => {
            console.log('GET CHATROOMS BY USER ID', ChatRoomUserByChatRoomUserUserId);
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
            graphqlOperation(messageByChatRoomMessagesId, {
                chatRoomMessagesId: chatroom_id,
                sortDirection: "DESC",
                limit: 100,
                filter: {
                    deleted: {ne: true}
                }
            })
        ).then(({data: {MessageByChatRoomMessagesId}}) => {
            console.log('GET MESSAGES BY CHATROOM ID', MessageByChatRoomMessagesId);
            return MessageByChatRoomMessagesId.items;
        });
    } catch (e) {
        console.log(e);
    }
};
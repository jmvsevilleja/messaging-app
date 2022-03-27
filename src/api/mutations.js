import {API, graphqlOperation} from "aws-amplify";

import {
    createUser,
    createChatRoom,
    createChatRoomUser,
    createEmailSetting,
    updateEmailSetting
} from "../graphql/mutations";
import {
    updateUser,
    createMessage,
    updateMessage,
    updateChatRoom,
    updateChatRoomUser,
} from "../graphql/custom-mutations";
import {generateKeyPair} from "../utilities/encryption";


export const addUser = async (user_id, user_name) => {
    if (!user_id || !user_name) return;
    try {
        const secretKey = generateKeyPair();
        return await API.graphql(
            graphqlOperation(createUser, {
                input: {
                    id: user_id,
                    name: user_name,
                    status: "Hi there! I'm using Conva",
                    type: "USER",
                    publicKey: secretKey
                }
            })
        ).then(({data: {createUser}}) => {
            console.log('ADD USER', createUser);
            return createUser;
        });
    } catch (err) {
        console.error(err);
    }
};

export const editUser = async (input) => {
    try {
        return await API.graphql(
            graphqlOperation(updateUser, {
                input: input
            })
        ).then(({data: {updateUser}}) => {
            console.log('EDIT USER', updateUser);
            return updateUser;
        });
    } catch (err) {
        console.error(err);
    }
};

export const addChatRoom = async (user_id, chatroom_name, is_group = false) => {
    if (!user_id || !chatroom_name) return;
    try {
        return await API.graphql(
            graphqlOperation(createChatRoom, {
                input: {
                    name: chatroom_name,
                    chatRoomAdminId: user_id,
                    group: is_group,
                }
            })
        ).then(({data: {createChatRoom}}) => {
            console.log('ADD CHATROOM', createChatRoom);
            return createChatRoom;
        });
    } catch (err) {
        console.error(err);
    }
};

export const editChatRoom = async (input) => {
    try {
        return await API.graphql(
            graphqlOperation(updateChatRoom, {
                input: input
            })
        ).then(({data: {updateChatRoom}}) => {
            console.log('EDIT CHATROOM', updateChatRoom);
            return updateChatRoom;
        });
    } catch (err) {
        console.error(err);
    }
};

export const addChatRoomUser = async (user_id, chatroom_id) => {
    if (!user_id || !chatroom_id) return;
    try {
        return await API.graphql(
            graphqlOperation(createChatRoomUser, {
                input: {
                    chatRoomUserUserId: user_id,
                    chatRoomChatRoomUsersId: chatroom_id,
                }
            })
        ).then(({data: {createChatRoomUser}}) => {
            console.log('ADD CHATROOMUSER', createChatRoomUser);
            return createChatRoomUser;
        });
    } catch (err) {
        console.error(err);
    }
};

export const addMessage = async (input) => {
    try {
        return await API.graphql(
            graphqlOperation(createMessage, {
                input: input
            })
        ).then(({data: {createMessage}}) => {
            console.log('ADD MESSAGE', createMessage);
            return createMessage;
        });
    } catch (err) {
        console.error(err);
    }
};

export const editMessage = async (input) => {
    try {
        return await API.graphql(
            graphqlOperation(updateMessage, {
                input: input
            })
        ).then(({data: {updateMessage}}) => {
            console.log('EDIT MESSAGE', updateMessage);
            return updateMessage;
        });
    } catch (err) {
        console.error(err);
    }
};

export const editChatRoomUser = async (input) => {
    try {
        return await API.graphql(
            graphqlOperation(updateChatRoomUser, {
                input: input
            })
        ).then(({data: {updateChatRoomUser}}) => {
            console.log('EDIT CHATROOMUSER', updateChatRoomUser);
            return updateChatRoomUser;
        });
    } catch (err) {
        console.error(err);
    }
};

export const addSignature = async (user_email, user_signature) => {
    if (!user_email || !user_signature) return;
    try {
        return await API.graphql(
            graphqlOperation(createEmailSetting, {
                input: {
                    id: user_email,
                    signature: user_signature,
                }
            })
        ).then(({data: {createEmailSetting}}) => {
            console.log('ADD SETTING', createEmailSetting);
            return createEmailSetting;
        });
    } catch (err) {
        console.error(err);
    }
};

export const editSignature = async (user_email, user_signature) => {
    try {
        return await API.graphql(
            graphqlOperation(updateEmailSetting, {
                input: {
                    id: user_email,
                    signature: user_signature
                }
            })
        ).then(({data: {updateEmailSetting}}) => {
            console.log('EDIT SETTING', updateEmailSetting);
            return updateEmailSetting;
        });
    } catch (err) {
        console.error(err);
    }
};
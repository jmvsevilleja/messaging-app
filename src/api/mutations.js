import {API, graphqlOperation} from "aws-amplify";
import {
    createUser
} from "../graphql/mutations";
import {
    createChatRoom,
    createChatRoomUser
} from "../graphql/mutations";


export const addUser = async (user_id, user_name) => {
    if (!user_id || !user_name) return;
    try {
        return await API.graphql(
            graphqlOperation(createUser, {
                input: {
                    id: user_id,
                    name: user_name,
                    status: "Hi there! I'm using Conva",
                    type: "USER"
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
            console.log('ADD CHATROOM USER', createChatRoomUser);
            return createChatRoomUser;
        });
    } catch (err) {
        console.error(err);
    }
};

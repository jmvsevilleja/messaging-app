
import {graphConfig} from "../authConfig";
import axios from "axios";

export const getMessages = async (access_token) => {
    try {
        return axios.get(graphConfig.graphMailEndpoint, {
            params: {
                $top: 100,
                $filter: 'isDraft eq false',
                $select: 'id,subject,from,sentDateTime'
            },
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }).then(({status, data}) => {
            if (status === 200) {
                console.log('GET MESSAGES', data);
                return data;
            }
        });

    } catch (err) {
        console.error(err);
    }
}


export const getMessage = async (access_token, message_id) => {
    try {
        return axios.get(graphConfig.graphMailEndpoint + '/' + message_id, {
            params: {
                $filter: 'isDraft eq false',
                $select: 'id,subject,from,sentDateTime, body'
            },
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }).then(({status, data}) => {
            if (status === 200) {
                console.log('GET MESSAGE', data);
                return data;
            }
        });

    } catch (err) {
        console.error(err);
    }
}


export const deleteMessage = async (access_token, message_id) => {
    try {
        return axios.delete(graphConfig.graphMailEndpoint + '/' + message_id, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }).then(({status, data}) => {
            if (status === 200) {
                console.log('DELETE MESSAGE', data);
                return data;
            }
        });
    } catch (err) {
        console.error(err);
    }
};

export const sendMessage = async (access_token, body, callback) => {
    try {
        return axios.post(graphConfig.graphSendMailEndpoint, JSON.stringify(body), {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
        }).then(({status, data}) => {
            if (status === 202) {
                console.log('SEND MESSAGE', data);
                callback();
            }
        });

    } catch (err) {
        console.error(err);
    }
};
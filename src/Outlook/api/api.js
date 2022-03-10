
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
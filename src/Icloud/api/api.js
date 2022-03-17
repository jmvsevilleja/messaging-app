import axios from "axios";


export const getBody = (message, mimeType) => {
    let encodedBody = "";
    if (typeof message.parts === "undefined") {
        encodedBody = message;
    } else {
        encodedBody = getHTMLPart(message, mimeType);
    }
    encodedBody = encodedBody
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .replace(/\s/g, "");
    return decodeURIComponent(escape(window.atob(encodedBody)));
};

const getHTMLPart = (arr, mimeType) => {
    for (let x = 0; x < arr.length; x++) {
        if (typeof arr[x].parts === "undefined") {
            if (arr[x].mimeType === mimeType) {
                return arr[x].body.data;
            }
        } else {
            return getHTMLPart(arr[x].parts, mimeType);
        }
    }
    return "";
};

export const isHTML = str => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
}


export const getMessage = async (secret, message_id) => {

    return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages/${message_id}`, {
        "client": 'icloud',
        "secret": secret,
    }).then(({status, data: {message}}) => {
        if (status === 200) {
            //const {presigned_url, public_url, filename} = res.data.message;
            console.log('GET MESSAGE', message);

            return message;
        }
    });
};

export const sendMessage = async (secret, to, subject, body, callback) => {
    let email = "";
    email += `\r\n<html><body>${body}</body></html>`;
    const encodedEmail = unescape(encodeURIComponent(email));

    return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages-new`, {
        "client": 'icloud',
        "secret": secret,
        "body": encodedEmail,
        "recipient": to,
        "subject": subject,
    }).then(({status, data: {message}}) => {
        if (status === 200) {
            //const {presigned_url, public_url, filename} = res.data.message;
            console.log('SEND MESSAGE', message);
            callback();
        }
    });
};

export const replyMessage = async (secret, message_id, body, callback) => {
    let email = "";
    email += `\r\n<html><body>${body}</body></html>`;
    const encodedEmail = unescape(encodeURIComponent(email));

    return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages/${message_id}/reply`, {
        "client": 'icloud',
        "secret": secret,
        "message_body": encodedEmail,
    }).then(({status, data: {message}}) => {
        if (status === 200) {
            //const {presigned_url, public_url, filename} = res.data.message;
            console.log('SEND MESSAGE', message);
            callback();
        }
    });
};

export const forwardMessage = async (secret, message_id, to, body, callback) => {
    let email = "";
    email += `\r\n<html><body>${body}</body></html>`;
    const encodedEmail = unescape(encodeURIComponent(email));

    return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages/${message_id}/forward`, {
        "client": 'icloud',
        "secret": secret,
        "message_body": encodedEmail,
        "recipient": to,
    }).then(({status, data: {message}}) => {
        if (status === 200) {
            //const {presigned_url, public_url, filename} = res.data.message;
            console.log('SEND MESSAGE', message);
            callback();
        }
    });
};
export const getMessages = async (secret) => {
    try {
        return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages`, {
            "client": 'icloud',
            "secret": secret
        }).then(({status, data: {message}}) => {
            if (status === 200) {
                //const {presigned_url, public_url, filename} = res.data.message;
                console.log('GET MESSAGES', message);
                return message;
            }
        });

    } catch (err) {
        console.error(err);
    }
};

export const deleteMessage = async (secret, message_id, callback) => {
    try {
        return axios.delete(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages/${message_id}`, {
            data: {
                "client": 'icloud',
                "secret": secret
            }
        }).then(({status, data: {message}}) => {
            if (status === 200 && message === 'Success') {
                //const {presigned_url, public_url, filename} = res.data.message;
                console.log('DELETE MESSAGE', message);
                callback();
            }
        });

    } catch (err) {
        console.error(err);
    }
};
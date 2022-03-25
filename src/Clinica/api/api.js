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

export const getMessages = async () => {
    try {
        const secret = localStorage.getItem("clinica");
        return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages`, {
            "client": 'aws',
            "secret": secret
        }).then(({status, data: {message}}) => {
            if (status === 200) {
                console.log('GET MESSAGES', message);
                return message;
            }
        });

    } catch (err) {
        console.error(err);
    }
};

export const getMessage = async (message_id) => {
    const secret = localStorage.getItem("clinica");
    return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages/${message_id}`, {
        "client": 'aws',
        "secret": secret,
    }).then(({status, data: {message}}) => {
        if (status === 200) {
            console.log('GET MESSAGE', message);

            return message;
        }
    });
};

export const sendMessage = async (to, subject, body, callback) => {
    const secret = localStorage.getItem("clinica");
    let email = "";
    email += `\r\n<html><body>${body}</body></html>`;
    const encodedEmail = unescape(encodeURIComponent(email));

    return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages-new`, {
        "client": 'aws',
        "secret": secret,
        "body": encodedEmail,
        "recipient": to,
        "subject": subject,
    }).then(({status, data: {message}}) => {
        if (status === 200) {
            console.log('SEND MESSAGE', message);
            callback();
        }
    });
};

export const replyMessage = async (message_id, body, callback) => {
    const secret = localStorage.getItem("clinica");
    let email = "";
    email += `\r\n<html><body>${body}</body></html>`;
    const encodedEmail = unescape(encodeURIComponent(email));

    return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages/${message_id}/reply`, {
        "client": 'aws',
        "secret": secret,
        "message_body": encodedEmail,
    }).then(({status, data: {message}}) => {
        if (status === 200) {
            console.log('SEND MESSAGE', message);
            callback();
        }
    });
};

export const forwardMessage = async (message_id, to, body, callback) => {
    const secret = localStorage.getItem("clinica");
    let email = "";
    email += `\r\n<html><body>${body}</body></html>`;
    const encodedEmail = unescape(encodeURIComponent(email));

    return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages/${message_id}/forward`, {
        "client": 'aws',
        "secret": secret,
        "message_body": encodedEmail,
        "recipient": to,
    }).then(({status, data: {message}}) => {
        if (status === 200) {
            console.log('SEND MESSAGE', message);
            callback();
        }
    });
};

export const deleteMessage = async (message_id, callback) => {
    try {
        const secret = localStorage.getItem("clinica");
        return axios.delete(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages/${message_id}`, {
            data: {
                "client": 'aws',
                "secret": secret
            }
        }).then(({status, data: {message}}) => {
            if (status === 200 && message === 'Success') {
                console.log('DELETE MESSAGE', message);
                callback();
            }
        });

    } catch (err) {
        console.error(err);
    }
};

export const createWorkMail = async (username, password, callback) => {
    try {
        return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/workmail-account`, {
            "name": username,
            "displayName": username,
            "password": password,
        }).then(({status, data: {message}}) => {
            if (status === 200) {
                console.log('CREATE ACCOUNT', message);
                callback(true);
            }
        }).catch(function (error) {
            console.log(error);
            callback(false);
        });
    } catch (err) {
        console.error(err);
    }
};

export const checkAccount = async (callback) => {
    try {
        const secret = localStorage.getItem("clinica");
        return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/login-email`, {
            "secret": secret,
            "client": "aws"
        }).then(({status, data: {message}}) => {
            if (status === 200) {
                console.log('CHECK ACCOUNT', message);
                callback(true);
            }
        }).catch(function (error) {
            console.log(error);
            callback(false);
        });
    } catch (err) {
        console.error(err);
    }
};
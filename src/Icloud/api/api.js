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
        "secret": secret,
    }).then(({status, data: {message}}) => {
        if (status === 200) {
            //const {presigned_url, public_url, filename} = res.data.message;
            console.log('GET MESSAGE', message);

            return message;
        }
    });
};

export const sendMessage = ({headers, body}) => {
    let email = "";

    const headersClone = {...headers};
    headersClone["Content-Type"] = "text/html; charset='UTF-8'";
    headersClone["Content-Transfer-Encoding"] = "base64";

    for (let header in headersClone) {
        email += `${header}: ${headersClone[header]}\r\n`;
    }

    email += `\r\n<html><body>${body}</body></html>`;
    const encodedEmail = unescape(encodeURIComponent(email));

    return window.gapi.client.gmail.users.messages.send({
        userId: "me",
        resource: {
            raw: window.btoa(encodedEmail).replace(/\+/g, "-").replace(/\//g, "_")
        }
    });
};

export const getMessages = async (secret) => {
    try {
        return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/messages`, {
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
export const signIn = () => {
    return window.gapi.auth2
        .getAuthInstance()
        .signIn()
}

export const initGmailClient = async () => {
    const API_KEY = "AIzaSyBjFh6ULZQB62XwtR-GvP3TDbKUppgMi5o";
    const CLIENT_ID = "444488633099-te5s6q419o9po89b8nes2hg9l4lhq05h.apps.googleusercontent.com";

    // Array of API discovery doc URLs for APIs
    const DISCOVERY_DOCS = [
        "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"
    ];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    // More info: https://developers.google.com/identity/protocols/googlescopes
    const SCOPES = "https://mail.google.com/"; // Scope for Read, send, delete, and manage your email

    const gapi = window.gapi;

    return gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    });
};

export const checkSignInStatus = () => {
    return new Promise((resolve, reject) => {
        initGmailClient().then(() => {
            const gapi = window.gapi;
            const googleAuthInstance = gapi.auth2.getAuthInstance();
            const isSignedIn = googleAuthInstance.isSignedIn.get();
            if (isSignedIn) {
                // Listen for sign-in state changes.
                // googleAuthInstance.isSignedIn.listen(isSignedIn => {
                //     updateSigninStatus(isSignedIn);
                // });
                resolve(googleAuthInstance.currentUser.Nb);
            } else {
                reject();
            }
        })
            .catch(error => {
                reject(error);
            });
    });
};

// Listener for sign-in state
// export const updateSigninStatus = (isSignedIn) => {
//     console.log('updateSigninStatus');
//     if (!isSignedIn) {
//         // TODO: react to logged out status
//     }
// };

export const signOut = () => {
    return window.gapi.auth2
        .getAuthInstance()
        .signOut()
};

export const mountScripts = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.async = true;
        script.defer = true;
        script.onload = () => {
            script.onload = () => {};
            resolve();
        };
        script.onreadystatechange = () => {
            if (script.readyState === "complete") script.onload();
        };
        document.body.appendChild(script);
    });
};

export const getBody = (message, mimeType) => {
    let encodedBody = "";
    if (typeof message.parts === "undefined") {
        encodedBody = message.body.data;
    } else {
        encodedBody = getHTMLPart(message.parts, mimeType);
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

const getLabelDetailPromise = async (labelId) => {
    return await window.gapi.client.gmail.users.labels.get({
        userId: "me",
        id: labelId
    });
};

const getLabelDetails = async (labelList) => {
    const labelPromises = labelList.result.labels.map(async (el) => {
        return await getLabelDetailPromise(el.id);
    });

    return Promise.all(labelPromises);
};

export const getLabelList = async () => {
    const labelIds = await window.gapi.client.gmail.users.labels.list({userId: "me"});
    const labelDetails = await getLabelDetails(labelIds);
    return labelDetails.map(el => el.result);
}


export const flattenMessagesWithLabel = async (messages, labelIds) => {
    if (!labelIds) {
        return {
            messages,
            label: {
                result: {
                    messagesTotal: 0
                }
            }
        };
    }
}

export const getMessage = async (messageId) => {
    const response = await window.gapi.client.gmail.users.messages
        .get({
            userId: "me",
            id: messageId,
            format: "full"
        });

    const {result} = response;

    let body = getBody(result.payload, "text/html");

    if (body === "") {
        body = getBody(result.payload, "text/plain");
        body = body.replace(/(\r\n)+/g, '<br data-break="rn-1">').replace(/[\n\r]+/g, '<br data-break="nr">');
    }

    if (body !== "" && !isHTML(body)) {
        body = body.replace(/(\r\n)+/g, '<div data-break="rn-1" style="margin-bottom:10px"></div>').replace(/[\n\r]+/g, '<br data-break="nr">');
    }

    return {
        body,
        headers: response.headers,
        result: {...result, messageHeaders: response.result.payload.headers, payload: undefined}
    };
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

export const getProfile = async (userId = "me") => {
    return window.gapi.client.gmail.users.getProfile({userId});
}

export const getMessages = async (unread = false, maxResults = 10, userId = "me") => {
    let q = "";
    if (!!unread) {
        q = "is:unread";
    }

    return new Promise((resolve, reject) => {
        window.gapi.client.gmail.users.messages
            .list({userId, maxResults, q})
            .then(resIds => {
                let resData = [];
                if (resIds.result.hasOwnProperty("messages")) {
                    resData = Promise.all(
                        resIds.result.messages.map(({id}) => window.gapi.client.gmail.users.messages.get({
                            userId, id, format: "metadata",
                            metadataHeaders: [
                                "To",
                                "Date",
                                "From",
                                "Subject",
                                // See https://www.iana.org/assignments/message-headers/message-headers.xhtml
                                // for more headers
                            ]
                        }))
                    );
                }
                resolve(resData);
            })
            .catch(e => {
                reject(e);
            });
    });

}
import {box, randomBytes} from 'tweetnacl';
import {
    decodeUTF8,
    encodeUTF8,
    encodeBase64,
    decodeBase64
} from 'tweetnacl-util';

const newNonce = () => randomBytes(box.nonceLength);

export const generateKeyPair = () => {
    const {secretKey} = box.keyPair();
    return encodeBase64(secretKey);
};
export const PRIVATE_KEY = "23wqY24Z5ki2mTHL2/Oa8OxVxetjST4H7m01YZ064A0=";

export const encrypt = (
    secretOrSharedKey,
    message,
    key
) => {
    const nonce = newNonce();
    const messageUint8 = decodeUTF8(JSON.stringify(message));
    const encrypted = key
        ? box(messageUint8, nonce, key, secretOrSharedKey)
        : box.after(messageUint8, nonce, secretOrSharedKey);

    const fullMessage = new Uint8Array(nonce.length + encrypted.length);
    fullMessage.set(nonce);
    fullMessage.set(encrypted, nonce.length);

    const base64FullMessage = encodeBase64(fullMessage);
    return base64FullMessage;
};

export const decrypt = (
    secretOrSharedKey,
    messageWithNonce,
    key
) => {
    const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
    const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
    const message = messageWithNonceAsUint8Array.slice(
        box.nonceLength,
        messageWithNonce.length
    );

    const decrypted = key
        ? box.open(message, nonce, key, secretOrSharedKey)
        : box.open.after(message, nonce, secretOrSharedKey);

    if (!decrypted) {
        throw new Error('Could not decrypt message');
    }

    const base64DecryptedMessage = encodeUTF8(decrypted);
    return JSON.parse(base64DecryptedMessage);
};

export const getSharedKey = (public_key) => {
    return box.before(
        decodeBase64(public_key),
        decodeBase64(PRIVATE_KEY)
    );
}

export const decryptMessage = (message, public_key) => {
    try {
        if (message) {
            return decrypt(getSharedKey(public_key), message);
        }
    } catch (err) {
        console.log(err);
    }
}
// const obj = "Message";
// const encrypted = encrypt(sharedKey, obj);
// try {
//     const decrypted = decrypt(sharedKey, encrypted);
//     console.log(encrypted, decrypted); // should be shallow equal
// } catch (err) {
//     console.error(err);
// }
// console.log('secretKey', generateKeyPair());
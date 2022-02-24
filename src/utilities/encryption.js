import {box, randomBytes} from 'tweetnacl';
import {
    decodeUTF8,
    encodeUTF8,
    encodeBase64,
    decodeBase64
} from 'tweetnacl-util';

const newNonce = () => randomBytes(box.nonceLength);

export const generateKeyPair = () => box.keyPair();
export const PRIVATE_KEY = "42,166,17,8,215,195,170,64,3,159,175,101,233,177,69,100,131,191,21,2,144,156,162,240,63,37,206,104,168,236,55,181";

export const encrypt = (
    secretOrSharedKey: Uint8Array,
    json: any,
    key?: Uint8Array
) => {
    const nonce = newNonce();
    const messageUint8 = decodeUTF8(JSON.stringify(json));
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
    secretOrSharedKey: Uint8Array,
    messageWithNonce: string,
    key?: Uint8Array
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

export const stringToUint8Array = (content) =>
    Uint8Array.from(content.split(",").map((str) => parseInt(str)));


export const getSharedKey = (public_key) => {
    return box.before(
        stringToUint8Array(public_key),
        stringToUint8Array(PRIVATE_KEY)
    );
}

// const obj = "Message";
// const encrypted = encrypt(sharedKey, obj);
// try {
//     const decrypted = decrypt(sharedKey, encrypted);
//     console.log(encrypted, decrypted); // should be shallow equal
// } catch (err) {
//     console.error(err);
// }
// const {secretKey} = generateKeyPair();
// console.log('secretKey', secretKey.toString());
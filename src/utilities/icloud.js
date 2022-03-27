import {box, randomBytes} from 'tweetnacl';
import {
    encodeBase64,
    decodeBase64,
    encodeUTF8
} from 'tweetnacl-util';
import {Buffer} from 'buffer';

const newNonce = () => randomBytes(box.nonceLength);

export const encrypt = (json) => {
    const nonce = newNonce();
    const secretKey = Buffer.from('nADK5whmb8iQHtCKceB7LVYVI5QD0zId', 'utf8')
    const secretData = Buffer.from(JSON.stringify(json), 'utf8')
    const encrypted = box.after(secretData, nonce, secretKey);
    return `${encodeBase64(nonce)}:${encodeBase64(encrypted)}`;
};

export const decrypt = (message) => {
    const splitted = message.split(":");
    const originalMessage = box.open.after(
        decodeBase64(splitted[1]),
        decodeBase64(splitted[0]),
        Buffer.from('nADK5whmb8iQHtCKceB7LVYVI5QD0zId', 'utf8')
    );
    return JSON.parse(encodeUTF8(originalMessage));
};

// console.log(decrypt('S+6ywayMaIDHh1S+Oiz8i6xZa0E+CrJX:+WNej3Y4PqpluMf0JYLofh6M3En0d5P1fXo1x8SHyPHJKszr3Z9ghie0IyHujQ+AzHUoa8tE7soepXM2nvGP7RWYdvhunuu+1rhDdkrAsaOG184='));

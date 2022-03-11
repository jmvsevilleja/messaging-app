import {box, randomBytes} from 'tweetnacl';
import {
    encodeBase64
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

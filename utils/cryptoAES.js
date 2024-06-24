const crypto = require('crypto')

async function generateKeyAES() {
    return await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    )
}

async function importKey(keyString) {

    const jwk = JSON.parse(keyString);
    return await crypto.subtle.importKey(
        'jwk',
        jwk,
        { name: 'AES-GCM' },
        true,
        ['encrypt', 'decrypt']
    )
}

 async function encryptAES(key, dataToEncrypt, iv) {
    let encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        dataToEncrypt
    )
    return new Uint8Array(encryptedBuffer);
}

 async function decryptAES(key, encryptedData) {
    let decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encryptedData
    )
    return new Uint8Array(decryptedBuffer);
}


module.exports.generateKeyAES = generateKeyAES;
module.exports.encryptAES = encryptAES;
module.exports.importKey = importKey;
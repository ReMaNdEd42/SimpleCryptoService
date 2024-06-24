const EncryptedDocument = require('../models/encryptedDocuments.model');
const crypto = require('crypto');
const { encryptAES, importKey, generateKeyAES } = require('../utils/cryptoAES')
const { readFileSync, existsSync } = require('fs');
const { Readable } = require('stream');

class FileExplorerController {
    async getFile(req, res) {
        const { file } = req.params;
        if (!file || !existsSync(`${process.env.DOCUMENT_PATH}/${file}`)) {
            res.status(400).send('');
        }
        else {
            let encDoc = await EncryptedDocument.findOne({
                where: { title: file }
            });
            if (!encDoc) {
                const key = await generateKeyAES();
                const ivStr = crypto.randomBytes(10).toString('hex');
                encDoc = await EncryptedDocument.create({
                    title: file,
                    key: crypto.randomBytes(7).toString('hex').slice(7) +
                        btoa(JSON.stringify({
                            ivStr: ivStr,
                            keyStr: JSON.stringify(await crypto.subtle.exportKey("jwk", key))
                        }))
                })
            }
            let buffer = readFileSync(`${process.env.DOCUMENT_PATH}/${file}`);
            let fileStream = new Readable()

            const blob = Array.from(encDoc.key).splice(7).join("");
            const { ivStr, keyStr } = JSON.parse(atob(blob));

            let key = await importKey(keyStr);
            let iv = new TextEncoder().encode(ivStr);
            let encryptedBuffer = await encryptAES(key, buffer, iv);

            fileStream.push(encryptedBuffer)
            fileStream.push(null)
            fileStream.pipe(res)

        }
    }
}

module.exports = new FileExplorerController();
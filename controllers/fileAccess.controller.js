const EncryptedDocument = require('../models/encryptedDocuments.model');
const { existsSync } = require('fs')

class FileAccessController {
    async getKey(req, res) {
        const { file } = req.params
        if (!file || !existsSync(`${process.env.DOCUMENT_PATH}/${file}`)) {
            res.status(400).send('');
        }
        else {
            let doc = await EncryptedDocument.findOne({
                where: { title: file }
            });
            res.send(doc.key)
        }
    }
}

module.exports = new FileAccessController();
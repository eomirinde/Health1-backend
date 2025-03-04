const crypto = require('crypto');
const fs = require('fs');

const publicKey = fs.readFileSync(__dirname + '/publicKey.pem', 'utf8');
const privateKey = fs.readFileSync(__dirname + '/privateKey.pem', 'utf8');

const encrypt = (data) => {
  const buffer = Buffer.from(data);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
};

const decrypt = (encryptedData) => {
  const buffer = Buffer.from(encryptedData, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
};

module.exports = { encrypt, decrypt };
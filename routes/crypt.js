const crypto = require("crypto"),
	key = "wdnmdwdnmdwdnmdwdnmdwdnmdwdnmdwd",
	iv = "sndsndsndsndsndd";

function encrypt(data) {
	let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
	let encryptdata = cipher.update(data, "utf8", "binary");
	encryptdata += cipher.final("binary");
	return encryptdata;
}

function decrypt(data) {
	let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
	let decoded = decipher.update(data, "binary", "utf8");
	decoded += decipher.final("utf8");
	return decoded;
}
module.exports = {
	encrypt,
	decrypt,
};
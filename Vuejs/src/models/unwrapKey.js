
// import WebCrypto
const crypto = window.crypto || require("@trust/webcrypto");
// const atob = require('atob'); // Remove if on browser

export default function (key, isPrivate) {
    return new Promise((res, rej) => {
        crypto.subtle.importKey(
                'jwk',
                JSON.parse(atob(key)), {
                    name: "RSASSA-PKCS1-v1_5",
                    hash: {
                        name: "SHA-256"
                    },
                },
                true,
                [(isPrivate ? "sign" : "verify")])
            .then(unwrappedKey => res(unwrappedKey))
            .catch(err => rej(err));
    });
}

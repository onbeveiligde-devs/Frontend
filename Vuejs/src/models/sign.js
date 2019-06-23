import str2ab from "./str2ab";

// import WebCrypto
const crypto = window.crypto || require("@trust/webcrypto");

/**
 * Create signature
 * @requires str2ab() convert string to ArrayBuffer
 * @param {String} data data to sign
 * @param {String} key private key
 * @returns {Promise} then signature catch error
 */
export default function (data, key) {
    return new Promise((res, rej) => {
        crypto.subtle
            .importKey(
                "jwk",
                JSON.parse(atob(key)), {
                    name: "RSASSA-PKCS1-v1_5",
                    hash: {
                        name: "SHA-256"
                    }
                },
                true,
                ["sign"]
            )
            .then(privateKey => {
                return crypto.subtle.sign({
                        name: "RSASSA-PKCS1-v1_5"
                    },
                    privateKey,
                    str2ab(data)
                );
            })
            .then(signature => res(signature))
            .catch(err => rej(err));
    });
}

import str2ab from "./str2ab";
import b642ab from "./b642ab";
import unwrapKey from "./unwrapKey";

// import WebCrypto
const crypto = window.crypto || require("@trust/webcrypto");

/**
 * verify signature
 * @param {String} data data should be a string
 * @param {String} sign sign should be a base64sign (string)
 * @param {base64} publicKeyWrappedBase64 public key wrapped
 */
export default function (data, sign, publicKeyWrappedBase64) { 
    return new Promise(async (res, rej) => {
        let pub = await unwrapKey(publicKeyWrappedBase64, false);

        crypto.subtle.verify({
                    name: "RSASSA-PKCS1-v1_5",
                    hash: {
                        name: "SHA-256"
                    },
                },
                pub,
                b642ab(sign),
                str2ab(data)
            )
            .then(succ => {
                res(succ);
            })
            .catch(err => {
                console.error(err);
                rej(err => rej(err));
            });
    });
}

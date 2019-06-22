const crypto = require("@trust/webcrypto");

let privateKey;
let publicKey;
let exportedPrivateKey;
let exportedPublicKey;

let privateBase64Key;
let publicBase64Key;

crypto.subtle
    .generateKey({
            name: "RSASSA-PKCS1-v1_5",
            // Consider using a 4096-bit key for systems that require long-term security
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["sign", "verify"]
    )
    .then(key => {
        // save the keys
        //returns a keypair object
        publicKey = key.publicKey;
        privateKey = key.privateKey;
    })
    .then(() => {
        // export private key to jwk
        return crypto.subtle.exportKey(
            "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
            privateKey //can be a publicKey or privateKey, as long as extractable was true
        );
    })
    .then(function (privateKeyJwk) {
        // save exported private key
        //returns the exported key data
        exportedPrivateKey = privateKeyJwk;
    })
    .then(() => {
        // export public key to jwk
        return crypto.subtle.exportKey(
            "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
            publicKey //can be a publicKey or privateKey, as long as extractable was true
        );
    })
    .then(function (publicKeyJwk) {
        // save exported public key
        //returns the exported key data
        exportedPublicKey = publicKeyJwk;
    })
    .then(() => {
        // save base 64 privatekey
        privateBase64Key = btoa(JSON.stringify(exportedPrivateKey));
        console.log(privateBase64Key);
    })
    .then(() => {
        // save base 64 publickey
        publicBase64Key = btoa(JSON.stringify(exportedPublicKey));
        console.log(publicBase64Key);
    });
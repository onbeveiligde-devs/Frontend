import { Injectable } from '@angular/core';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private util: UtilService) { }

  generateKeys(): Promise<CryptoKeyPair> {
    return new Promise<CryptoKeyPair>((res, rej) => {
      window.crypto.subtle.generateKey(
        {
          name: "RSASSA-PKCS1-v1_5",
          modulusLength: 2048, //can be 1024, 2048, or 4096
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["sign", "verify"] //can be any combination of "sign" and "verify"
      )
        .then(kp => res(kp), err => rej(err))
    });
  }

  sign(data, privateKey): Promise<string> {
    return new Promise(async (res, rej) => {

      let unwrappedKey = await this.unwrapKey(privateKey);

      window.crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        unwrappedKey,
        this.util.str2ab(data))
        .then(signature => res(this.util.ab2b64(signature)));
    });
  }

  unwrapKey(base64Key): Promise<CryptoKey> {
    return new Promise((res, rej) => {
      window.crypto.subtle.importKey(
        "jwk",
         JSON.parse(atob(base64Key)),
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: {name: "SHA-256"},
        },
        true,
        ["verify"]
      );
    })
  }

}

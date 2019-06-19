
export class User {



  constructor(public id: string, 
    public publicKey: CryptoKey,
    public name: string, 
    public online: boolean, 
    public balance: number) {

  }

}


export class User {

  constructor(public id: string, 
    public name: string, 
    public online: boolean, 
    public balance: number,
    public publicKey : string,
    public uuid : string
    ) {

  }

}

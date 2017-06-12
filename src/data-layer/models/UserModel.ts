import {IUserDocument} from '../data-abstracts/repositories/user/IUserDocument';


export class UserModel {

  private _useModel: IUserDocument;

  constructor(iUserDocument: IUserDocument) {
    this._useModel = iUserDocument;
  }


  get id(): string {
    return (this._useModel.id).toString();
  }

  get username(): string {
    return this._useModel.username;
  }


  get password(): string {
    return this._useModel.password;
  }

  get firstname(): string {
    return this._useModel.firstname;
  }


  get lastnanme(): string {
    return this._useModel.lastname;
  }

  get email(): string {
    return this._useModel.email;
  }


  get admin(): boolean {
    return this._useModel.admin;
  }

  get isLoggedIn(): boolean {
    return this._useModel.isLoggedIn;
  }



  get createdAt(): Date {
    return this._useModel.createdAt;
  }

  get modifiedAt(): Date {
    return this._useModel.modifiedAt;
  }


  getClientUserModel(){
     return Object.seal({
                              id: (this._useModel.id).toString(),
                              username: this._useModel.username,
                              firstname: this._useModel.firstname,
                              lastname: this._useModel.lastname,
                              email: this._useModel.email
                        })
  }

   getAdminUserModel(){
     return Object.seal({
                              id: (this._useModel.id).toString(),
                              username: this._useModel.username,
                              password:this._useModel.password,
                              firstname: this._useModel.firstname,
                              lastname: this._useModel.lastname,
                              email: this._useModel.email,
                              admin: this._useModel.admin,
                              isLoggedIn: this._useModel.isLoggedIn,
                              createdAt: this._useModel.createdAt,
                              modifiedAt: this._useModel.modifiedAt
                        })

  }



}
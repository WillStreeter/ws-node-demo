export interface IUserUpdateRequest{
  id?:string,
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  admin?: boolean;
}
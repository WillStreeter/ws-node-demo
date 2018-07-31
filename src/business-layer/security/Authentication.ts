import * as config from 'config';
import * as express from 'express';
import { AuthServiceCheck} from '../../data-layer/data-agents/UserDataAgent';
import { IUserDocument } from '../../data-layer/data-abstracts/repositories/user/IUserDocument'
import { verifyToken } from './token-helpers'
import * as jwt from 'jsonwebtoken';
import { logger } from '../../middleware/common/logging';
import * as moment from 'moment';


let authService = new AuthServiceCheck();
let opts = {
  secretOrKey: config.get('auth.jwt_secret').toString()
};


async function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
    const token:any =  request.headers['x-access-token'];
    if (token) {
       const payload = verifyToken(token);
       if(!(payload instanceof Error) ){
           let authResult = await authService.getAuthById(payload.userId);
           if(authResult && !(authResult instanceof Error)){
                 // uneccessary check... but could be used to refresh token
                 let userModel = <IUserDocument>authResult;
                 if(userModel.id == payload.userId){
                        return Promise.resolve({ authorizedUser:true  });
                 }else {
                      return Promise.reject(new Error('jwt token user cannot be verified BIG TROUBLE'));
                 }
           }else {
             return Promise.reject(new Error('jwt token user cannot be verified'));
           }
       }else {
          return Promise.reject(payload);
       }
    }else {
          return Promise.reject( new Error('jwt token malformed'));
    }
};

export {expressAuthentication}
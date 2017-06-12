import * as config from 'config';
import * as jwt from 'jsonwebtoken';


let opts = Object.assign({
  secretOrKey: config.get('auth.jwt_secret').toString()
});


function createAuthToken(userId:string): string {
     var user = Object.assign({userId:userId});
     let token = jwt.sign(user, config.get('auth.jwt_secret').toString(), {expiresIn: 60*60});
     return token;
};


function verifyToken(token:string):any{
    try {
      return  jwt.verify(token, opts.secretOrKey);
    } catch(err) {
       return new Error('Unable to access data as user cannot be verified ');
     }
}


export {createAuthToken, verifyToken}
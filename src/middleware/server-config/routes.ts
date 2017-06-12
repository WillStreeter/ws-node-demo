/* tslint:disable */
import { ValidateParam } from 'tsoa';
import { Controller } from 'tsoa';
import { AuthorizationsController } from './../../service-layer/controllers/AuthorizationController';
import { UsersController } from './../../service-layer/controllers/UsersController';
import { set } from 'lodash';
import { expressAuthentication } from './../../business-layer/security/Authentication';

const models: any = {
    "IUserResponse": {
        properties: {
            "id": { "required": false, "typeName": "string" },
            "username": { "required": false, "typeName": "string" },
            "firstname": { "required": false, "typeName": "string" },
            "lastname": { "required": false, "typeName": "string" },
            "email": { "required": false, "typeName": "string" },
        },
    },
    "IUserLoginRequest": {
        properties: {
            "username": { "required": true, "typeName": "string" },
            "password": { "required": true, "typeName": "string" },
        },
    },
    "IMessageResponse": {
        properties: {
            "success": { "required": true, "typeName": "boolean" },
            "message": { "required": true, "typeName": "string" },
        },
    },
    "IUserCreateRequest": {
        properties: {
            "username": { "required": true, "typeName": "string" },
            "firstname": { "required": true, "typeName": "string" },
            "lastname": { "required": true, "typeName": "string" },
            "password": { "required": true, "typeName": "string" },
            "email": { "required": true, "typeName": "string" },
        },
    },
    "IErrorResponse": {
        properties: {
            "status": { "required": true, "typeName": "double" },
            "message": { "required": true, "typeName": "string" },
        },
    },
    "IUserUpdateRequest": {
        properties: {
            "id": { "required": false, "typeName": "string" },
            "username": { "required": false, "typeName": "string" },
            "firstname": { "required": false, "typeName": "string" },
            "lastname": { "required": false, "typeName": "string" },
            "email": { "required": false, "typeName": "string" },
            "admin": { "required": false, "typeName": "boolean" },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.post('/api/Authorizations/Login',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "typeName": "IUserLoginRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthorizationsController();


            const promise = controller.login.apply(controller, validatedArgs);
            let statusCode = undefined;
            if (controller instanceof Controller) {
                statusCode = (controller as Controller).getStatus();
            }
            promiseHandler(promise, statusCode, response, next);
        });
    app.post('/api/Authorizations/Logout',
        function(request: any, response: any, next: any) {
            const args = {
                authentication: { "in": "header", "name": "x-access-token", "required": true, "typeName": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthorizationsController();


            const promise = controller.logout.apply(controller, validatedArgs);
            let statusCode = undefined;
            if (controller instanceof Controller) {
                statusCode = (controller as Controller).getStatus();
            }
            promiseHandler(promise, statusCode, response, next);
        });
    app.post('/api/Users',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "typeName": "IUserCreateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.RegisterNewUser.apply(controller, validatedArgs);
            let statusCode = undefined;
            if (controller instanceof Controller) {
                statusCode = (controller as Controller).getStatus();
            }
            promiseHandler(promise, statusCode, response, next);
        });
    app.get('/api/Users/:userId',
        authenticateMiddleware('api_key'
        ),
        function(request: any, response: any, next: any) {
            const args = {
                userId: { "in": "path", "name": "userId", "required": true, "typeName": "string" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "typeName": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.GetUserById.apply(controller, validatedArgs);
            let statusCode = undefined;
            if (controller instanceof Controller) {
                statusCode = (controller as Controller).getStatus();
            }
            promiseHandler(promise, statusCode, response, next);
        });
    app.get('/api/Users/username/:username',
        function(request: any, response: any, next: any) {
            const args = {
                username: { "in": "path", "name": "username", "required": true, "typeName": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.GetUserByUsername.apply(controller, validatedArgs);
            let statusCode = undefined;
            if (controller instanceof Controller) {
                statusCode = (controller as Controller).getStatus();
            }
            promiseHandler(promise, statusCode, response, next);
        });
    app.patch('/api/Users',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "typeName": "IUserUpdateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.Update.apply(controller, validatedArgs);
            let statusCode = undefined;
            if (controller instanceof Controller) {
                statusCode = (controller as Controller).getStatus();
            }
            promiseHandler(promise, statusCode, response, next);
        });

    function authenticateMiddleware(name: string, scopes: string[] = []) {
        return (request: any, response: any, next: any) => {
            expressAuthentication(request, name, scopes).then((user: any) => {
                set(request, 'user', user);
                next();
            })
                .catch((error: any) => {
                    response.status(401);
                    next(error)
                });
        }
    }

    function promiseHandler(promise: any, statusCode: any, response: any, next: any) {
        return promise
            .then((data: any) => {
                if (data) {
                    response.json(data);
                    response.status(statusCode || 200);
                } else {
                    response.status(statusCode || 204);
                    response.end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        return Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name)
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name)
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name);
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name);
            }
        });
    }
}

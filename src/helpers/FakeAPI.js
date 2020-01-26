import { Role } from './Role';
import jwt from 'jsonwebtoken';

export const FakeAPI = (() => {
    const SECRET_KEY = "Tweet-Feed";
    const USER_AUTHENTICATE = '/users/authenticate';
    const USER_AUTHORIZATION = '/users/authorization';

    let _users = [
        { id: 0, email: 'admin@gmail.com', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
        { id: 1, email: 'user@gmail.com', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
    ];

    let isLoggedIn, role;

    window.fetch = function (url, opts) {
        // for getting user info
        const authHeader = opts.headers['Authorization'];
        isLoggedIn = authHeader && authHeader.startsWith('Bearer ');
        const roleString = isLoggedIn && authHeader.split(' ')[1];
        role = roleString ? Role[roleString] : null;

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                signIn(url, opts, ok, error);
                signUp(url, opts, ok);
                getUserById(url, opts, ok, unauthorised);
                getAllUsers(url, opts, ok, unauthorised);

                //_fetch(url, opts).then(response => resolve(response));

                return ok(_users);
            }, 1000);

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
            }

            function unauthorised() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
            }
        });
    };

    const signIn = (url, opts, ok, error) => {
        if (url.endsWith(USER_AUTHENTICATE) && opts.method === 'POST') {
            const params = JSON.parse(opts.body);
            const user = _users.find(user => user.email === params.email && user.password === params.password);

            let token = jwt.sign({ user: user }, SECRET_KEY);

            if (!user) return error('Username or password is incorrect');

            return ok({ token: token });
        }
    }

    const signUp = (url, opts) => {
        if (url.endsWith(USER_AUTHORIZATION) && opts.method === 'POST') {
            const params = JSON.parse(opts.body);

            const user = {
                id: Math.floor(Math.random() * 100),
                email: params.email,
                password: params.password,
                firstName: params.firstName,
                lastName: params.lastName,
                role: Role.User
            }

            _users.push(user);
        }
    }

    const getUserById = (url, opts, ok, unauthorised) => {
        if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
            if (!isLoggedIn) return unauthorised();
            let urlParts = url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1]);

            // only allow normal users access to their own record
            if (role === Role.Admin) return unauthorised();

            const user = _users.find(user => user.id === id);
            return ok(user);
        }
    }

    const getAllUsers = (url, opts, ok, unauthorised) => {
        if (url.endsWith('/users') && opts.method === 'GET') {
            if (role !== Role.Admin) return unauthorised();
            return ok(_users);
        }
    }
})();
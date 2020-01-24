import { Role } from './Role';
import jwt from 'jsonwebtoken';

export const FakeAPI = (() => {
    const SECRET_KEY = "Tweet-Feed";

    let _users = [
        { id: 0, email: 'admin@gmail.com', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
        { id: 1, email: 'user@gmail.com', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
    ];

    const _news = [
        { id: 0, text: "News #1" },
        { id: 1, text: "News #2" },
    ];

    const _fetch = window.fetch;
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
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
            const params = JSON.parse(opts.body);
            //console.log(opts);
            const user = _users.find(user => user.email === params.email && user.password === params.password);

            let token = jwt.sign({ user: user }, SECRET_KEY);

            if (!user) return error('Username or password is incorrect');

            return ok({ token: token });
        }
    }

    const signUp = (url, opts) => {
        if (url.endsWith('/users/authorization') && opts.method === 'POST') {
            const params = JSON.parse(opts.body);
            //console.log(params);

            const user = {
                id: this.Math.random() * 10,
                email: params.email,
                password: params.password,
                firstName: params.firstName,
                lastName: params.lastName
            }

            _users.push(user);
        }
    }

    const getUserById = (url, opts, ok, unauthorised) => {
        if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
            if (!isLoggedIn) return unauthorised();
            // get id from request url
            let urlParts = url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1]);

            // only allow normal users access to their own record

            const currentUser = _users.find(user => user.role === role);

            if (id !== currentUser.id && role !== Role.Admin) return unauthorised();
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
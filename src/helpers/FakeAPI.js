import { Role } from './Role';
import jwt from 'jsonwebtoken';

export const FakeAPI = (() => {
    let _users = [
        { id: 0, email: 'admin@gmail.com', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
        { id: 1, email: 'user@gmail.com', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
    ];

    const _news = [
        { id: 0, text: "News #1" },
        { id: 1, text: "News #2" },
    ];

    const _fetch = window.fetch;

    window.fetch = function (url, opts) {
        const authHeader = opts.headers['Authorization'];
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer ');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null; // ? role.User

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    //console.log(opts);
                    const user = _users.find(user => user.email === params.email && user.password === params.password);

                    let token = jwt.sign({ user: user }, 'secretkey');

                    if (!user) return error('Username or password is incorrect');

                    return ok({
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        token: token
                    });
                }

                if (url.endsWith('/users/authorization') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    console.log(params);

                    const user = {
                        id: this.Math.random() * 10,
                        email: params.email,
                        password: params.password,
                        firstName: params.firstName,
                        lastName: params.lastName
                    }
                }
                // get user by id - admin or user (user can only access their own record)
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();

                    // get id from request url
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    // only allow normal users access to their own record

                    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if (id !== currentUser.id && role !== Role.Admin) return unauthorised();
                    const user = _users.find(user => user.id === id);

                    return ok(user);
                }

                // get all users - admin only
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (role !== Role.Admin) return unauthorised();
                    return ok(_users);
                }

                _fetch(url, opts).then(response => resolve(response));

                if (role !== Role.Admin) return unauthorised();

                return ok(_users);
            });

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
            }

            function unauthorised() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
            }
        }, 500);
    };
})();
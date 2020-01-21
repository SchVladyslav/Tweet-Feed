import { Role } from './Role';
<<<<<<< HEAD
<<<<<<< HEAD
import jwt from 'jsonwebtoken';

export const FakeAPI = (() => {
<<<<<<< HEAD
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
=======
=======
import jwt from 'jsonwebtoken';
>>>>>>> Jwt token added

export function FakeAPI() {
=======
>>>>>>> Added: Scss, layout for dashboard component, minor fixes for fakeAPI
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
<<<<<<< HEAD
        const role = roleString ? Role[roleString] : null;
>>>>>>> Authorization added
=======
        const role = roleString ? Role[roleString] : null; // ? role.User
>>>>>>> Added styles

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
<<<<<<< HEAD
<<<<<<< HEAD
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    //console.log(opts);
                    const user = _users.find(user => user.email === params.email && user.password === params.password);

                    let token = jwt.sign({ user: user }, 'secretkey');

=======
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    console.log(opts);
                    const user = _users.find(x => x.email === params.email && x.password === params.password);
>>>>>>> Authorization added
=======
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    //console.log(opts);
                    const user = _users.find(user => user.email === params.email && user.password === params.password);

                    let token = jwt.sign({ user: user }, 'secretkey');

>>>>>>> Jwt token added
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
<<<<<<< HEAD
<<<<<<< HEAD
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

=======
                        token: `fake-jwt-token.${user.role}`
=======
                        token: token
>>>>>>> Jwt token added
                    });
                }

<<<<<<< HEAD
>>>>>>> Authorization added
=======
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

>>>>>>> Added styles
                // get user by id - admin or user (user can only access their own record)
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();

                    // get id from request url
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    // only allow normal users access to their own record
<<<<<<< HEAD
<<<<<<< HEAD
                    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if (id !== currentUser.id && role !== Role.Admin) return unauthorised();
                    const user = _users.find(user => user.id === id);
=======
                    const currentUser = _users.find(x => x.role === role);
                    if (id !== currentUser.id && role !== Role.admin) return unauthorised();

                    const user = _users.find(x => x.id === id);
>>>>>>> Authorization added
=======
                    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if (id !== currentUser.id && role !== Role.Admin) return unauthorised();
                    const user = _users.find(user => user.id === id);
>>>>>>> Jwt token added
                    return ok(user);
                }

                // get all users - admin only
                if (url.endsWith('/users') && opts.method === 'GET') {
<<<<<<< HEAD
<<<<<<< HEAD
                    if (role !== Role.Admin) return unauthorised();
                    return ok(_users);
                }

                _fetch(url, opts).then(response => resolve(response));
=======
                    if (role !== Role.admin) return unauthorised();
=======
                    if (role !== Role.Admin) return unauthorised();
>>>>>>> Jwt token added
                    return ok(_users);
                }

                _fetch(url, opts).then(response => resolve(response));

<<<<<<< HEAD
                // private helper functions
>>>>>>> Authorization added

=======
>>>>>>> Jwt token added
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
        });
    }
<<<<<<< HEAD
<<<<<<< HEAD

    return {
        _fetch
        //authSignIn,
        //newsGetList,
    }
})();
=======
}

// export const FakeAPI = (() => {
//     const _users = [
//         { id: 0, email: 'admin@gmail.com', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
//         { id: 1, email: 'user@gmail.com', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
//     ];

//     const _news = [
//         { id: 0, text: "Lorem ipsum sum ip sge" },
//         { id: 1, text: "Lorem ipsum sum ip sge" },
//     ];

//     const _fetch = (url, opts) => {
//         const authHeader = opts.headers['Authorization'];
//         const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
//         const roleString = isLoggedIn && authHeader.split('.')[1];
//         const role = roleString ? Role[roleString] : null;

//         return new Promise((resolve, reject) => {
//             // wrap in timeout to simulate server api call
//             setTimeout(() => {
//                 // authenticate - public
//                 if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
//                     const params = JSON.parse(opts.body);
//                     const user = _users.find(x => x.email === params.username && x.password === params.password);
//                     if (!user) return error('Username or password is incorrect');
//                     return ok({
//                         id: user.id,
//                         email: user.email,
//                         firstName: user.firstName,
//                         lastName: user.lastName,
//                         role: user.role,
//                         token: `fake-jwt-token.${user.role}`
//                     });
//                 }

//                 // get user by id - admin or user (user can only access their own record)
//                 if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
//                     if (!isLoggedIn) return unauthorised();

//                     // get id from request url
//                     let urlParts = url.split('/');
//                     let id = parseInt(urlParts[urlParts.length - 1]);

//                     // only allow normal users access to their own record
//                     const currentUser = _users.find(x => x.role === role);
//                     if (id !== currentUser.id && role !== Role.admin) return unauthorised();

//                     const user = _users.find(x => x.id === id);
//                     return ok(user);
//                 }

//                 // get all users - admin only
//                 if (url.endsWith('/users') && opts.method === 'GET') {
//                     if (role !== Role.admin) return unauthorised();
//                     return ok(_users);
//                 }

//                 // pass through any requests not handled above
//                 _fetch(url, opts).then(response => resolve(response));

//                 // private helper functions

//                 function ok(body) {
//                     resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
//                 }

//                 function unauthorised() {
//                     resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
//                 }

//                 function error(message) {
//                     resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
//                 }
//             }, 500);
//         });
//     }



//     return {
//         _fetch
//         // authSignIn,
//         // newsGetList,
//     }
// })();
>>>>>>> Authorization added
=======

    return {
        _fetch
        //authSignIn,
        //newsGetList,
    }
})();
>>>>>>> Added: Scss, layout for dashboard component, minor fixes for fakeAPI

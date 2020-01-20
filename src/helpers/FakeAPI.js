import { Role } from './Role';

export function FakeAPI() {
    let _users = [
        { id: 0, email: 'admin@gmail.com', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.admin },
        { id: 1, email: 'user@gmail.com', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.user }
    ];

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const authHeader = opts.headers['Authorization'];
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    console.log(opts);
                    const user = _users.find(x => x.email === params.email && x.password === params.password);
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        token: `fake-jwt-token.${user.role}`
                    });
                }

                // get user by id - admin or user (user can only access their own record)
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();

                    // get id from request url
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    // only allow normal users access to their own record
                    const currentUser = _users.find(x => x.role === role);
                    if (id !== currentUser.id && role !== Role.admin) return unauthorised();

                    const user = _users.find(x => x.id === id);
                    return ok(user);
                }

                // get all users - admin only
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (role !== Role.admin) return unauthorised();
                    return ok(_users);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

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
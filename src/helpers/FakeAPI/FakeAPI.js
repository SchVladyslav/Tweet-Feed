import {Role} from './Role';
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from './secretKey';
import {Headers} from './Headers';

export const FakeAPI = (() => {

    const ADMIN_EMAIL = 'admin@gmail.com';

    const _users = [{
        email: 'admin@gmail.com', password: 'admin', firstName: 'Admin', lastName: 'Admin', gender: 'male', age: 24, role: Role.Admin
    }];

    const _news = [
        {
            id: '1',
            title: 'Data Modernization: A Short Overview',
            description: 'Data modernization is one of the top technologies driving the IT revolution in many markets. Whether on the client or vendor side, this is the technology you’ll encounter quite frequently. On the vendor side, data modernization service providers, offer analytics and big data solutions.'
        }, {
            id: '2',
            title: 'The Growing Role of IoT and Robotics in Warehousing and Supply Chain Management',
            description: 'The history of robotic process automation in the warehousing and supply chain industry is well documented. Indeed, one of the world’s first robot was created for the sole purpose of moving items from one place to another in the warehouse.'
        }, {
            id: '3',
            title: 'NIX at Laracon EU Amsterdam 2019',
            description: 'The list of events where you can meet NIX has grown: recently our guys have attended Laracon EU Amsterdam 2019. Our PHP developers came back from Amsterdam inspired for future projects, with new knowledge and improved skills. A leading European conference gathers the international community of Laravel PHP in different cities. This time, the event took place in Amsterdam.'
        }, {
            id: '4',
            title: 'Understanding the Pros and Cons of Big Data',
            description: 'According to a report by the Tech Jury, the big data market is set to grow by 20% in 2019. Indeed, by 2020, every person in the world will generate a mind-boggling 1.7 megabytes of data every second. In total, internet users will generate about 2.5 quintillion bytes of data in 2020, bringing the total amount of data generated from computer-enabled devices to date to over 40 zettabytes (equivalent to 40 trillion gigabytes).'
        }, {
            id: '5',
            title: 'NIX at Data Council Barcelona 2019',
            description: 'Today you won’t find any large tech event without NIX representatives on the stage, or mingling among the attendees. Our experts regularly show up at the top world conferences as attendees, speakers or exhibitors to share their knowledge with colleagues from different countries and exchange experiences with them. Recently, our specialists attended the Data Council in Barcelona. Now they are back, rested and ready to share their impressions. '
        },
    ];

    let isLoggedIn;

    window.fetch = function (url, opts) {
        // for getting user info
        const authHeader = opts.headers['Authorization'];
        isLoggedIn = authHeader && authHeader.startsWith('Bearer ');

        return new Promise(resolve => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                signIn(url, opts, ok, error);
                signUp(url, opts, ok, error);
                refreshToken(url, opts, ok);
                getNewsList(url, opts, ok, unauthorised);
                createPost(url, opts, ok, unauthorised);
                editPost(url, opts, ok, unauthorised);
                removePost(url, opts, ok, unauthorised);
                getPostById(url, opts, ok, unauthorised);
                updateUserProfile(url, opts, ok, unauthorised);

                return ok(_users);
            }, 1000);

            function ok(body) {
                resolve({ok: true, text: () => Promise.resolve(JSON.stringify(body))})
            }

            function unauthorised() {
                resolve({status: 401, text: () => Promise.resolve(JSON.stringify({message: 'Unauthorised'}))})
            }

            function error(message) {
                resolve({status: 400, text: () => Promise.resolve(JSON.stringify({message}))})
            }
        });
    };

    const genUniqueID = () => {
        return `f${(~~(Math.random() * 1e8)).toString(32)}`;
    };

    /******AUTH PART OF FAKE API*******/

    const signIn = (url, opts, ok, error) => {
        if (url.endsWith(Headers.USER_AUTHENTICATE) && opts.method === 'POST') {
            let user;
            const params = JSON.parse(opts.body);
            const users = JSON.parse(localStorage.getItem('users'));

            if (users)
                user = users.find(user => user.email === params.email && user.password === params.password);
            else return error(`You're not registered! Sign Up to continue.`);

            if (!user) return error('Username or password is incorrect!');
            delete user.password;

            return ok(createToken(user));
        }
    };

    const createToken = user => {
        const accessToken = jwt.sign({user}, SECRET_KEY, {expiresIn: '2m'});
        const refreshToken = jwt.sign({user}, SECRET_KEY, {expiresIn: '1d'});
        return {accessToken, refreshToken};
    };

    const refreshToken = (url, opts, ok) => {
        if (url.endsWith(Headers.USER_REFRESH_TOKEN) && opts.method === 'POST') {
            const params = JSON.parse(opts.body);
            const decoded = jwt.verify(params.token.refreshToken, SECRET_KEY);
            return ok(createToken(decoded.user));
        }
    };

    const signUp = (url, opts, ok, error) => {
        if (url.endsWith(Headers.USER_AUTHORIZATION) && opts.method === 'POST') {
            const params = JSON.parse(opts.body);

            const user = {
                id: genUniqueID(),
                email: params.email,
                password: params.password,
                firstName: params.firstName,
                lastName: params.lastName,
                gender: params.gender,
                age: params.age,
                role: params.email === ADMIN_EMAIL ? Role.Admin : Role.User
            };

            if (!_users.find(user => user.email === params.email)) {
                _users.push(user);
                localStorage.setItem('users', JSON.stringify(_users));
            } else {
                return error('User with the same E-mail already exist!');
            }

            return ok(_users);
        }
    };

    /******NEWS PART OF FAKE API*******/

    const createPost = (url, opts, ok, unauthorised) => {
        if (url.endsWith(Headers.NEWS_CREATE_POST) && opts.method === 'POST') {
            if (!isLoggedIn) return unauthorised();
            const params = JSON.parse(opts.body);
            const news = {
                id: genUniqueID(),
                title: params.title,
                description: params.description
            };
            _news.push(news);
            ok(_news);
        }
    };

    const editPost = (url, opts, ok, unauthorised) => {
        if (url.includes(Headers.NEWS_EDIT_POST) && opts.method === 'POST') {
            if (!isLoggedIn) return unauthorised();
            const params = JSON.parse(opts.body);
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 1];
            let editedPost;
            _news.forEach((item, i) => {
                if (item.id === id.toString()) {
                    _news[i] = {
                        ...item,
                        title: params.title,
                        description: params.description
                    };
                    editedPost = item;

                }
            });
            ok(editedPost);
        }
    };

    const removePost = (url, opts, ok, unauthorised) => {
        if (url.includes(Headers.NEWS_REMOVE_POST) && opts.method === 'DELETE') {
            if (!isLoggedIn) return unauthorised();
            let urlParts = url.split('/');
            let id = urlParts[urlParts.length - 1];
            _news.forEach((item, i) => {
                if (item.id === id.toString()) {
                    _news.splice(i, 1);
                }
            });

            return ok(_news);
        }
    };

    const getPostById = (url, opts, ok, unauthorised) => {
        if (url.includes(Headers.NEWS_GET_POST) && opts.method === 'GET') {
            if (!isLoggedIn) return unauthorised();
            let urlParts = url.split('/');
            let id = urlParts[urlParts.length - 1];
            const post = _news.find(post => post.id === id.toString());

            return ok(post);
        }
    };

    const getNewsList = (url, opts, ok, unauthorised) => {
        if (url.endsWith(Headers.NEWS_GET_LIST) && opts.method === 'GET') {
            if (!isLoggedIn) return unauthorised();
            return ok(_news);
        }
    };

    /******USER PART OF FAKE API*******/

    const updateUserProfile = (url, opts, ok, unauthorised) => {
        if (url.endsWith(Headers.USER_UPDATE_PROFILE) && opts.method === 'PUT') {
            if (localStorage.getItem('currentUser')) {
                const updatedUser = JSON.parse(opts.body);

                updateUserData(updatedUser);
                updateToken(updatedUser);

            } else return unauthorised();
        }
    };

    const updateUserData = updatedUser => {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(user => user.id === updatedUser.id);
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1, updatedUser);
        localStorage.setItem('users', JSON.stringify(users));
    };

    const updateToken = updatedUser => {
        const {accessToken, refreshToken} = createToken(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify({accessToken, refreshToken}));
    };
})();

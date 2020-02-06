import {Role} from './Role';
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from './secretKey';
import {Headers} from './Headers';
import {authService} from '../../services/auth.service';

export const FakeAPI = (() => {

    const ADMIN_EMAIL = 'admin@gmail.com';


    let _users = [];

    const _news = [
        {
            id: '1',
            title: '1The return of the legendary US airline you\'ve probably never heard of',
            description: 'Miami-based Eastern Airlines\' inaugural flight to New York from the Ecuadorian city of Guayaquil was the first flight to carry the once legendary Eastern name since the failure of the two earlier airlines -- the first in 1991 and the second short-lived iteration in 2017.'
        }, {
            id: '2',
            title: '2Inside one of the world\'s newest (and wettest!) national parks',
            description: 'Some 1.8 million years ago, the Paraná River -- South America\'s second-longest after the Amazon -- carved a rambling path through Argentina\'s Corrientes Province before shifting to its modern location farther west, scientists believe.'
        }, {
            id: '3',
            title: '3Inside one of the world\'s newest (and wettest!) national parks',
            description: 'Some 1.8 million years ago, the Paraná River -- South America\'s second-longest after the Amazon -- carved a rambling path through Argentina\'s Corrientes Province before shifting to its modern location farther west, scientists believe.'
        }, {
            id: '4',
            title: '4Inside one of the world\'s newest (and wettest!) national parks',
            description: 'Some 1.8 million years ago, the Paraná River -- South America\'s second-longest after the Amazon -- carved a rambling path through Argentina\'s Corrientes Province before shifting to its modern location farther west, scientists believe.'
        }, {
            id: '5',
            title: '5Inside one of the world\'s newest (and wettest!) national parks',
            description: 'Some 1.8 million years ago, the Paraná River -- South America\'s second-longest after the Amazon -- carved a rambling path through Argentina\'s Corrientes Province before shifting to its modern location farther west, scientists believe.'
        },
    ];

    let isLoggedIn;

    const _events = [
        {
            id: '0',
            name: "Javascript lesson",
            date: "12.02.2020",
            startTime: "14:00",
            endTime: "19:00",
            isFullDayEvent: false
        },
        {id: '1', name: "React Native Lecture", date: "22.02.2020", startTime: "", endTime: "", isFullDayEvent: true},
        {
            id: '2',
            name: "Meeting with developers",
            date: "25.03.2020",
            startTime: "09:00",
            endTime: "11:00",
            isFullDayEvent: false
        },
        {
            id: '3',
            name: "Ecology Conference",
            date: "15.02.2020",
            startTime: "15:00",
            endTime: "19:00",
            isFullDayEvent: false
        },
        {
            id: '4',
            name: "Company's Birthday Celebration",
            date: "17.02.2020",
            startTime: "",
            endTime: "",
            isFullDayEvent: true
        }
    ];

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

                getAllEvents(url, opts, ok, unauthorised);
                getEventById(url, opts, ok, unauthorised);
                addEvent(url, opts, ok, unauthorised);
                deleteEvent(url, opts, ok, unauthorised);
                editEvent(url, opts, ok, unauthorised);


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

    /*******EVENTS PART OF FAKE API********/

    const getAllEvents = (url, opts, ok, unauthorised) => {
        if (url.endsWith(Headers.EVENTS_GET_ALL) && opts.method === 'GET') {
            if (authService.currentUser) {
                localStorage.removeItem('events');
                localStorage.removeItem('news');
                return ok(_events);
            } else return unauthorised();
        }
    };

    const getEventById = (url, opts, ok, unauthorised) => {
        if (url.endsWith(Headers.EVENT_GET_BY_ID) && opts.method === 'GET') {
            if (authService.currentUser) {
                const id = JSON.parse(opts.body);
                const event = _events.find(event => event.id === id);

                return ok(event);
            } else return unauthorised();
        }
    };

    const addEvent = (url, opts, ok, unauthorised) => {
        if (url.endsWith(Headers.EVENT_ADD) && opts.method === 'POST') {
            if (authService.currentUser) {
                const event = JSON.parse(opts.body);

                const newEvent = {
                    id: genUniqueID(),
                    ...event,
                    startTime: event.startTime || '',
                    endTime: event.endTime || '',
                    isFullDayEvent: !!event.isFullDayEvent
                };

                _events.push(newEvent);

                return ok(_events);
            } else return unauthorised();
        }
    };

    const deleteEvent = (url, opts, ok, unauthorised) => {
        if (url.match(Headers.EVENT_DELETE) && opts.method === 'DELETE') {
            if (authService.currentUser) {
                const id = JSON.parse(opts.body);
                const eventIndex = _events.findIndex(event => event.id === id);

                _events.splice(eventIndex, 1);
                return ok(_events);
            } else return unauthorised();
        }
    };

    const editEvent = (url, opts, ok, unauthorised) => {
        if (url.match(Headers.EVENT_EDIT) && opts.method === 'PUT') {
            if (authService.currentUser) {
                const {id, event} = JSON.parse(opts.body);

                const oldEventIndex = _events.findIndex(event => event.id === id);
                const oldEvent = _events.find(event => event.id === id);

                if (event) {
                    const updatedEvent = {
                        id,
                        name: event.name || oldEvent.name,
                        date: event.date || oldEvent.date,
                        startTime: event.isFullDayEvent ? '' : event.startTime || oldEvent.startTime,
                        endTime: event.isFullDayEvent ? '' : event.endTime || oldEvent.endTime,
                        isFullDayEvent: event.isFullDayEvent
                    };

                    _events.splice(oldEventIndex, 1, updatedEvent);
                    return ok(_events);
                } else window.alert('You changed nothing!');
            } else return unauthorised();
        }
    };

})();

import { authService } from "../services/auth.service";

export function AuthHeader() {
    // return authorization header with jwt token
    const currentUser = authService.currentUserValue;
<<<<<<< HEAD
<<<<<<< HEAD
    if (currentUser && currentUser.token) { //&& currentUser.token
        return { Authorization: `Bearer ${currentUser.token}` }; //.token
=======
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
>>>>>>> Authorization added
=======
    if (currentUser && currentUser.token) { //&& currentUser.token
        return { Authorization: `Bearer ${currentUser.token}` }; //.token
>>>>>>> Added method for getting jwt token
    } else {
        return {};
    }
}
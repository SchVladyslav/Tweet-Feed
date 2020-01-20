import { authService } from "../services/auth.service";

export function AuthHeader() {
    // return authorization header with jwt token
    const currentUser = authService.currentUserValue;
<<<<<<< HEAD
    if (currentUser && currentUser.token) { //&& currentUser.token
        return { Authorization: `Bearer ${currentUser.token}` }; //.token
=======
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
>>>>>>> Authorization added
    } else {
        return {};
    }
}
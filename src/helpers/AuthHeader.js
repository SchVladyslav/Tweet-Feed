import { authService } from "../services/auth.service";

export function AuthHeader() {
    // return authorization header with jwt token
    const currentUser = authService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}
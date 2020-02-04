import { authService } from "../../services/auth.service";

export function AuthHeader() {
    const currentUser = authService.currentUser;
    console.log(currentUser);
    if (currentUser) {
        return { Authorization: `Bearer ${currentUser.role}` };
    } else {
        return {};
    }
}
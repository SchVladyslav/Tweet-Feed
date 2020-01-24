import { authService } from "../services/auth.service";

export function AuthHeader() {
    const currentUser = authService.currentUser;
    if (currentUser) {
        return { Authorization: `Bearer ${currentUser.role}` };
    } else {
        return {};
    }
}
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout as logoutAction, type User } from "@/store/slices/authSlice";

interface UseAuthReturn {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    logout: () => void;
}

export function useAuth(): UseAuthReturn {
    const { user, token } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const isLoggedIn = (): boolean => {
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    };

    const logout = () => {
        dispatch(logoutAction());
    };

    return {
        user,
        token,
        isLoggedIn: isLoggedIn(),
        logout,
    };
}

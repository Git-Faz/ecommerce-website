import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { logout as logoutAction, type User } from "@/features/auth/authSlice";

interface UseAuthReturn {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    isLoading: boolean
    error: string | null
    logout: () => void;
}

export function useAuth(): UseAuthReturn {
    const { user, token, status, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const isLoggedIn = Boolean(token && user);

    const logout = () => {
        dispatch(logoutAction());
    };

    return {
        user,
        token,
        isLoggedIn: isLoggedIn,
        isLoading: status === "loading",
        error,
        logout,
    };
}

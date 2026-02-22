import type { JSX } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import { useAppDispatch } from "@/app/hooks";
import UserInfoCard from "@/features/user/components/UserInfoCard";
import { type UserInfo } from "@/features/user/types";
import { loadProfile } from "@/features/user/api";
import { toast } from "sonner";
import Loading from "@/shared/components/ui/Loading";
import { logout } from "@/features/auth/authSlice";

const UserProfile = (): JSX.Element => {

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [userdata, setUserData] = useState<UserInfo>({ name: "", email: "loading" })
    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully");
        //navigate("/auth", { replace: true });
    };

    useEffect(() => {
        if (!isLoggedIn) {
            toast.info("Login to view profile")
            navigate("/auth", { replace: true });
            return;
        }

        loadProfile()
            .then(res => {
                console.log(res.data.data);
                setUserData(res.data.data);
                setLoading(false)
            })
            .catch(e => {
                console.log("Error", e)
                navigate("/auth", { replace: true });
            })
    }, [isLoggedIn, navigate])

    if (loading) return <Loading />

    return (
        <div className="flex justify-center m-5 p-5">
            <UserInfoCard
                name={userdata.name}
                email={userdata.email}
                onLogout={handleLogout}
            />
        </div>
    )
}

export default UserProfile;
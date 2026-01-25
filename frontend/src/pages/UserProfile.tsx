import type { JSX } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "@/lib/utils";
import UserInfoCard from "@/components/user/UserInfoCard";
import { type UserInfo } from "@/components/user/UserInfoCard";
import { loadProfile } from "@/api/userApi";
import { toast } from "sonner";

const UserProfile = (): JSX.Element => {

    const navigate = useNavigate();
    const [userdata, setUserData] = useState<UserInfo>({ name: "", email: "loading" })

    useEffect(() => {

        if (!isLoggedIn()) {
            toast.info("Login to view profile")
            navigate("/auth", { replace: true });
            return;
        }

        loadProfile()
            .then(res => {
                res.data
                console.log(res.data.data);
                setUserData(res.data.data);
            })
            .catch(e => {
                console.log("Error", e)
                navigate("/auth", { replace: true });
            })
    }, [navigate])


    return (
        <div className="flex justify-center m-5 p-5">
            <UserInfoCard
                name={userdata.name}
                email={userdata.email}
            />
        </div>
    )
}

export default UserProfile;
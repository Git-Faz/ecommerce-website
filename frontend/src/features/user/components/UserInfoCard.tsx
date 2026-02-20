import type { JSX } from "react";
import type { UserInfo } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, CardAction } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserInfoCard = ({name, email, onLogout}: UserInfo): JSX.Element => {

    const navigate = useNavigate(); 

    return (
        <Card className="min-w-fit w-4xl max-w-full">
            <CardHeader>
                <CardTitle className="text-3xl">Hello {name}!</CardTitle>
                <CardDescription>Welcome to your profile, view and change your details here</CardDescription>
                <CardAction className="flex flex-col gap-y-2">
                    <Button variant={"outline"} >Edit Profile</Button>
                    <Button variant={"outline"} onClick={() => navigate("/orders")}>View Orders</Button>
                    <Button variant={"outline"} onClick={onLogout} >Logout</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                    <h4 className="text-lg">Email: <span>{email}</span></h4>
            </CardContent>
            <CardFooter>
                <p className="text-muted-foreground">To raise a complaint click <Link to={"/"} className="underline ">here</Link>  </p>
            </CardFooter>
        </Card>
    )
}

export default UserInfoCard;
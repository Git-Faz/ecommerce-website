import type { JSX } from "react";
import { Link } from "react-router-dom";


export default function Footer (): JSX.Element {

    return (
        <div id="footer" className="flex flex-col w-screen p-2 border-t border-purple-">
            <p className="mx-auto">Made by <Link to={"https://github.com/Git-Faz"} className="underline">Git-Faz</Link></p>
        </div>
    )

}
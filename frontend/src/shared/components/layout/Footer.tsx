import type { JSX } from "react";
import { Link } from "react-router-dom";


export default function Footer (): JSX.Element {

    return (
        <div id="footer" className="w-full p-2 border-t border-blue-300 dark:border-blue-500">
            <p className="text-center w-full">Made by <Link to={"https://github.com/Git-Faz"} className="underline">Git-Faz</Link></p>
        </div>
    )

}
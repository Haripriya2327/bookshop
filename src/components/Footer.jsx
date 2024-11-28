import { DiAtom } from "react-icons/di";
import { DiGithub } from "react-icons/di";
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <div className="w-screen h-[7%] p-1 md:p-3 fixed bottom-0 bg-stone-600 flex flex-row justify-evenly">
            <DiAtom className="text-black w-10 h-10" />
            <p className="text-black p-2 flex text-center flex-row">
                <span className="text-xs md:text-md">Copyright © 2024</span>
            </p>
            <Link to='/about' className="ml-10 hover:text-gray-400">About</Link>
            <a href="https://github.com/Alina-Hari/RentalClient" target="_blank"><DiGithub className="text-black w-10 h-10 hover:text-gray-400">
            </DiGithub></a>
        </div>
    )
}
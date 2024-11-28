import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.jpg';
import service from "../services/file-upload.service";


export default function UserProfilePage() {

    const storedIsAgent = localStorage.getItem("isAgent");
    const storedUser = localStorage.getItem("user");
    const storedUserName = localStorage.getItem("userName");


    return (
        <div className="h-[100%] md:w-full  dark:bg-gray-800 overflow-hidden flex flex-wrap items-center  justify-center ">
            <div className="container lg:w-full lg:h-[80%] mx-10 lg:mx-32 xl:w-2/7 sm:w-full md:w-2/3 bg-white  shadow-lg   rounded-xl  transform   duration-200 easy-in-out">
                <div className=" h-32 lg:h-[20%] overflow-hidden bg-gradient" >
                </div>
                <div className="flex lg:h-[20%] justify-center px-5  -mt-12">
                    <div className="avatar">
                        <div className="w-24 lg:w-32 bg-accent mask mask-hexagon flex justify-center items-center">
                            <span className="text-white text-center text-3xl flex justify-center align-middle items-center h-full">
                                <p className='h-full text-center justify-center align-middle pt-5 text-5xl'>{storedUserName[0].toUpperCase()}</p></span>
                        </div>
                    </div>

                </div>
                <div className="lg:h-[60%] pt-10">
                    <div className="text-center lg:h-[80%]  px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">{storedUserName}</h2>
                        {storedIsAgent === "true" ? <span>Agent</span> : <span>Rentee</span>}

                        {storedIsAgent === "true" ? <p>Helping you find an apartment</p> : (<p className="mt-2 text-gray-500 text-sm">Looking for a cosy apartment... </p>)}

                    </div>

                    <div className="flex lg:h-[20%] ">
                        <div className="text-center p-4 w-full cursor-pointer m-10 md:m-0 md:mb-10">
                            <Link to='/appoinments' className="bg-accent text-white font-bold py-2 px-4 rounded-xl">
                                My Appoinments
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
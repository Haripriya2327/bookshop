import { Link, useNavigate } from "react-router-dom";
import { ImBin, ImHome3 } from "react-icons/im";
import { IoMdTime } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { useState } from "react";
import axios from "axios";

export default function AppoinmentCard(props) {
    const API_URL = import.meta.env.VITE_API_URL;
    const appoinment = props.value;
    const appoinmentId = appoinment._id;
    const apartmentId = appoinment.apartmentId._id;
    const userName = appoinment.userBooked.name;
    const time = appoinment.time;
    const address = appoinment.apartmentId.address;
    const city = appoinment.apartmentId.city;
    const dateObj = new Date(time)
    const apnDay = dateObj.toDateString().slice(0, 3)
    const apnMonth = dateObj.toDateString().slice(4, 7)
    const apnDate = dateObj.toDateString().slice(8, 10)
    const apnTime = dateObj.toTimeString().slice(0, 5)
    const storedIsAgent = localStorage.getItem('isAgent')
    const [alert, setAlert] = useState(false);
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const openAlert = () => {
        setAlert(true);
    }
    function cancelAppoinment() {
        axios
            .delete(`${API_URL}/api/appoinments/${appoinment._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((res) => {
                props.callBack();
                console.log("Appoinment is deleted", res);
            })
            .catch((e) => {
                console.log("Error, ", e);
            });

    }

    return (
        <div className=" h-44  bg-white w-full mb-10 flex flex-row justify-around rounded-xl shadow-md overflow-hidden  mr-10 ">
            <div className="p-8 flex flex-col justify-center text-center  w-[30%]">
                <p className="block mt-1 mb-2 text-md leading-tight font-medium">{apnDay},{apnMonth}</p>
                <p className="block mt-1  mb-2  text-4xl leading-tight font-medium text-blue-700">{apnDate}<span className="text-sm">th</span></p>
                <p className="block mt-1  mb-2  text-md leading-tight font-medium flex flex-row"><IoMdTime />{apnTime}</p>
            </div>
            <div className="p-8 w-[70%]">
                <div className="uppercase tracking-wide text-sm text-indigo-500 flex flex-row font-semibold"><MdLocationOn />{address},{city}</div>
                {storedIsAgent === "true" && <p className="mt-2 text-gray-500">Rentee - {userName}</p>}
                <button className="mt-5 px-2  py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <Link to={`/apartments/${apartmentId}`}>More Info</Link>
                </button>
                {storedIsAgent === "false" && <button className="mt-5 ml-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" onClick={openAlert}>
                    <ImBin />
                </button>}
                {alert && (
                    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-opacity-50 bg-black">
                        <div className="bg-white rounded-xl shadow-lg p-5 max-w-md w-full mx-4 overflow-auto">
                            <div className="card-actions justify-end">
                                <button onClick={() => setAlert(false)} type="button" className="btn btn-xs btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <h3 className="font-bold text-lg">Cancel Confirmation</h3>
                            <p className="py-4">Are you sure you want to cancel this appoinment?</p>
                            <div className=" modal-actions flex gap-5 justify-end">
                                <button className="btn btn-sm btn-accent rounded-xl" onClick={() => setAlert(false)}>No</button>
                                <button className="btn btn-sm btn-ghost" onClick={cancelAppoinment}>Yes</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

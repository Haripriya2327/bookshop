import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import UpdateApartment from "../components/UpdateApartment";
import CreateAppoinment from "../components/CreateAppoinment";
const API_URL = import.meta.env.VITE_API_URL;
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePets } from "react-icons/md";
import { FaCouch } from "react-icons/fa6";
import { GiHouse } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../context/auth.context";

function ApartmentDetailsPage(props) {
    const [apartment, setApartment] = useState(null);
    const { apartmentId } = useParams();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const [openAppoinment, setOpenAppoinment] = useState(false);
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken");
    const storedIsAgent = localStorage.getItem("isAgent");
    const { isLoggedIn } = useContext(AuthContext);

    // props.getId(apartmentId)

    const getApartment = () => {
        axios
            .get(`${API_URL}/api/apartments/${apartmentId}`)
            .then((response) => {
                setApartment(response.data);
                console.log("Responce appartment", response);
                console.log("isAvailable", response.data.isAvailable)
            })
            .catch((error) => console.log(error));
    };

    const openPopUp = () => {
        setOpen(true);
    }

    const openAlert = () => {
        setAlert(true);
    }

    const openAppoinmentPopUp = () => {
        setOpenAppoinment(true);
    }
    useEffect(() => {
        getApartment();
    }, [apartmentId, open]);


    function deleteApartment() {
        axios
            .delete(`${API_URL}/api/apartments/${apartment._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((res) => {
                cancelAppoinment();
                navigate('/apartments')
                console.log("Apartment is deleted", res);
            })
            .catch((e) => {
                console.log("Error, ", e);
            });

    }
    function cancelAppoinment() {
        axios
            .delete(`${API_URL}/api/delete?apartmentId=${apartmentId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((res) => {
                console.log(`Appoinments are deleted for ${apartmentId}`, res);
            })
            .catch((e) => {
                console.log("Error, ", e);
            });

    }

    return (
        <div className="h-[100%] w-full overflow-y-scroll">
            {apartment && (
                <>
                    <div className="relative h-[90%]">
                        <Link className="absolute top-5 left-5 md:hidden" to="/apartments">
                            <button className="btn btn-circle btn-outline bg-slate-200 relative"><IoIosArrowRoundBack /></button>
                        </Link>
                        <div className="w-full carousel rounded-box md:hidden">
                            {apartment.images.map((image, index) => {
                                return (
                                    <div className="carousel-item w-full h-80" key={index}>
                                        <img
                                            src={image}
                                            className="object-cover w-full h-full mx-auto rounded-xl"
                                            alt={`Image ${index + 1}`}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="h-full md:flex flex-row-reverse justify-between">
                            <div className="hidden w-1/2 h-full md:flex flex-col">

                                <div className="relative">
                                    <div className="w-full h-96" >
                                        <img
                                            src={apartment.images[0]}
                                            className="object-cover w-full h-full mx-auto rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {apartment.images.map((image, index) => {
                                        if (index === 1 || index === 2) {
                                            return (
                                                <div className="w-1/2 h-52 mt-2" key={index}>
                                                    <img
                                                        src={image}
                                                        className="object-cover w-full h-full mx-auto rounded-xl"
                                                        alt={`Image ${index + 1}`}
                                                    />
                                                </div>
                                            );
                                        }
                                    })}

                                </div>
                            </div>
                            <div className="flex flex-col lg:items-center gap-1 mt-5 md:mt-0 md:pr-10 w-full md:w-1/2 px-0 lg:px-20">
                                <h1 className="card-title md:text-4xl text-left lg:text-center">
                                    {apartment.area && apartment.area < 40 ? "Cosy" : "Spacious"} {apartment.apartmentType} in {apartment.city}
                                </h1>
                                {!(apartment.isAvailable) && <span className="text-blue-700 text-xl w-auto">In escrow</span>}
                                <p className="flex items-center gap-2 text-slate-500 " ><CiLocationOn />{apartment.address}, {apartment.city}</p>
                                <p className="font-medium mt-5 text-xl">$ {apartment.price} / month</p>
                                <div className="flex gap-5 bg-slate-100 rounded-xl p-3 justify-between mt-5 md:mt-10">
                                    <p className="flex items-center gap-2"><GiHouse /> {apartment.area} m²</p>
                                    <p className="flex items-center gap-2"><FaCouch /> {apartment.isFurnished ? "Furnished" : "Not furnished"}</p>
                                    <p className="flex items-center gap-2"><MdOutlinePets /> {apartment.isPetFriendly ? "Pet friendly" : "No pets allowed"}</p>
                                </div>
                                <p className="mt-5 lg:mt-20 mb-20 md:mb-10 lg:mb-5 pb-10 md:pb-24 md:pr-5 text-justify">{apartment.description}</p>

                            </div>
                        </div>
                    </div>
                </>
            )}
            {/* for agent */}
            {(isLoggedIn && storedIsAgent === "true" && apartment) && <div className="flex justify-between align-middle items-center fixed bottom-0 left-0 w-full md:w-[50%] lg:w-[35%]  bg-slate-100 py-4 px-6 shadow-inner rounded-t-2xl ml-0 lg:ml-28 ">
                <Link to="/apartments">
                    <button className="btn btn-circle btn-outline bg-slate-200 relative"><IoIosArrowRoundBack /></button>
                </Link>
                <div className="flex gap-3">
                    <button className="btn hover:btn-outline btn-accent rounded-xl" onClick={openPopUp}>Edit</button>

                    <button className="btn  btn-accent btn-outline rounded-xl" onClick={openAlert}>Delete</button>
                </div>
                {alert && (
                    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-opacity-50 bg-black">
                        <div className="bg-white rounded-xl shadow-lg p-5 max-w-md w-full mx-4 overflow-auto">
                            <div className="card-actions justify-end">
                                <button onClick={() => setAlert(false)} type="button" className="btn btn-xs btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <h3 className="font-bold text-lg">Delete Confirmation</h3>
                            <p className="py-4">Are you sure you want to delete this apartment?</p>
                            <div className="modal-actions flex gap-5 justify-end">
                                <button className="btn btn-sm btn-accent rounded-xl" onClick={() => setAlert(false)}>Cancel</button>
                                <button className="btn btn-sm btn-ghost" onClick={deleteApartment}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>}
            {open ? <div className="absolute top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] ">
                <UpdateApartment closePopUp={() => setOpen(false)} apartment={apartment} callBack={getApartment}/>
            </div> : null}
            {/* for user */}
            {(isLoggedIn && storedIsAgent === "false" && apartment) && (<div className="flex justify-between align-middle items-center fixed bottom-0 left-0 w-full md:w-1/2 bg-slate-100 py-4 px-6 shadow-lg rounded-t-2xl">
                <p className="font-medium">$ {apartment && apartment.price} / month</p>
                <button
                    onClick={openAppoinmentPopUp}
                    className="btn btn-active btn-accent rounded-xl"
                    disabled={!(apartment.isAvailable)}>
                    <FaCalendarAlt />
                    Book a visit now
                </button>
            </div>)}
            {openAppoinment ? <div className="absolute top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] ">
                <CreateAppoinment closePopUp={() => setOpenAppoinment(false)} apartmentId={apartment._id} apartment={apartment} />
            </div> : null
            }
        </div>
    );
}

export default ApartmentDetailsPage;
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import ApartmentCard from "../components/ApartmentCard";
import CreateApartment from "../components/CreateApartment";
import SearchBy from "../components/SearchBy";
const API_URL = import.meta.env.VITE_API_URL;
import { BsHouseAddFill } from "react-icons/bs";
import { AuthContext } from "../context/auth.context";

export default function ApartmentListPage() {

    const [apartments, setApartments] = useState([])
    const [open, setOpen] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
    const storedIsAgent = localStorage.getItem("isAgent");

    const getApartments = () => {
        axios
            .get(`${API_URL}/api/apartments`)
            .then((response) => {
                setApartments(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }
    const openPopUp = () => {
        setOpen(true);
    }
    useEffect(() => {
        getApartments();
    }, [open])

    const searchByLocation = ({ value, type }) => {
        let queryString = "";
        const location = { value, type };
        if (type === "city") {
            queryString = "city=";
        }
        else {
            queryString = "country=";
        }

        axios
            .get(`${API_URL}/api/search?${queryString}${value}`)
            .then((response) => {
                setApartments(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            });

    }
    return (
        <div className="h-full flex flex-col overflow-y-scroll gap-3">
            <div className="flex justify-center align-middle flex-row ">
                <SearchBy callBack={searchByLocation} /> {(isLoggedIn && storedIsAgent === "true") && <button className="btn bg-white rounded-xl ml-5" onClick={openPopUp}>
                    <BsHouseAddFill />
                    New Rental</button>}</div>
            <div>
                {apartments === null &&
                    <p>Loading</p>}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-0 md:px-20 items-center">


                    {apartments !== null &&
                        apartments.map((apartment) => {
                            return <ApartmentCard key={apartment._id} value={apartment} />
                        })}
                    {apartments.length === 0 && <p>No rentals in this location</p>}

                </div>
            </div>
            {open ? <div className="absolute top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] ">
                <CreateApartment closePopUp={() => setOpen(false)} callBack={getApartments} />
            </div> : null}
        </div>

    )
}
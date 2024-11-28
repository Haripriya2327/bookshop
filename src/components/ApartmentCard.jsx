import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePets } from "react-icons/md";
import { FaCouch } from "react-icons/fa6";
import { GiHouse } from "react-icons/gi";

export default function ApartmentCard(props) {

    const apartment = props.value;
    const apartmentId = apartment._id

    return (
        <Link to={`/apartments/${apartmentId}`}>
            <div className="rounded-xl card lg:card-side bg-base-100 shadow-xl text-sm lg:text-lg my-3">
                <div className="h-45 w-96 p-2 ">
                    {apartment.images &&
                        (<div className="w-full carousel rounded-box">
                            {apartment.images.map((image, index) => {
                                return (
                                    <div className="carousel-item w-full h-44" key={index}>
                                        <img
                                            src={image}
                                            className="object-cover w-full h-full mx-auto rounded-xl"
                                            alt={`Image ${index + 1}`}
                                        />
                                    </div>
                                );
                            })}
                        </div>)
                    }
                </div>
                <div className="card-body p-5 w-full ">

                    <h1 className="card-title">
                        {apartment.area && apartment.area < 40 ? "Cosy" : "Spacy"} {apartment.apartmentType} in {apartment.city}
                    </h1>
                    {!(apartment.isAvailable) && <span className="text-blue-700 text-xl">In escrow</span>}
                    <p className="flex items-center gap-2"><CiLocationOn />{apartment.address}, {apartment.city}</p>
                    <p className="font-medium">$ {apartment.price} / month</p>
                    <div className="flex">
                        <p className="flex items-center gap-2"><GiHouse /> {apartment.area} m²</p>
                        <p className="flex items-center gap-2"><FaCouch /> {apartment.isFurnished ? "Furnished" : "Not furnished"}</p>
                        <p className="flex items-center gap-2"><MdOutlinePets /> {apartment.isPetFriendly ? "Pet friendly" : "No pets allowed"}</p>
                    </div>

                </div>
            </div>



        </Link >
    );
}

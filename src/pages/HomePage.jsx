import netherlands from '../assets/netherlands.png'
import map from '../assets/map.png'
import { BiHomeHeart } from "react-icons/bi";
import { IconContext } from "react-icons";
import { FaCalendarAlt } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'

export default function HomePage() {

    const offers = [
        {
            name: "Move-In Specials",
            text: "Waived application fees, discounted security deposits, or a month of free rent for new tenants."
        },
        {
            name: "Flexible Lease Options",
            text: "short-term leases, month-to-month options, or lease-to-own arrangements to accommodate diverse tenant needs."
        },
        {
            name: "Amenity Bundles",
            text: "Complimentary amenities or services, such as free parking, gym memberships, or access to community facilities."
        },
        {
            name: "Renewal Incentives",
            text: "Lease renewal benefits, like reduced rent increases, complimentary maintenance services."
        }
    ]
    return (
        <div className='bg-stone-200 h-full overflow-y-scroll lg:overflow-y-hidden'>
            <div className="w-full h-[80%] flex flex-col lg:flex-row justify-start md:justify-between rounded-xl mb-7  shadow-sm ">
                <div className='flex flex-col justify-start gap-10'>
                    <div className="flex flex-col justify-between p-2 ">
                        <h1 className='text-4xl lg:text-7xl font-extrabold my-10 w-full text-accent '>Renting made easy</h1>


                        <div className="chat chat-start mb-10">
                            <div className="chat-bubble chat-bubble-accent">Looking to rent out an apartment? </div>
                        </div>


                        {/* <h2 className='font-semibold text-lg md:text-3xl mt-2 mb-2 text-left'>Take control of your listings and bookings - join our platform and simplify your rental management tasks!</h2>
                    <p className='mt-2 text-sm md:text-xl mb-2'>Effortlessly showcase your properties and handle bookings. Whether it's managing availability, listing properties our platform equips you with the tools you need to succeed.</p> */}

                        <div className="stats shadow gap-2 w-full lg:w-[100%] rounded-2xl h-18 bg-gray-300 p-0 overflow-x-scroll lg:overflow-hidden align-center items-end">

                            <div className="stat py-1">
                                <div className="stat-figure text-primary">
                                    <HiCursorClick className="inline-block w-5 md:w-8 h-5 stroke-current" />
                                </div>
                                <div className="text-lg md:text-2xl font-bold">List</div>
                                <div className="stat-title">your apartment</div>
                            </div>


                            <div className="stat p-1">
                                <div className="stat-figure text-primary">
                                    <FaCalendarAlt className="inline-block w-8 h-6 stroke-current" />
                                </div>
                                <div className="text-lg md:text-2xl font-bold">Keep track</div>
                                <div className="stat-title">of your bookings</div>
                            </div>

                            <div className="stat p-1">
                                <div className="stat-figure text-secondary">
                                    <div className="avatar flex justify-center items-center">
                                        <div className="w-14 bg-accent mask mask-hexagon flex justify-center items-center">
                                            <span className="text-white text-center text-3xl flex justify-center align-middle items-center h-full">
                                                <p className='h-full text-center justify-center align-middle pt-2'>H</p></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-lg md:text-2xl font-bold">Manage</div>
                                <div className="stat-title">your listing</div>
                            </div>

                        </div>
                    </div>


                    <div className="flex flex-col items-end justify-between p-2 ">

                        <div className="chat chat-end mb-10">
                            <div className="chat-bubble chat-bubble-accent">Searching an appartment in Netherlands?</div>
                        </div>
                        {/* <h2 className='font-semibold text-lg md:text-3xl mt-2 mb-2 text-right'>Discover your dream home in the Netherlands - schedule visits with expert agents today!</h2>
                    <p className='mt-2 text-sm md:text-xl mb-2 text-right'>Find the perfect place to call home. Whether you're searching for a cozy studio,
                        a spacious family apartment, or a modern urban loft, we've got you covered.</p> */}

                        <div className="stats shadow gap-2 w-full lg:w-[100%] rounded-2xl h-18 bg-gray-300 p-0 overflow-x-scroll lg:overflow-hidden align-center items-end">

                            <div className="stat p-1">
                                <div className="stat-figure text-primary">
                                    <IoSearchOutline className="inline-block w-8 h-8 stroke-current" />
                                </div>
                                <div className="text-xl md:text-2xl font-bold">Search</div>
                                <div className="stat-title">in your city</div>
                            </div>


                            <div className="stat p-1">
                                <div className="stat-figure text-primary">
                                    <FaCalendarAlt className="inline-block w-8 h-6 stroke-current" />
                                </div>
                                <div className="text-xl md:text-2xl font-bold">Book</div>
                                <div className="stat-title">on one click</div>
                            </div>

                            <div className="stat py-1">
                                <div className="stat-figure text-secondary">
                                    <div className="avatar flex justify-center items-center">
                                        <div className="w-14 bg-accent mask mask-hexagon flex justify-center items-center">
                                            <span className="text-white text-center text-3xl flex justify-center align-middle items-center h-full">
                                                <p className='h-full text-center justify-center align-middle pt-2'>A</p></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xl md:text-2xl font-bold">Manage</div>
                                <div className="stat-title">your bookings</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex relative h-[100%] flex-col justify-evenly md:w-1/2 p-2 ">
                    <img src={netherlands} className="object-fit w-[70%]" />
                    {/* <div className='absolute left-80 top-60 text-5xl'><IconContext.Provider value={{ color: "white" }}>
                        <BiHomeHeart /></IconContext.Provider></div> */}
                </div>
            </div>
            <Footer />

        </div >
    )
}
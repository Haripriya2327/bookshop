import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const apartmentTypes = ["Studio", "Loft", "Duplex", "Apartment", "House"];
import { useEffect, useState } from "react";
import DTPicker from "./DTPicker"
import service from "../services/file-upload.service";
import { MdOutlinePets } from "react-icons/md";
import { FaCouch } from "react-icons/fa6";
import { GiHouse } from "react-icons/gi";
import cityData from '../data/citiesOfNetherlands.json'

const COUTRIES_AND_CITIES_API = "https://countriesnow.space/api/v0.1/countries"

//const [availableDates, setAvailableDates] = useState([]); // TODO calendar

function CreateApartment(props) {
  const [apartmentType, setApartmentType] = useState("");
  const [floor, setFloor] = useState("");
  const [price, setPrice] = useState(0);
  const [area, setArea] = useState(0);
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState("");
  const [isFurnished, setIsFurnished] = useState(false);
  const [isPetFriendly, setIsPetFriendly] = useState(false);
  const [images, setImages] = useState([]);
  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false);
  const [locationData, setLocationData] = useState([])
  // const [filteredCountry, setFilteredCountry] = useState(null)
  const [availableDates, setAvailableDates] = useState({})
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const filteredCountry = cityData[0].cities;


  const navigate = useNavigate();

  const handleisFurnished = (e) => {
    setIsFurnished(e.target.checked);
    console.log(setIsFurnished);
  };

  const handleisPetFriendly = (e) => {
    setIsPetFriendly(e.target.checked);
  };

  const handleFileUpload = (e) => {

    setWaitingForImageUrl(true);
    const dataToUpload = new FormData();
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      dataToUpload.append(`images`, file);
    });


    service
      .uploadImage(dataToUpload)
      .then(response => {
        setImages(response.fileUrls);
        setWaitingForImageUrl(false);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();

    const apartmentObj = {
      apartmentType,
      floor,
      price,
      area,
      country: "Netherlands",
      city: cities,
      isFurnished,
      isPetFriendly,
      images,
      availableDates,
      address
    };


    service
      .createApartment(apartmentObj, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((res) => {
        props.callBack()
        console.log(res);
      })
      .catch((e) => {
        console.log("Error, ", e);
      });

    props.closePopUp();

  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-opacity-50 bg-black md:text-lg">
      <div className="bg-white rounded-xl shadow-lg p-5 w-full md:w-[80%] mx-4 overflow-auto md:text-lg h-[90%] md:h-[80%]">
        <div className="card-actions justify-end">
          <button onClick={props.closePopUp} type="button" className="btn btn-xs btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>



          <div className="flex flex-col w-full lg:flex-row">
            <div className="grid flex-grow h-full card rounded-box place-items-left">


              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Apartment Type</span>
                </div>
                <select className="select select-bordered select-xs w-full max-w-xs"
                  name="apartmentType"
                  id="apartmentType"
                  value={apartmentType}
                  required
                  onChange={(e) => {
                    setApartmentType(e.target.value);
                  }}
                >
                  <option value="">-- Select Type --</option>
                  {apartmentTypes.map((apartmentType, index) => {
                    return (
                      <option key={index} value={apartmentType}>
                        {apartmentType}
                      </option>
                    );
                  })}
                </select>
              </label>

              <div className="flex gap-3">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Floor</span>
                  </div>
                  <input className="input input-bordered input-xs w-full max-w-xs" type="text" name="floor" value={floor} onChange={(e) => setFloor(e.target.value)} /></label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Surface</span>
                  </div>
                  <input className="input input-bordered input-xs w-full max-w-xs" type="number" name="area" value={area} onChange={(e) => setArea(e.target.value)} /></label>
              </div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Price</span></div>
                <input className="input input-bordered input-xs w-full max-w-xs" type="number" name="price" value={price} required onChange={(e) => setPrice(e.target.value)} /></label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Pick city</span>
                </div>
                {(filteredCountry === null || filteredCountry === undefined) ? <select className="select select-bordered select-xs w-full max-w-xs"></select> : (<select className="select select-bordered select-xs w-full max-w-xs" name="city" defaultValue={"default"} required onChange={(e) => setCities(e.target.value)}>
                  <option disabled>Pick one</option>
                  {filteredCountry.map((city, index) => {
                    return <option key={index} value={city}>{city}</option>
                  }
                  )}
                </select>)}
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Address</span>
                </div>
                <input className="input input-bordered input-xs w-full max-w-xs" type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} /></label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Description</span>
                </div>
                <textarea className="textarea textarea-bordered h-24" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <div className="label">
                </div>
              </label>


              <div className="flex justify-between p-2">
                <label className="input flex items-center gap-2 text-sm p-0">
                  <FaCouch /> Furnished
                  <input type="checkbox" className="checkbox checkbox-xs checkbox-accent" id="isFurnished" name="isFurnished" checked={isFurnished} onChange={handleisFurnished} />
                </label>

                <label className="input flex items-center gap-2 text-sm p-0">
                  <MdOutlinePets /> Pet friendly
                  <input type="checkbox" className="checkbox checkbox-xs checkbox-accent" id="isPetFriendly" name="isPetFriendly" checked={isPetFriendly} onChange={handleisPetFriendly} />
                </label>
              </div>

            </div>

            <div className="divider lg:divider-horizontal"></div>

            <div className="grid flex-grow h-full card rounded-box place-items-left">
              <label>
                Select Dates for Rentee visits
              </label>
              <DTPicker setAvailableDates={setAvailableDates} />


              <label className="form-control w-full max-w-xs mt-5">
                <div>
                  <span className="label-text">Add photos</span>
                </div>
                <input className="file-input file-input-bordered file-input-xs w-full max-w-xs" type="file" multiple onChange={(e) => handleFileUpload(e)} />
              </label>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                {images &&
                  (images.map((image, index) => (
                    <div key={index} className="avatar">
                      <div className="w-12 rounded" >
                        <img src={image} alt="apartment-photo" />
                      </div>
                    </div>
                  ))
                  )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button type="submit" className="btn btn-outline btn-accent rounded-lg mt-5 items-center" disabled={waitingForImageUrl}>Create</button>
          </div>
        </form>
      </div >
    </div >
  );
}

export default CreateApartment;

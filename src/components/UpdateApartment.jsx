import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const apartmentTypes = ["Studio", "Loft", "Duplex", "Apartment", "House"];
import { useState } from "react";
import DTPicker from "./DTPicker";
import service from "../services/file-upload.service";

function UpdateApartment(props) {
  const apartment = props.apartment;
  const [apartmentType, setApartmentType] = useState(apartment.apartmentType);
  const [floor, setFloor] = useState(apartment.floor);
  const [price, setPrice] = useState(apartment.price);
  const [area, setArea] = useState(apartment.area);
  const [isFurnished, setIsFurnished] = useState(apartment.isFurnished);
  const [isPetFriendly, setIsPetFriendly] = useState(apartment.isPetFriendly);
  const [isAvailable, setIsAvailable] = useState(apartment.isAvailable)
  const [availableDates, setAvailableDates] = useState(apartment.availableDates)
  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false);
  const [images, setImages] = useState(apartment.images);
  const [description, setDescription] = useState(apartment.description);
  const [address, setAddress] = useState(apartment.address);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleisFurnished = (e) => {
    setIsFurnished(e.target.checked);
  };

  const handleisPetFriendly = (e) => {
    setIsPetFriendly(e.target.checked);
  };
  const handleisAvailable = (e) => {
    setIsAvailable(e.target.checked);
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


  const handleSubmit = (e) => {
    e.preventDefault();

    const apartmentObj = {
      apartmentType,
      floor,
      price,
      area,
      country: apartment.country,
      city: apartment.city,
      isFurnished,
      isPetFriendly,
      isAvailable,
      availableDates,
      images,
      address,
      description
    };

    axios
      .put(`${API_URL}/api/apartments/${apartment._id}`, apartmentObj, { headers: { Authorization: `Bearer ${storedToken}` } }, { new: true })
      .then((res) => {
        props.callBack();
        console.log(res);
      })
      .catch((e) => {
        console.log("Error, ", e);
      });
    props.closePopUp();
  };



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

              <div className="flex gap-5">
                <label className="form-control w-full max-w-xs">

                  <div className="label">
                    <span className="label-text">Apartment Type</span>
                  </div>
                  <select className="select select-bordered select-xs md:select-md w-full max-w-xs"
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

                <label className="form-control w-1/2 max-w-xs">
                  <div className="label">
                    <span className="label-text ">Price</span></div>
                  <input className="input input-bordered w-full input-xs md:input-md max-w-xs" type="number" name="price" value={price} required onChange={(e) => setPrice(e.target.value)} /></label>
              </div>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Address</span>
                </div>
                <input className="input input-bordered input-xs md:input-md w-full max-w-xs" type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} /></label>


              <div className="flex gap-3">
                <label className="form-control w-1/2 max-w-xs">
                  <div className="label">
                    <span className="label-text">Floor</span>
                  </div>
                  <input className="input input-bordered input-xs md:input-md w-full max-w-xs" type="text" name="floor" value={floor} onChange={(e) => setFloor(e.target.value)} /></label>

                <label className="form-control w-1/2 max-w-xs">
                  <div className="label">
                    <span className="label-text">Surface</span>
                  </div>
                  <input className="input input-bordered  input-xs md:input-md w-full max-w-xs" type="number" name="area" value={area} onChange={(e) => setArea(e.target.value)} /></label>
              </div>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Description</span>
                </div>
                <textarea className="textarea textarea-bordered h-24" placeholder="Description" type="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <div className="label">
                </div>
              </label>

              <div className="flex justify-between">

                <label className="input flex text-sm md:text-lg items-center gap-2  p-0">
                  Furnished
                  <input type="checkbox" className="checkbox checkbox-xs checkbox-accent" id="isFurnished" name="isFurnished" checked={isFurnished} onChange={handleisFurnished} />
                </label>

                <label className="input flex text-sm md:text-lg items-center gap-2  p-0">
                  Pet friendly
                  <input type="checkbox" className="checkbox checkbox-xs checkbox-accent" id="isPetFriendly" name="isPetFriendly" checked={isPetFriendly} onChange={handleisPetFriendly} />
                </label>
                <label className="input flex text-sm md:text-lg items-center gap-2  p-0">
                  Available
                  <input type="checkbox" className="checkbox checkbox-xs checkbox-accent" id="isAvailable" name="isAvailable" checked={isAvailable} onChange={handleisAvailable} />
                </label>
              </div>
            </div>

            <div className="divider lg:divider-horizontal"></div>
            <div className="grid flex-grow h-full card rounded-box place-items-left">
              <label>
                <DTPicker setAvailableDates={setAvailableDates} availableDates={availableDates} />
              </label>

              <label className="form-control w-full max-w-xs mt-5">
                <div>
                  <span className="label-text">Add photos</span>
                </div>
                <input className="file-input file-input-bordered file-input-xs md:file-input-md w-full max-w-xs" type="file" multiple onChange={(e) => handleFileUpload(e)} />
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
            <button type="submit" disabled={waitingForImageUrl} className="btn btn-outline btn-accent rounded-lg mt-5 items-center"> Edit </button>
          </div >
        </form>
      </div >
    </div >
  );
}

export default UpdateApartment;

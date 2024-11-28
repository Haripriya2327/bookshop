import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { ImCancelCircle } from "react-icons/im";

const API_URL = import.meta.env.VITE_API_URL;
//const [images, setImages] = useState(""); // TODO add cloudynary
//const [availableDates, setAvailableDates] = useState([]); // TODO calendar

function CreateAppoinment(props) {
  const apartmentId = props.apartmentId;
  // const availableDates = props.availableDates[0];
  const navigate = useNavigate();
  const dateNow = new Date(Date.now()).toISOString().slice(0, 10).toString();
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("authToken");
  const [appoinmentDate, setAppoinmentDate] = useState();
  const [appoinmentTime, setAppoinmentTime] = useState();
const availableDates = props.apartment.availableDates;
console.log("Dates",availableDates)
const startTime= availableDates[0].slice(11,16)
const startDate= availableDates[0].slice(0,10)
const endDate= availableDates[1].slice(0,10)
const endTime= availableDates[1].slice(11,16)
// console.log(startDate,startTime,endDate,endTime)
  const handleSubmit = (e) => {
    e.preventDefault();
    const appoinmentObj = {
      apartmentId,
      time: `${appoinmentDate}T${appoinmentTime}`,
      userBooked: storedUser
    };
    console.log("Appoinment obj",appoinmentObj)
    axios
      .post(`${API_URL}/api/appoinments`, appoinmentObj, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((res) => {
        navigate('/appoinments')
        console.log(res);
      })
      .catch((e) => {
        console.log("Error, ", e);
      });
    props.closePopUp();
  };

  function handleAppoinmentDate(e) {
    setAppoinmentDate(e.target.value)
    console.log(e.target.value);
  }
  function handleAppoinmentTime(e) {
    setAppoinmentTime(e.target.value)
    console.log(e.target.value);
    console.log( `${appoinmentDate}T${appoinmentTime}`);
  }

  //     <div className="smmax:w-[100vw] smmax:h-[100vh]  smmax:top-0 smmax:bottom-0 smmax:right-0 smmax:left-0 w-[30vw] h-[50vh] absolute border border-black text-black left-1/3 right-1/3 bottom-1/3 top-1/3 p-5 text-center m-auto rounded-lg bg-white">

  return (
    <div className="flex flex-column text-xl items-center justify-center w-full h-full bg-opacity-50 bg-black ">
      <div className="bg-white rounded-lg shadow-lg p-4 h-auto  w-3/5  w-1/3">   
      <div className="mb-4 w-full">
      <button onClick={props.closePopUp} type="button" className="btn m-10 text-2xl btn-sm float-right hover:text-white bg-white hover:bg-black justify-end">
          <ImCancelCircle />
        </button>
        </div>    
        <form onSubmit={handleSubmit} className=" rounded px-8 pt-6 pb-8 mb-4 h-full lg:p-24">
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Date
            </label>
            <input type="date" id="appoinmentDate"
              className="shadow appearance-none border border-red-500 rounded w-full  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              min={startDate} max={endDate} onChange={handleAppoinmentDate} />
          </div>
          <p className="text-sm my-2">**Available from {startDate} to {endDate}</p>
          <div className="mb-6 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Time
            </label>
            <input type="time" id="appoinmentTime"
              className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={startTime} max={endTime} onChange={handleAppoinmentTime} />
            <span className="validity"></span>
          </div>
          <p className="text-sm my-2">**Timings from {startTime} to {endTime} </p>
          <div className="absolute left-[45%] md:left-[48%] ">
            <button className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-300" type="submit">
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAppoinment;

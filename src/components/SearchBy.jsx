import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import cityData from '../data/citiesOfNetherlands.json'


const SearchBy = (props) => {
    // State to hold the user's input
    const [selectedOption, setSelectedOption] = useState(null);

    // State to hold the options for the dropdown
    const [options, setOptions] = useState([]);
    const filteredCountry = cityData[0].cities;
    const cityCountryData = [
        { label: 'Netherlands', value: 'Netherlands', type: 'country' }
    ];



    let cityArray = filteredCountry.map((city) => {
        let label = city;
        let value = city;
        let type = "city"
        return { label, value, type };
    })
    const cityAndCountry = [...cityArray]
    useEffect(() => { setOptions(cityAndCountry); }, [])

    // Handle when the user selects an option from the dropdown
    const handleSelectChange = selectedOption => {
        setSelectedOption(selectedOption);
        const { value, type } = selectedOption;
        props.callBack({ value, type })
    };

    return (
        <div className=' relative text-gray-600'>
            <Select className='bg-white rounded-lg text-lg w-96 focus:outline-none'
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                placeholder="Select apartment by city..."
            />
        </div>
    );
};

export default SearchBy;
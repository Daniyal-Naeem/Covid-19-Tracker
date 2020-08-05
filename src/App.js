import React, {useState} from 'react';
import './App.css';
import {FormControl, MenuItem, Select} from "@material-ui/core";
import { useEffect } from 'react';


// https://disease.sh/v3/covid-19/countries
// State: How to write variable in REACT
// USEEFFECT: IS a Hook in React, it Runs a piece of code
// based on given condition

function App() {
 
  useEffect(() => {
    //the code inside here runs once when the component loads
    // async -> sends a request, wait for it, do something

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then( (response) => response.json())
      .then((data) => {
 
        const countries = data.map(
          (country) => ({

            name: country.country,
            value: country.countryInfo.iso2,
          }));
             
          setCountries(countries);
      });
    };
    getCountriesData();

  }, []);

const [countries, setCountries] = useState([]);

  return (
    <div className="app">

 
    <div className="app__header">
      <h1> Covid 19 Tracker</h1>

       <FormControl className="app__dropdown">
      <Select
      variant="outlined"
      value="abc"

      >
        {
          countries.map( (country) => (
          <MenuItem value={country.value}>{country.name}</MenuItem>
          ))
        }
         <MenuItem value="worldwide">Worldwide</MenuItem>
         <MenuItem value="worldwide">Option 1</MenuItem>
         <MenuItem value="worldwide">Option 2</MenuItem>
         <MenuItem value="worldwide">Option 3</MenuItem>

        </Select>

    </FormControl>

 </div>

  


    {/* header*/}
    {/* title*/}

    {/* infoboxes*/}
    {/* infoboxes*/}
    {/* infoboxes*/}

    {/* table*/}
    {/* graph*/}

    {/* map*/}

    </div>
  );
}

export default App;

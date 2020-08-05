import React, {useState} from 'react';
import './App.css';
import {FormControl, MenuItem, Select, Card, CardContent} from "@material-ui/core";
import { useEffect } from 'react';
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";

// https://disease.sh/v3/covid-19/countries
// State: How to write variable in REACT
// USEEFFECT: IS a Hook in React, it Runs a piece of code
// based on given condition

function App() {



const [countries, setCountries] = useState([]);
const [country, setCountry] = useState(["Worldwide"]);
const [countryInfo, setCountryInfo] = useState ({});
const [tableData, setTableData] = useState([]);

useEffect( () => {
      
  fetch ("https://disease.sh/v3/covid-19/all")
  .then (response => response.json())
  .then ((data) =>{
    setCountryInfo(data);
  })
 },
[])

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
           
        setTableData(data);
        setCountries(countries);
    });
  };
  getCountriesData();

}, [])


const onCountryChange = async (event) => {

  const countryCode = event.target.value;
  

  setCountry(countryCode);

const url = countryCode === "Worldwide" ? "https://disease.sh/v3/covid-19/all"
: `https://disease.sh/v3/covid-19/countries/${countryCode}`

await fetch(url)
      .then( (response) => response.json())
      .then((data) => {

        setCountry(countryCode);
        setCountryInfo(data);

});
};



  return (
    <div className="app">

<div className="app__left">
    <div className="app__header">
      <h1> Covid 19 Tracker</h1>

       <FormControl className="app__dropdown">
      <Select
      variant="outlined" onChange={onCountryChange} value={country}>
         <MenuItem value="Worldwide">Worldwide</MenuItem>
        {
          countries.map( (country) => (
          <MenuItem value={country.value}>{country.name}</MenuItem>
          ))
        }
      

        </Select>

    </FormControl>

 </div>

 {/* InfoBoxe */}
 <div className="app__stats">

   <InfoBox title="CoronaVirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
   <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
   <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
</div>

   {/* Map */}
    <Map />
</div>
    
<Card className="app__right">
  <CardContent>
    {/* table*/}
    <h3>Live cases by Country</h3>
    <Table countries={tableData} />

    {/* graph*/}
    <h3>This is the Graph</h3>
    </CardContent>
  </Card>

    </div>
  );
}

export default App;

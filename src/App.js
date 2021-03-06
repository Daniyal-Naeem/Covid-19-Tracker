import React, {useState} from 'react';
import './App.css';
import {FormControl, MenuItem, Select, Card, CardContent} from "@material-ui/core";
import { useEffect } from 'react';
import InfoBox from "./InfoBox";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import Table from "./Table";
import { sortData} from "./sort";
//import numeral from "numeral";
import LineGraph from "./LineGraph";

// https://disease.sh/v3/covid-19/countries
// State: How to write variable in REACT
// USEEFFECT: IS a Hook in React, it Runs a piece of code
// based on given condition

function App() {



const [countries, setCountries] = useState([]);
const [country, setCountry] = useState(["Worldwide"]);
const [countryInfo, setCountryInfo] = useState ({});
const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

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

        setMapCountries(data);
        const sortedData = sortData(data);
        setTableData(sortedData);
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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);

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
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={(countryInfo.todayCases)}
            total={(countryInfo.cases)}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={(countryInfo.todayRecovered)}
            total={(countryInfo.recovered)}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={(countryInfo.todayDeaths)}
            total={(countryInfo.deaths)}
          />
        </div>

   {/* Map */}
   <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
</div>
    
<Card className="app__right">
  <CardContent>
    {/* table*/}
    <h3>Live cases by Country</h3>
    <Table countries={tableData} />

    {/* graph*/}
    <h3>Worldwide new {casesType}</h3>
    <LineGraph casesType={casesType} />
    </CardContent>
  </Card>

    </div>
  );
}

export default App;

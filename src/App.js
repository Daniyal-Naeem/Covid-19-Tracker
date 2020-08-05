import React, {useState} from 'react';
import './App.css';
import {FormControl, MenuItem, Select} from "@material-ui/core";

function App() {
 
const [countries, setCountries] = useState([
  "UK", "USA", "Pak"
]);

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
          <MenuItem value={country}>{country}</MenuItem>
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

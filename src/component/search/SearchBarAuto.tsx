/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import Autocomplete from "@mui/joy/Autocomplete";

interface Propstype {
  stationdata:
    | {
        Station_ID: number;
        Station_Name: string;
        Province: string;
        Callsign: string;
        PI_Code: number;
        Transmitter_Name: string;
        Frequency: number;
        Latitude: number;
        Longitude: number;
        Ant_Height: number;
        Polarization: string;
        ERP_H_kW: number;
        ERP_V_kW: number;
        Max_ERP: number;
        Remark: string;
      }[]
    | undefined;
}
function SearchBarAuto({ stationdata }: Propstype) {
  //   console.log(stationdata || []);
  // Ensure stationdata is not null or undefined
  //   if (!stationdata) {
  //     return <div>No data available</div>;
  //   }

  //   // Convert stationdata object into an array of JSX elements
  //   const stationSearch = Object.entries(stationdata).map(([key, value]) => (
  //     <li key={key}>
  //       {key}: {value}
  //     </li>
  //   ));

  // Ensure stationdata is an array and map it to the expected format for Autocomplete options
  const options =
    stationdata?.map((station) => ({
      label: station.Station_Name,

      // Assuming you want to use Station_Name as the label
      // Include any other properties you might need for identification or further processing
    })) ?? [];
  return (
    <Autocomplete
      placeholder="Combo box"
      options={options || []}
      sx={{ width: 300 }}
    />
  );
}



export default SearchBarAuto;

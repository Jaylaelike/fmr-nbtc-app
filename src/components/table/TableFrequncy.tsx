/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React from "react";
import { Map } from 'lucide-react';

interface Propstype {
  stations: unknown;
  loading: boolean;
  frequencyNewDataFilter: number[][][];
}

interface StationList {
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
  distance_km: number;
  SNR: number;
}

function TableFrequncy({
  stations,
  loading,
  frequencyNewDataFilter,
}: Propstype) {
  console.log(stations);

  console.log(frequencyNewDataFilter);

  // // Filter the stations data to get only those stations whose frequency is in the frequencies array
  // const filteredStations = stations?.data?.data.filter((item: StationList) => {
  //   return frequencyNewDataFilter[0][0].includes(item.Frequency);
  // });

  // // frequency in the frequencyNewDataFilter[0][0] has no data in station.Frequency in the stations data
  // const filterFrequencyx =
  //   frequencyNewDataFilter && frequencyNewDataFilter[0][0];
  // const filterStationx = stations?.data?.data.map(
  //   (item: StationList) => item.Frequency,
  // );
  // const frequencyNotFoundx = filterFrequencyx?.filter(
  //   (item) => !filterStationx?.includes(item),
  // );
  // console.log(frequencyNotFoundx);

  // // Map over the filteredStations to add the SNR field
  // const stationsWithSNR = filteredStations?.map((station) => {
  //   // Find every the index of the station's frequency in the frequencies array
  //   const frequencyIndex = frequencyNewDataFilter[0][0].indexOf(
  //     station.Frequency,
  //   );

  //   // If the frequencyNewDataFilter[0][0] is not found in the frequencies array, set add row Transmitter_Name to "No frequency in database"

  //   if (frequencyIndex === -1) {
  //     return { ...station, SNR: "No frequency in database" };
  //   }

  //   const SNR = frequencyNewDataFilter[0][1][frequencyIndex];

  //   // Return a new object that includes all properties of the station and the new SNR field
  //   return { ...station, SNR };
  // });

  // const stationfouder = stations?.data?.data[0].Frequency;

  // Filter the stations data to get only those stations whose frequency is in the frequencies array
  const filteredStations = stations?.data?.data.filter((item: StationList) => {
    return frequencyNewDataFilter[0][0].includes(item.Frequency);
  });

  console.log(filteredStations);

  // frequency in the frequencyNewDataFilter[0][0] has no data in station.Frequency in the stations data
  const filterFrequency =
    frequencyNewDataFilter && frequencyNewDataFilter[0][0];
  const filterStation = stations?.data?.data.map(
    (item: StationList) => item.Frequency,
  );
  const frequencyNotFound = filterFrequency?.filter(
    (item) => !filterStation?.includes(item),
  );

  // Map over the filteredStations to add the SNR field
  let stationsWithSNR =
    filteredStations?.map((station) => {
      // Find every the index of the station's frequency in the frequencies array
      const frequencyIndex = frequencyNewDataFilter[0][0].indexOf(
        station.Frequency,
      );

      const SNR = frequencyNewDataFilter[0][1][frequencyIndex];

      // Return a new object that includes all properties of the station and the new SNR field
      return { ...station, SNR };
    }) || [];

  // For each frequency in frequencyNotFound, add a new station to stationsWithSNR with Transmitter_Name set to "No frequency in database"
  frequencyNotFound?.forEach((frequency) => {
    stationsWithSNR = [
      ...stationsWithSNR,
      {
        Transmitter_Name: "No frequency in database",
        Frequency: frequency,
        SNR: frequencyNewDataFilter[0][1]?.filter(
          (item, index) => frequencyNewDataFilter[0][0][index] === frequency,
        )[0]
          ? frequencyNewDataFilter[0][1]?.filter(
              (item, index) =>
                frequencyNewDataFilter[0][0][index] === frequency,
            )[0]
          : "No SNR data",
      },
    ];
  });

  console.log(stationsWithSNR);

  console.log(filterFrequency);

  // const frequency = stations?.data?.data[0].Frequency;

  // const filteredStationsWithSNR = stationsWithSNR.filter(station => station.Frequency === frequency);

  // console.log(filteredStationsWithSNR);

  return (
    <div>
      <div className="space-y-4 overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Station_ID</th>
              <th>Transmitter_Name</th>
              <th>Distance(km)</th>
              <th>Frequency(MHz)</th>
              <th>SNR(dBm)</th>
              <th>Locations</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <span className="loading loading-spinner loading-lg size-40"></span>
            ) : (
              <>
                <tr>
                  <div className="p-4">
                    <span className="badge badge-success">พบข้อมูลความถี่</span>
                  </div>
                </tr>
                {(stationsWithSNR as StationList[])
                  .filter(
                    (item: StationList) =>
                      item.Transmitter_Name !== "No frequency in database",
                  )
                  .map((item: StationList) => (
                    <tr key={item.Station_ID}>
                      <td>{item.Station_ID}</td>
                      <td>{item.Transmitter_Name}</td>
                      <td>{item.distance_km.toFixed(2)}</td>
                      <td>{item.Frequency.toFixed(2)}</td>
                      <td>{item.SNR}</td>
                      <td>
                        {/* Generate and add the Google Maps link */}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${item.Latitude},${item.Longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                            เปิดในแผนที่ <Map />
                        </a>
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>

          <thead>
            <tr>
              <th>Station_ID</th>
              <th>Transmitter_Name</th>
              <th>Distance(km)</th>
              <th>Frequency</th>
              <th>SNR(dBm)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <div className="p-4">
                <span className="badge badge-error ">ไม่พบข้อมูลความถี่</span>
              </div>
            </tr>
            {frequencyNotFound?.map((frequency) => (
              <tr key={frequency}>
                <td>No Data</td>
                <td>No Data</td>

                <td>No Data</td>

                <td>{frequency}</td>
                <td>
                  {frequencyNewDataFilter[0][1]?.filter(
                    (item, index) =>
                      frequencyNewDataFilter[0][0][index] === frequency,
                  )[0]
                    ? frequencyNewDataFilter[0][1]?.filter(
                        (item, index) =>
                          frequencyNewDataFilter[0][0][index] === frequency,
                      )[0]
                    : "No SNR data"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableFrequncy;

/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ChartFrequency from "~/components/chart/ChartFrequency";

interface MapsId {
  params: {
    id: number;
  };
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
}



function ModalTags({ params: { id } }: MapsId) {
  const [dataStation, setDataStation] = useState([] as StationList[]);

  //create state of button distance scan
  const [distance, setDistance] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:4000/api/station/" + `${id}`,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setDataStation(data);
    };
    void fetchData();
  }, [id]);

  const latitudeData = dataStation.map((item) => item.Latitude.toString());
  const longitudeData = dataStation.map((item) => item.Longitude.toString());

  console.log(latitudeData[0]);
  console.log(longitudeData[0]);

  //fetch data raduis distance from station use useQuery
  // "http://localhost:4000/api/station/13.8674474/100.5743324/30"
  const { data, isLoading, isError, isLoadingError, isPending, isFetching } =
    useQuery({
      queryKey: [latitudeData[0], longitudeData[0], distance, id],
      // refetchInterval: 5000,
      refetchOnWindowFocus: true,
      retryOnMount: true,
      refetchOnReconnect: true,
      queryFn: async () => {
        try {
          const res = await axios.get(
            `http://localhost:4000/api/station/${latitudeData[0]}/${longitudeData[0]}/${distance}`,
          );
          //console.log(res.data);

          return res;
        } catch (error) {
          console.error(error);

          return error;
        }
      },
    });

  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <main className="flex-col items-center justify-center p-10 pt-20">
      <div className="grid grid-flow-col grid-rows-3 gap-4 px-4 py-4 leading-10">
        <div className="row-span-3 w-full rounded-xl bg-fuchsia-900 p-4">
          <h2 className="card-title text-3xl text-white">Scan</h2>
          <div className="grid grid-cols-2 gap-2 px-4 py-4 xl:grid-cols-5">
            <button className="btn btn-warning" onClick={() => setDistance(5)}>
              5 km
            </button>
            <button className="btn btn-warning" onClick={() => setDistance(10)}>
              10 km
            </button>
            <button className="btn btn-warning" onClick={() => setDistance(20)}>
              20 km
            </button>
            <button className="btn btn-warning" onClick={() => setDistance(30)}>
              30 km
            </button>
          </div>
        </div>
        <div className="col-span-2 w-full rounded-xl bg-fuchsia-800 p-4 text-3xl text-white">
          สถานี : {dataStation.map((item) => item.Station_Name)}
        </div>
        <div className="col-span-2 row-span-2 w-full rounded-xl bg-fuchsia-700 p-4 text-3xl text-white">
          ความถี่ : {dataStation.map((item) => item.Frequency)}
        </div>
      </div>

      <div className="grid grid-flow-col grid-rows-3 gap-4 px-4 py-4 leading-10">
        <div className="row-span-3 w-full rounded-xl bg-red-300 p-4 text-3xl text-white">
          Record
        </div>

        <div className="col-span-2 w-full rounded-xl bg-red-400 p-4">
          <div className="row-span-3 w-full  p-4 text-3xl text-white">
            Frequency Chart
          </div>

          <div className="w-full">
            <ChartFrequency />
          </div>

          <div className="col-span-2 row-span-2 w-full rounded-xl bg-red-400 p-4">
            &nbsp;
          </div>
        </div>
        
        <div className="col-span-2 w-full rounded-xl bg-red-400 p-4">
          <div className="grid grid-cols-2 gap-2 px-4 py-4 xl:grid-cols-5">
            {isFetching ? (
              <span className="loading loading-spinner loading-lg size-40"></span>
            ) : (
              (data as StationList[]).data?.map((item: StationList) => (
                <div key={item.Station_ID} className="button">
                  <button className="btn btn-primary">
                    {item.Transmitter_Name}
                    <br />
                    {item.Frequency} MHz
                  </button>
                </div>
              )) || <div>No Station of distance</div>
            )}
          </div>

          <div className="col-span-2 row-span-2 w-full rounded-xl bg-red-400 p-4">
            &nbsp;
          </div>
        </div>
       
      </div>
    </main>
  );
}

export default ModalTags;
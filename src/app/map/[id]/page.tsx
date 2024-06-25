/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import ChartFrequency from "~/components/chart/ChartFrequency";
import TableFrequncy from "~/components/table/TableFrequncy";

import { Video } from "lucide-react";
import { PiRecordFill } from "react-icons/pi";

import { AnimatedCounter } from "react-animated-counter";
import Minimaps from "~/components/minimaps/Minimaps";
import { debounce } from "lodash";

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

interface FrequencyScaner {
  No: number;
  Time: string;
  Station_ID: number;
  Data: number[][];
}

function ModalTags({ params: { id } }: MapsId) {
  const [dataStation, setDataStation] = useState([] as StationList[]);

  //create state of button distance scan
  const [distance, setDistance] = useState(10);

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

  // //fetch data raduis distance from station use useQuery
  // // "http://localhost:4000/api/station/13.8674474/100.5743324/30"
  // const { data:stationsData , isLoading, isError, isLoadingError, isPending, isFetching } =
  //   useQuery({
  //     queryKey: [latitudeData[0], longitudeData[0], distance, id],
  //     // refetchInterval: 5000,
  //     refetchOnWindowFocus: true,
  //     retryOnMount: true,
  //     refetchOnReconnect: true,
  //     queryFn: async () => {
  //       try {
  //         const res = await axios.get(
  //           `http://localhost:4000/api/station/${latitudeData[0]}/${longitudeData[0]}/${distance}`,
  //         );
  //         //console.log(res.data);

  //         return res;
  //       } catch (error) {
  //         console.error(error);

  //         return error;
  //       }
  //     },
  //   });

  // // console.log(data);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error</div>;
  // }

  // const { data:chartData  } =
  // useQuery({
  //   queryKey: ["scanner"],
  //   // refetchInterval: 5000,
  //   refetchOnWindowFocus: true,
  //   retryOnMount: true,
  //   refetchOnReconnect: true,
  //   queryFn: async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:4000/api/scanner`);

  //       return res;
  //     } catch (error) {
  //       console.error(error);

  //       return error;
  //     }
  //   },
  // });

  // const frequencyData: number[] = chartData?.data.map(
  //   (item: FrequencyScaner) => item.Data,
  // );
  // //   console.log(frequencyData);

  // //new array 2d data frequency from frequencyData Data[0] and Data[4]
  // const frequencyNewData: [number[], number[]][] = frequencyData?.map(
  //   (item: any[]): [number[], number[]] => [
  //     item.map((subItem: number[]): number => subItem[0]),
  //     item.map((subItem: number[]): number => subItem[5]),
  //     item.map((subItem: number[]): number => subItem[4]),
  //   ],
  // );
  // console.log(frequencyNewData);

  const [stationsData, chartData] = useQueries({
    queries: [
      {
        queryKey: [latitudeData[0], longitudeData[0], distance, id],
        queryFn: (): Promise<StationList> =>
          axios.get(
            `http://localhost:4000/api/station/${latitudeData[0]}/${longitudeData[0]}/${distance}`,
          ),
      },
      {
        queryKey: ["scanner"],
        queryFn: (): Promise<FrequencyScaner> =>
          axios.get("http://localhost:4000/api/scanner"),
      },
    ],
  });

  // console.log(stationsData);
  // console.log(chartData);

  const isFetchingStationsData = stationsData.isFetching;
  const isFetchingChartData = chartData.isFetching;

  const frequencyData: number[] = chartData?.data?.data.map(
    (item: FrequencyScaner) => item.Data,
  );
  //   console.log(frequencyData);

  //new array 2d data frequency from frequencyData Data[0] and Data[4] filter SNR >= 10 dB
  const frequencyNewData: [number[], number[]][] = frequencyData?.map(
    (item: any[]): [number[], number[]] => [
      item.map((subItem: number[]): number => subItem[0] / 100),
      item.map((subItem: number[]): number =>
        subItem[5] >= 10 ? subItem[5] : 0,
      ),
      item.map((subItem: number[]): number => subItem[4]),
    ],
  );

  console.log(frequencyNewData);

  // filter only  frequencyNewData[1] !=0  form frequencyNewData

  const frequencyNewDataFilter = frequencyNewData?.map((item) => {
    return [
      item[0].filter((_, index) => item[1][index] != 0),
      item[1].filter((item) => item != 0),
    ];
  });

  console.log(frequencyNewDataFilter);

  const debouncedSetDistance = debounce((value: number) => {
    setDistance(value);
  }, 100);

  return (
    <main className="flex-col items-center justify-center p-10 pt-20">
      <div className="grid grid-flow-col grid-rows-3 gap-4 px-4 py-4 leading-10">
        <div className="row-span-3 w-full space-y-2 rounded-xl bg-fuchsia-900 p-4">
          <h2 className="card-title text-3xl text-white">Scan</h2>

          <div className="grid grid-cols-1 justify-items-center gap-4">

            <div className="grid grid-cols-2 gap-2 px-4 py-4 xl:grid-cols-4 justify-items-between">
              <button
                className="btn btn-warning"
                onClick={() => setDistance(20)}
              >
                20 km
              </button>
              <button
                className="btn btn-warning"
                onClick={() => setDistance(30)}
              >
                30 km
              </button>
              <button
                className="btn btn-warning"
                onClick={() => setDistance(40)}
              >
                40 km
              </button>
              <button
                className="btn btn-warning"
                onClick={() => setDistance(50)}
              >
                50 km
              </button>
            </div>
            <input
              type="number"
              placeholder="ระยะทาง (KM)"
              className="input input-bordered  w-full max-w-xs 
            bg-fuchsia-400 text-3xl"
              value={distance}
              onChange={(e) => debouncedSetDistance(parseInt(e.target.value))}
              max={50}
              min={10}
              step={5}
            />

            <div className="grid grid-cols-1 justify-items-center gap-2">
              <AnimatedCounter
                value={distance || undefined}
                color="white"
                fontSize="50px"
                decimalPrecision={0}
              />
              <span className="text-3xl text-white">KM</span>
            </div>
          </div>
        </div>
        <div className="col-span-2 w-full rounded-xl bg-fuchsia-800 p-4 text-3xl text-white">
          สถานี : {dataStation.map((item) => item.Station_Name)}
        </div>

        <div className="col-span-2 row-span-2 w-full rounded-xl bg-fuchsia-700 p-4 text-3xl text-white">
          <Minimaps id={id} />
        </div>

        {/* <div className="col-span-2 row-span-2 w-full rounded-xl bg-fuchsia-700 p-4 text-3xl text-white">
          <AnimatedCounter value={dataStation.map((item) => item.Frequency)} color="AEB6BF" fontSize="100px" />

            </div> */}
      </div>

      <div className="grid grid-flow-col grid-rows-3 gap-4 px-4 py-4 leading-10">
        <div className="row-span-3 w-full rounded-xl bg-red-400 p-4 text-3xl text-white">
          Record
          <Video />
          <PiRecordFill />
        </div>

        <div className="col-span-2 w-full rounded-xl bg-red-400 p-4">
          <div className="row-span-3 w-full  p-4 text-3xl text-white">
            Frequency Chart
          </div>

          <div className="w-full">
            <ChartFrequency />
          </div>

          <div className="col-span-2 row-span-2 w-full rounded-xl bg-red-400 p-4">
            <TableFrequncy
              stations={stationsData}
              loading={isFetchingStationsData}
              frequencyNewDataFilter={frequencyNewDataFilter}
            />
          </div>

          <div className="col-span-2 row-span-2 w-full rounded-xl bg-red-400 p-4">
            &nbsp;
          </div>
        </div>

        <div className="col-span-2 w-full rounded-xl bg-red-400 p-4">
          <div className="grid grid-cols-2 gap-2 px-4 py-4 xl:grid-cols-5">
            {isFetchingChartData ? (
              <span className="loading loading-spinner loading-lg size-40"></span>
            ) : (
              stationsData.data?.data.map((item: StationList) => (
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

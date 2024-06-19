/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface FrequencyScaner {
  No: number;
  Time: string;
  Station_ID: number;
  Data: number[][];
}

function ChartFrequency() {
  const { data, isLoading, isError, isLoadingError, isPending, isFetching } =
    useQuery({
      queryKey: ["scanner"],
      // refetchInterval: 5000,
      refetchOnWindowFocus: true,
      retryOnMount: true,
      refetchOnReconnect: true,
      queryFn: async () => {
        try {
          const res = await axios.get(`http://localhost:4000/api/scanner`);

          return res;
        } catch (error) {
          console.error(error);

          return error;
        }
      },
    });

  const frequencyData: number[] = data?.data.map(
    (item: FrequencyScaner) => item.Data,
  );
  //   console.log(frequencyData);

  //new array 2d data frequency from frequencyData Data[0] and Data[4]
  const frequencyNewData: [number[], number[]][] = frequencyData?.map(
    (item: any[]): [number[], number[]] => [
      item.map((subItem: number[]): number => subItem[0]),
      item.map((subItem: number[]): number => subItem[5]),
      item.map((subItem: number[]): number => subItem[4]),
    ],
  );
  console.log(frequencyNewData);


  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {isFetching && (
        <div>
          <span className="loading loading-spinner loading-lg size-40"></span>
        </div>
      )}
      <ReactApexChart
        options={{
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: frequencyNewData?.[0]?.[0] ?? [],

            title: {
              text: "Frequency(KHz)",
            },
          },
          yaxis: {
            title: {
              text: "SNR(dB)",
            },
          },
        }}
        series={[
          {
            name: "ความถี่",
            data: frequencyNewData?.[0]?.[1] ?? [],
            color: "#40E0D0",
          },
          {
            name: "SNR",
            data: frequencyNewData?.[0]?.[2] ?? [],
            color: "#FFBF00",
          },
        ]}
        type="bar"
        width={800}
        height={320}
      />
    </>
  );
}

export default ChartFrequency;

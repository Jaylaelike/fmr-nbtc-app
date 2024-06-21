/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

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
      item.map((subItem: number[]): number => (subItem[0] / 100).toFixed(2)),
      item.map((subItem: number[]): number => subItem[5]),
      item.map((subItem: number[]): number => subItem[4]),
    ],
  );
  //console.log(frequencyNewData);

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
            events: {
              //onclick to show alert data frequency and snr from api
              click: function (event: any, chartContext: any, config: any) {
                const frequency =
                  frequencyNewData?.[0]?.[0][config.dataPointIndex];
                const snr = frequencyNewData?.[0]?.[2][config.dataPointIndex];
                alert(`Frequency: ${frequency} KHz, SNR: ${snr} dB`);
              },
            },
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
        width={900}
        height={320}
      />
    </>
  );
}

export default ChartFrequency;

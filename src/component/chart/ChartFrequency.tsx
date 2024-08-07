/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useState } from "react";

interface FrequencyScaner {
  No: number;
  Time: string;
  Station_ID: number;
  Data: number[][];
}

function ChartFrequency() {
  const [frequencyOnClick, setFrequencyOnClick] = useState<number>(0);
  const [snrOnClick, setSnrOnClick] = useState<number>();

  const { data, isLoading, isError, isLoadingError, isPending, isFetching } =
    useQuery({
      queryKey: ["scanner"],
      // refetchInterval: 5000,
      refetchOnWindowFocus: true,
      retryOnMount: true,
      refetchOnReconnect: true,
      queryFn: async () => {
        try {
          const res = await axios.get(
            process.env.NEXT_PUBLIC_SERVER_SCAN_URL as string,
          );

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
      item
        .filter((subItem: number[]): boolean => subItem[0] !== 0)
        .map((subItem: number[]): number => (subItem[0] / 100).toFixed(2)),
      item
        .filter((subItem: number[]): boolean => subItem[0] !== 0)
        .map((subItem: number[]): number => subItem[4]),
      item
        .filter((subItem: number[]): boolean => subItem[0] !== 0)
        .map((subItem: number[]): number => subItem[5]),
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
      <div
        className="gird items-center justify-items-center pl-10
      "
      >
        <span className="text-white">
          Frequency: {frequencyOnClick} KHz, SNR: {snrOnClick} dB
        </span>
      </div>

      <ReactApexChart
        options={{
          chart: {
            id: "basic-bar",
            events: {
              //onclick to show alert data frequency and snr from api
              click: function (event: any, chartContext: any, config: any) {
                const frequency =
                  frequencyNewData?.[0]?.[0][config.dataPointIndex];

                setFrequencyOnClick(frequency || 0);

                const snr = frequencyNewData?.[0]?.[2][config.dataPointIndex];
                setSnrOnClick(snr || 0);
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
          responsive: [
            {
              breakpoint: undefined,
              options: {
                plotOptions: {
                  bar: {
                    horizontal: true
                  }
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        }}
        series={[
          {
            name: "fs",
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

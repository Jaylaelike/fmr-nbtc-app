"use client";
import { BarChart, EventProps } from "@tremor/react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useState } from "react";
import React from "react";
interface FrequencyScaner {
  No: number;
  Time: string;
  Station_ID: number;
  Data: number[][];
}

export function ChartFrequncyNivo() {
  // const [frequencyOnClick, setFrequencyOnClick] = useState<String>("0");
  // const [snrOnClick, setSnrOnClick] = useState<number>(0);
  const [value, setValue] = useState<EventProps>(null);

  // console.log(frequencyOnClick);
  

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
  // console.log(frequencyNewData);

  //convert frequencyNewData[0] structure to chartdata shape for using in BarChart by x  axis is item[0] and y axis is item[1] and item[2]
  // item[0] is frequency, item[1] is FS, item[2] is SNR
  // stack data to chartdata

  const chartdata = frequencyNewData?.map(
    (item: [number[], number[], number[]]): any => {
      const data = item[0].map((subItem: number, index: number): any => ({
        frequency: subItem,
        FS: item[1][index],
        SNR: item[2][index],
      }));

      return data;
    },
  );

  // console.log(chartdata);\
  console.log(value);
  

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
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Frequency: {frequencyOnClick} KHz
      </h3>

      <BarChart
        className="mt-6"
        data={chartdata?.[0] || []}
        index="frequency"
        categories={["FS", "SNR"]}
        colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
        valueFormatter={(value: number): string => value}
        yAxisWidth={48}
        animationDuration={1000}
        showLegend={true}
        onValueChange={(v) => setValue(v)}
      />
    </>
  );
}

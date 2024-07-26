/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// interface FrequencyScaner {
//   No: number;
//   Time: string;
//   Station_ID: number;
//   Data: number[][];
// }

interface ProspType {
  chartDatas: [] | null;
}

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

export const description = "An interactive bar chart";

const chartConfig = {
  SNR: {
    label: "SNR",
    color: "hsl(var(--chart-1))",
  },
  FS: {
    label: "FS",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ChartFrequencyShacdn({ chartDatas }: ProspType) {
  // const [reScan, setReScan] = React.useState(false);

  //create frequency Scane done state
  // const [scanDone, setScanDone] = React.useState(false);

  // const { data, isLoading, isError, isLoadingError, isPending, isFetching } =
  //   useQuery({
  //     queryKey: ["scanner"],
  //     // refetchInterval: 5000,
  //     refetchOnWindowFocus: true,
  //     retryOnMount: true,
  //     refetchOnReconnect: true,
  //     queryFn: async () => {
  //       try {
  //         const res = await axios.get(`http://localhost:4000/api/scanner`);

  //         return res;
  //       } catch (error) {
  //         console.error(error);

  //         return error;
  //       }
  //     },
  //   });

  const frequencyData: number[] = chartDatas || [];
  console.log(frequencyData);

  useEffect(() => {
    const ws = new WebSocket("ws://172.16.116.32:3000/Control_FM");
    //send value to websocket
    ws.onopen = () => {
      // Connected to devices, send "SCAN"
      ws.send("SCAN");
    };

    ws.onmessage = (event) => {
      console.log("Message from server", event.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  //new array 2d data frequency from frequencyData Data[0] and Data[4]
  // const frequencyNewData: [number[], number[]][] = frequencyData?.map(
  //   (item: any[]): [number[], number[]] => [
  //     item
  //       .filter((subItem: number[]): boolean => subItem[0] !== 0)
  //       .map((subItem: number[]): number => (subItem[0] / 100).toFixed(2)),
  //     item
  //       .filter((subItem: number[]): boolean => subItem[0] !== 0)
  //       .map((subItem: number[]): number => subItem[4]),
  //     item
  //       .filter((subItem: number[]): boolean => subItem[0] !== 0)
  //       .map((subItem: number[]): number => subItem[5]),
  //   ],
  // );

  // console.log(frequencyNewData);

  // if (isError) {
  //   return <div>Error</div>;
  // }
  //map frequencyData to chartData with frequency, FS, SNR
  const chartData:
    | { frequency: number; FS: number; SNR: number }[]
    | undefined = frequencyData?.map(
    (item: number[]): { frequency: string; FS: number; SNR: number } => ({
      frequency: (item[0] / 100).toString(),
      FS: item[4],
      SNR: item[5],
    }),
  );

  console.log(chartData);

  const [activeChart, setActiveChart] = React.useState("FS");

  // //create condition if chartData at frequency === 108 then setScanDone to true
  // if (chartData) {
  //   chartData.forEach((item) => {
  //     if (item.frequency === 108) {
  //       setScanDone(true);
  //     }
  //   });
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequency Chart</CardTitle>
        <CardDescription>Results of scanner from devices</CardDescription>
        <div className="flex">
          {["FS", "SNR"].map((key) => {
            const chart = key;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="frequency"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: number): string => `${value} MHz`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {/* <Bar dataKey="FS" fill="var(--color-FS)" radius={4} />
            <Bar dataKey="SNR" fill="var(--color-SNR)" radius={4} /> */}
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          ความถี่ทั้งหมดที่เครื่องแสกนตรวจพบ
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}

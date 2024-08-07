"use client";
import React from "react";
import { Column } from "@ant-design/plots";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useState, useRef } from "react";
import { he } from "@vidstack/react/types/vidstack.js";

interface FrequencyScaner {
  No: number;
  Time: string;
  Station_ID: number;
  Data: number[][];
}
export type MarkTypes =
  | 'interval'
  | 'rect'
  | 'line'
  | 'point'
  | 'text'
  | 'cell'
  | 'area'
  | 'node'
  | 'edge'
  | 'link'
  | 'image'
  | 'polygon'
  | 'box'
  | 'vector'
  | 'lineX'
  | 'lineY'
  | 'connector'
  | 'range'
  | 'rangeX'
  | 'rangeY'
  | 'sankey'
  | 'chord'
  | 'path'
  | 'treemap'
  | 'pack'
  | 'boxplot'
  | 'shape'
  | 'forceGraph'
  | 'tree'
  | 'wordCloud'
  | 'gauge'
  | 'density'
  | 'heatmap'
  | 'liquid'

// const ChartEvent = {
//   EventType: 'event',
//   CLICK: 'click',
//   DBLCLICK: 'dblclick',
//   BEFORE_PAINT: 'beforepaint',
//   AFTER_PAINT: 'afterpaint',
//   BEFORE_CHANGE_DATA: 'beforechangedata',
//   AFTER_CHANGE_DATA: 'afterchangedata',
//   BEFORE_CLEAR: 'beforeclear',
//   AFTER_CLEAR: 'afterclear',
//   BEFORE_DESTROY: 'beforedestroy',
//   AFTER_DESTROY: 'afterdestroy',
//   BEFORE_CHANGE_SIZE: 'beforechangesize',
//   AFTER_CHANGE_SIZE: 'afterchangesize',
//   POINTER_TAP: 'pointertap',
//   POINTER_DOWN: 'pointerdown',
//   POINTER_UP: 'pointerup',
//   POINTER_OVER: 'pointerover',
//   POINTER_OUT: 'pointerout',
//   POINTER_MOVE: 'pointermove',
//   POINTER_ENTER: 'pointerenter',
//   POINTER_LEAVE: 'pointerleave',
//   POINTER_UPOUTSIDE: 'pointerupoutside',
//   DRAG_START: 'dragstart',
//   DRAG: 'drag',
//   DRAG_END: 'dragend',
//   DRAG_ENTER: 'dragenter',
//   DRAG_LEAVE: 'dragleave',
//   DRAG_OVER: 'dragover',
//   DROP: 'DROP',
// };

function ChartFrequencyAnt() {
  const [frequencyOnClick, setFrequencyOnClick] = useState<String>("0");
  const [snrOnClick, setSnrOnClick] = useState<number>(0);
  // const [updateChartValue, setUpdateChartValue] = useState<any>(null);

  console.log(frequencyOnClick);

  console.log(snrOnClick);

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

  const frequencyData: number[] = data?.data?.map(
    (item: FrequencyScaner) => item.Data,
  );

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

  //convert new data struct from frequencyNewData to config struct for plot Column chart data
  // item[0] is frequency, item[1] is FS, item[2] is SNR

  const chartData = frequencyNewData?.map(
    (item: [number[], number[], number[]]): any => {
      const data = item[0]?.map((subItem: number, index: number): any => ({
        frequency: subItem,
        FS: item[1][index],
        SNR: item[2][index],
      }));
      return data;
    },
  );

  console.log("chartData", chartData ?? "No data available");

  //get chartData sub array to plot Column chart
  const newChartData =
    Array.isArray(chartData) && chartData.length > 0 ? chartData[0] : [];

  console.log("newChartData", newChartData ?? "No data available");

  // const selectedRef = useRef();
  // selectedRef.current = selectedInputValue;

  const config = {
    data: newChartData ?? [],
    xField: "frequency",
    yField: ["SNR", "FS"],
    seriesField: "SNR",
    colorField: ["SNR", "FS"],
    // groupBy: "FS",
    group: true,

    style: {
      inset: 5,
      height: 100,

      // 矩形单个方向的内边距
      // insetLeft:5,
      // insetRight:20,
      // insetBottom:10
      // insetTop:10
    },
    label: {
      text: "frequency",
      position: "inside",
      
      transform: [
        {
          type: "contrastReverse",
        },
      ],
    },
    slider: {
      x: {
        values: [0, 108],
      },
    },

    interactions: [
      {
        type: "element-click", // Define the interaction type
        cfg: {
          // Configuration for the interaction
          start: [{ trigger: "element:click", action: "cursor:pointer" }],
        },
      },
    ],

    // Event handler for clicks on the plot area

    // onReady: ({ chart })=> {
    //   chart.on(`element:${ChartEvent.EventType}`, (ev) => {
    //     console.log(ev);
    //   });
    // }

    // onReady: ({ chart }) => {
    //   chart.on('element:click', (...args) => {
    //     console.log(selectedRef.current);
    //     console.log(args);
    //   });
    // },
  };

  return (
    <div className="h-80">
      <Column
        {...config}
        onReady={({ chart }) => {
          chart.on(`interval:click`, (event) => console.log(event));
        }}
      />
      {/* <div>Selected Frequency: {frequencyOnClick}</div>
      <div>Selected SNR: {snrOnClick}</div> */}
    </div>
  );
}

export default ChartFrequencyAnt;

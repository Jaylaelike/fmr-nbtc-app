/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ScanSearch, BoomBox, TvIcon, Video } from "lucide-react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { useState, useEffect } from "react";
import Link from "next/link";
import FmTuner from "./audioplayer/FmTuner";

import { Radio, RadioGroup } from "@headlessui/react";
import ChartFrequencyShacdn from "./chart/ChartFrequencyShacdn";
import Live from "./audioplayer/Live";

import { FaRadio } from "react-icons/fa6";


const plans = [
  { name: "source1", ram: "Scanner 1", aftertune: "1" },
  { name: "source2", ram: "Scanner 2", aftertune: "2" },
  { name: "source3", ram: "Scanner 3", aftertune: "3" },
  { name: "source4", ram: "Scanner 4", aftertune: "4" },
];

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
}

function ModalTags({
  activeLocation,
  showModal,
}: {
  activeLocation: StationList;
  showModal: (showModal: boolean) => void;
}) {
  // const [showModals, setShowModals] = useState(setShowModal || false);
  const [sourceStatus, setSourceStatus] = useState<string>("source1"); // Add setStatusSource state
  const [aftertune, setAftertune] = useState<string | null>("1");

  const [selected, setSelected] = useState(plans[0]);

  const [chartData, setChartData] = useState([]); // Add chartData state

  // const [showChartModal, setShowChartModal] = useState(false);

  const [switchState, setSwitchState] = useState(false);
  const [switchState2, setSwitchState2] = useState(false);
  const [switchState3, setSwitchState3] = useState(false);
  const [switchState4, setSwitchState4] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [isOpen, setIsOpen] = useState(false);

  console.log(aftertune);

  //sent "F" to get frequency array from websocket  for frequencyChart
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL + "Status_FM_Chart");
    //send value to websocket
    ws.onopen = () => {
      //console.log("Connected to devices");
      ws.send("F");
    };

    ws.onmessage = (response) => {
      // console.log("Message from devices", response.data);

      //convert blob to array buffer
      response.data.arrayBuffer().then((buffer) => {
        const views = new DataView(buffer);
        const decoders = new TextDecoder();
        const texts = decoders.decode(views);
        // console.log(texts);

        //convert string to array
        try {
          const chartData = JSON.parse(texts);
          console.log(chartData);
          setChartData(chartData);
        } catch (error) {
          console.error("Error parsing JSON from response:", error);
          // Handle the error (e.g., set a default state, show an error message)
          // Example: setChartData([]);
        }
      });
    };
  }, [isOpen]);

  // // Debounce function
  // function debounce(func, wait) {
  //   let timeout: string | number | NodeJS.Timeout | undefined;
  //   return function executedFunction(...args) {
  //     const later = () => {
  //       clearTimeout(timeout);
  //       func(...args);
  //     };
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //   };
  // }

  //get status of Chanel FM from websocket
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL + "Status_FM");

    let latestData = null; // Store the latest data received
    //send value to websocket
    ws.onopen = () => {
      //console.log("Connected to devices");
      ws.send("S");
    };

    const processMessage = (data: ArrayBuffer) => {
      const view = new DataView(data);
      const decoder = new TextDecoder();
      const text = decoder.decode(view);
      let parsedData: any;
      try {
        parsedData = JSON.parse(text);
      } catch (error) {
        console.error("Error parsing JSON from response:", error);
        return;
      }

         // Store the latest parsed data
    latestData = parsedData;
  };

  ws.onmessage = (response) => {
    response.data.arrayBuffer().then(processMessage);
  };


   // Set up an interval to update the state every 1 second with the latest data
   const intervalId = setInterval(() => {
    if (latestData) {
      // Update states based on the latest data
      const state = latestData[0]?.[1];
      const state_2 = latestData[1]?.[1];
      const state_3 = latestData[2]?.[1];
      const state_4 = latestData[3]?.[1];

      setSwitchState(state === 1 ? true : false);
      setSwitchState2(state_2 === 1 ? true : false);
      setSwitchState3(state_3 === 1 ? true : false);
      setSwitchState4(state_4 === 1 ? true : false);
    }
  }, 500);

  return () => {
    ws.close();
    clearInterval(intervalId); // Clear the interval on cleanup
  };
}, []);

  //     //FM1
  //     const state = parsedData[0]?.[1];

  //     //FM2
  //     const state_2 = parsedData[1]?.[1];

  //     //FM3
  //     const state_3 = parsedData[2]?.[1];

  //     //FM4
  //     const state_4 = parsedData[3]?.[1];

  //     setSwitchState(state === 1 ? true : false);
  //     setSwitchState2(state_2 === 1 ? true : false);
  //     setSwitchState3(state_3 === 1 ? true : false);
  //     setSwitchState4(state_4 === 1 ? true : false);

  //     console.log(switchState);
  //     // console.log(switchState2);
  //   }, 500);

  //   ws.onmessage = (response) => {
  //     // console.log("Message from devices", response.data);
  //     response.data.arrayBuffer().then(processMessage);
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, [
    
  // ]);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0  flex max-h-screen items-center justify-center   bg-white bg-opacity-50">
          <div className="modal-box inset-0 top-4 grid grid-cols-1  items-center justify-items-center pt-4">
            <div className="w-98 bg-white p-1">
              <div className=" grid-col grid justify-items-end">
                <button
                  className="btn btn-error"
                  onClick={() => showModal(false)}
                >
                  ปิด
                </button>
              </div>
              <h2 className="text-2xl font-bold">
                {activeLocation && activeLocation.Transmitter_Name}
              </h2>

              <div className="grid-col grid justify-items-center space-y-2">
                {/* <div className="flex flex-row justify-items-center space-x-4">
                  <h1>Devices is online </h1>
                  <ToggleRight size={40} color="#2ECC71" />
                </div> */}

                <FmTuner
                  tunerStateChanel={aftertune}
                  scanButtonState={isOpen as (isOpen: boolean) => void}
                />
                
                <Live
                  closeStatus={showModal as (showModal: boolean) => void}
                  sourceStatus={sourceStatus}
                  afterTune={aftertune}
                />

                {/* <div>
                  <div className="join">
                    <input
                      className="btn btn-square join-item"
                      type="radio-button"
                      name="options"
                      aria-label="FM1"
                      checked={sourceStatus === "source1"}
                      onClick={() => {
                        setSourceStatus("source1");
                        setAftertune("1");
                      }}
                    />
                    <input
                      className="btn btn-square join-item"
                      type="button"
                      name="options"
                      aria-label="FM2"
                      checked={sourceStatus === "source2"}
                      onClick={() => {
                        setSourceStatus("source2");
                        setAftertune("2");
                      }}
                    />
                    <input
                      className="btn btn-square join-item"
                      type="button"
                      name="options"
                      aria-label="FM3"
                      checked={sourceStatus === "source3"}
                      onClick={() => {
                        setSourceStatus("source3");
                        setAftertune("3");
                      }}
                    />
                    <input
                      className="btn btn-square join-item"
                      type="button"
                      name="options"
                      aria-label="FM4"
                      checked={sourceStatus === "source4"}
                      onClick={() => {
                        setSourceStatus("source4");
                        setAftertune("4");
                      }}
                    />
                  </div>
                </div> */}

                <div className="w-full px-4">
                  <div className="mx-auto w-full max-w-md">
                    <RadioGroup
                      by="name"
                      value={selected}
                      onChange={setSelected}
                      aria-label="Server size"
                      className="grid grid-cols-4 space-y-2"
                    >
                      {plans.map((plan) => {
                        let status;
                        switch (plan.name) {
                          case "source1":
                            status = switchState;
                            break;
                          case "source2":
                            status = switchState2;
                            break;
                          case "source3":
                            status = switchState3;
                            break;
                          case "source4":
                            status = switchState4;
                            break;
                          default:
                            break;
                        }

                        return (
                          <Radio
                            key={plan.name}
                            value={plan}
                            onClick={() => {
                              setAftertune(plan.aftertune);
                              setSourceStatus(plan.name);
                            }}
                            className="group relative flex cursor-pointer rounded-lg bg-white/5 px-5 py-4 text-white shadow-md transition focus:outline-none data-[checked]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-white"
                          >
                            <div className="flex w-full items-center justify-between">
                              <div className="text-sm/5">
                                <p className="font-semibold text-black">
                                  {plan.name}
                                </p>
                                <div className="flex gap-2 text-black">
                                  <div>{plan.ram}</div>
                                </div>
                                {/* Conditionally render the TvIcon color based on the status */}
                                {/* <BoomBox
                                  size={32}
                                  color={status ? "green" : "red"}
                                /> */}
                                
                                <FaRadio
                                  size={32}
                                  color={status ? "green" : "red"}
                                />
                              </div>
                            </div>
                          </Radio>
                        );
                      })}
                    </RadioGroup>
                  </div>
                </div>

                {/* <MiniPlayerAudio /> */}

                <Link href={`/map/${activeLocation.Station_ID}`}>
                  <button className="btn btn-error">
                    บันทึกเสียง <Video size={32} />
                  </button>
                </Link>

                <button
                  className="btn  bg-yellow-400 "
                  onClick={() => setIsOpen(true)}
                >
                  สแกนความถี่ <ScanSearch size={32} />
                </button>

                {isOpen && (
                  <>
                    <Dialog
                      open={isOpen}
                      as="div"
                      className="relative z-10 focus:outline-none"
                      onClose={close}
                      __demoMode
                    >
                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                          <DialogPanel className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0">
                            <DialogTitle>
                              <img
                                src="http://fmr.nbtc.go.th/fmr/_inc/img/logo@2x.png"
                                alt=""
                                className="h-12 w-12 rounded-md"
                              />
                            </DialogTitle>
                            <DialogTitle
                              as="h3"
                              className="text-base/7 font-medium text-black/80"
                            >
                              ความถี่ที่ตรวจพบ
                            </DialogTitle>

                            <div className="z-60 inset-0 mt-4 gap-3 space-x-4">
                              <ChartFrequencyShacdn
                                chartDatas={chartData || null}
                              />
                            </div>
                          </DialogPanel>
                        </div>
                      </div>
                    </Dialog>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalTags;

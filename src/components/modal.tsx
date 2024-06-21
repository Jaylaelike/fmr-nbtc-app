/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { CheckCheckIcon, ToggleRight, Video } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import FmTuner from "./audioplayer/FmTuner";
import Live from "./audioplayer/Live";

import { Radio, RadioGroup } from "@headlessui/react";


const plans = [
  { name: "FM1", ram: "Scanner 1", aftertune: "1" },
  { name: "FM2", ram: "Scanner 2", aftertune: "2" },
  { name: "FM3", ram: "Scanner 3", aftertune: "3" },
  { name: "FM4", ram: "Scanner 4", aftertune: "4" },
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

  console.log(aftertune);
  

  return (
    <div>
      {showModal && (
        <div className="z-60 modal-box fixed inset-0 max-h-screen bg-white bg-opacity-50">
          <div className="fixed inset-0 top-4 z-50 grid grid-cols-1 items-center justify-items-center pt-4">
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
                <div className="flex flex-row justify-items-center space-x-4">
                  <h1>Devices is online </h1>
                  <ToggleRight size={40} color="#2ECC71" />
                </div>

                <FmTuner tunerStateChanel={aftertune} />

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
                      className="space-y-2"
                    >
                      {plans.map((plan) => (
                        <Radio
                          key={plan.name}
                          value={plan}
                          onClick={() => {
                            setAftertune(plan.aftertune);
                          }}
                          className="group relative flex cursor-pointer rounded-lg bg-white/5 px-5 py-4 text-white shadow-md transition focus:outline-none data-[checked]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                          <div className="flex w-full items-center justify-between">
                            <div className="text-sm/6">
                              <p className="font-semibold text-black">
                                {plan.name}
                              </p>
                              <div className="flex gap-2 text-black">
                                <div>{plan.ram}</div>
                              </div>
                            </div>
                            <CheckCheckIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
                          </div>
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                {/* <MiniPlayerAudio /> */}

                <Link href={`/map/${activeLocation.Station_ID}`}>
                  <button className="btn btn-error">
                    สแกนและบันทึก <Video size={32} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalTags;

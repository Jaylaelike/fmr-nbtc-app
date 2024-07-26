/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React from "react";
import { Map } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import PCMPlayer from "pcm-player";

interface Propstype {
  stations: unknown;
  loading: boolean;
  frequencyNewDataFilter: number[][][];
  tunerStateChanel: string;
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
  SNR: number;
}

function TableFrequncy({
  stations,
  loading,
  frequencyNewDataFilter,
  tunerStateChanel,
}: Propstype) {
  console.log(stations);

  console.log(frequencyNewDataFilter);

  console.log(`Tuner State Channel: ${tunerStateChanel}`);

  // // Filter the stations data to get only those stations whose frequency is in the frequencies array
  // const filteredStations = stations?.data?.data.filter((item: StationList) => {
  //   return frequencyNewDataFilter[0][0].includes(item.Frequency);
  // });

  // // frequency in the frequencyNewDataFilter[0][0] has no data in station.Frequency in the stations data
  // const filterFrequencyx =
  //   frequencyNewDataFilter && frequencyNewDataFilter[0][0];
  // const filterStationx = stations?.data?.data.map(
  //   (item: StationList) => item.Frequency,
  // );
  // const frequencyNotFoundx = filterFrequencyx?.filter(
  //   (item) => !filterStationx?.includes(item),
  // );
  // console.log(frequencyNotFoundx);

  // // Map over the filteredStations to add the SNR field
  // const stationsWithSNR = filteredStations?.map((station) => {
  //   // Find every the index of the station's frequency in the frequencies array
  //   const frequencyIndex = frequencyNewDataFilter[0][0].indexOf(
  //     station.Frequency,
  //   );

  //   // If the frequencyNewDataFilter[0][0] is not found in the frequencies array, set add row Transmitter_Name to "No frequency in database"

  //   if (frequencyIndex === -1) {
  //     return { ...station, SNR: "No frequency in database" };
  //   }

  //   const SNR = frequencyNewDataFilter[0][1][frequencyIndex];

  //   // Return a new object that includes all properties of the station and the new SNR field
  //   return { ...station, SNR };
  // });

  // const stationfouder = stations?.data?.data[0].Frequency;

  // Filter the stations data to get only those stations whose frequency is in the frequencies array
  const filteredStations =
    stations?.data?.data?.filter((item: StationList) => {
      return frequencyNewDataFilter?.[0]?.[0]?.includes(item.Frequency);
    }) || [];

  console.log(filteredStations);

  // frequency in the frequencyNewDataFilter[0][0] has no data in station.Frequency in the stations data
  const filterFrequency =
    (frequencyNewDataFilter && frequencyNewDataFilter[0][0]) || [];
  const filterStation = stations?.data?.data.map(
    (item: StationList) => item.Frequency,
  );
  const frequencyNotFound = filterFrequency?.filter(
    (item) => !filterStation?.includes(item),
  );

  // Map over the filteredStations to add the SNR field
  let stationsWithSNR =
    filteredStations?.map((station) => {
      // Find every the index of the station's frequency in the frequencies array
      const frequencyIndex = frequencyNewDataFilter[0][0].indexOf(
        station.Frequency,
      );

      const SNR = frequencyNewDataFilter[0][1][frequencyIndex];

      // Return a new object that includes all properties of the station and the new SNR field
      return { ...station, SNR };
    }) || [];

  // For each frequency in frequencyNotFound, add a new station to stationsWithSNR with Transmitter_Name set to "No frequency in database"
  frequencyNotFound?.forEach((frequency) => {
    stationsWithSNR = [
      ...stationsWithSNR,
      {
        Transmitter_Name: "No frequency in database",
        Frequency: frequency,
        SNR: frequencyNewDataFilter[0][1]?.filter(
          (item, index) => frequencyNewDataFilter[0][0][index] === frequency,
        )[0]
          ? frequencyNewDataFilter[0][1]?.filter(
              (item, index) =>
                frequencyNewDataFilter[0][0][index] === frequency,
            )[0]
          : "No SNR data",
      },
    ];
  });

  console.log(stationsWithSNR);

  console.log(filterFrequency);

  // const frequency = stations?.data?.data[0].Frequency;

  // const filteredStationsWithSNR = stationsWithSNR.filter(station => station.Frequency === frequency);

  // console.log(filteredStationsWithSNR);

  //create pcm to wave audio file
  const audioRef = useRef<HTMLAudioElement>(null);
  //create webcoket connection event and delay for 3 seconds
  const [isConnected, setIsConnected] = useState(false);
  // const [sourceStatus, setSourceStatus] = useState("source1");

  const [activeRowId, setActiveRowId] = useState(null);
  const [tunerChange, setTunerChange] = useState("source1");

  function pcmToWav(
    pcmData: ArrayBuffer,
    sampleRate: number,
    sampleBits: number,
    channelCount: number,
  ): Blob {
    const dataLength = pcmData.byteLength;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    let offset = 0;
    function writeString(view: DataView, offset: number, string: string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    // RIFF chunk descriptor
    writeString(view, offset, "RIFF");
    view.setUint32(offset + 4, 36 + dataLength, true);
    writeString(view, offset + 8, "WAVE");
    offset += 12;

    // FMT sub-chunk
    writeString(view, offset, "fmt ");
    view.setUint32(offset + 4, 16, true);
    view.setUint16(offset + 8, 1, true);
    view.setUint16(offset + 10, channelCount, true);
    view.setUint32(offset + 12, sampleRate, true);
    view.setUint32(
      offset + 16,
      sampleRate * channelCount * (sampleBits / 8),
      true,
    );
    view.setUint16(offset + 20, channelCount * (sampleBits / 8), true);
    view.setUint16(offset + 22, sampleBits, true);
    offset += 24;

    // data sub-chunk
    writeString(view, offset, "data");
    view.setUint32(offset + 4, dataLength, true);
    new Uint8Array(buffer, offset + 8, dataLength).set(new Uint8Array(pcmData));

    return new Blob([buffer], { type: "audio/wav" });
  }

  //set state for "source1" and "source2 "source3" and "source4" from tunerStateChanel
  // condition if tunerStateChanel === "1" set sourceStatus to "source1" with swith case
  useEffect(() => {
    switch (tunerStateChanel) {
      case "1":
        setTunerChange("source1");
        break;
      case "2":
        setTunerChange("source2");
        break;
      case "3":
        setTunerChange("source3");
        break;
      case "4":
        setTunerChange("source4");
        break;
      default:
    }
  }, [tunerStateChanel]);

  //create websocket connection for audio stream
  useEffect(() => {
    const socketURL = "ws://172.16.116.32:3000" + "/" + tunerChange;
    const player = new PCMPlayer({
      encoding: "16bitInt",
      channels: 1,
      volume: 1,
      sampleRate: 44100,
      // flushingTime: 2000,
      mode: "live",
    });

    const ws = new WebSocket(socketURL);

    //and delay for 3 seconds
    ws.onopen = () => {
      setTimeout(() => {
        setIsConnected(true);
      }, 1000);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };
    ws.binaryType = "arraybuffer";

    ws.addEventListener("message", function (event) {
      const data = new Uint16Array(event.data);
      player.feed(data);

      if (audioRef.current) {
        const audioBlob = pcmToWav(data.buffer, 44100, 16, 1); // Use the pcmToWav function from the previous response
        const audioURL = URL.createObjectURL(audioBlob);

        (audioRef.current as HTMLAudioElement).src = audioURL;
      }
    });

    return () => {
      ws.close();
    };
  }, [tunerStateChanel, activeRowId]);

  //Control FM Frequency to devices websocket
  const [inputDateControl, setInputDataControl] = useState(null);
  useEffect(() => {
    const ws = new WebSocket("ws://172.16.116.32:3000/Control_FM");

    //send value to websocket
    ws.onopen = () => {
      console.log("Connected to server");
      ws.send(
        // Convert value * 100 to integer and convert to string berfore sending
        "4" + tunerStateChanel + (inputDateControl * 100).toString(),
      );
    };

    ws.onmessage = (event) => {
      console.log("Message from server", event.data);
    };

    return () => {
      ws.close();
    };
  }, [inputDateControl, activeRowId]);

  //create function send value to websocket for on channel
  //  setIsOn and send "611" == on ,"610" === off by lenght of messages position 1 is tunerStateChanel example "6" + tunerStateChanel + "1" === on and "6" + tunerStateChanel + "0" === off

  useEffect(() => {
    const ws = new WebSocket("ws://172.16.116.32:3000/Control_FM");

    //send value to websocket
    ws.onopen = () => {
      console.log("Connected to server");
      ws.send("6" + tunerStateChanel + "1");
    };

    ws.onmessage = (event) => {
      console.log("Message from server", event.data);
    };

    return () => {
      ws.close();
    };
  }, [tunerStateChanel]);

  return (
    <div>
      <div className="space-y-4 overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Station_ID</th>
              <th>Transmitter_Name</th>
              <th>Distance(km)</th>
              <th>Frequency(MHz)</th>
              <th>SNR(dBm)</th>
              <th>Live</th>
              <th>Locations</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <span className="loading loading-spinner loading-lg size-40"></span>
            ) : (
              <>
                <tr>
                  <div className="p-4">
                    <span className="badge badge-success">พบข้อมูลความถี่</span>
                  </div>
                </tr>
                {(stationsWithSNR as StationList[])
                  .filter(
                    (item: StationList) =>
                      item.Transmitter_Name !== "No frequency in database",
                  )
                  .map((item: StationList) => (
                    <tr
                      key={item.Station_ID}
                      onClick={() => {
                        setInputDataControl(item.Frequency);
                        setActiveRowId(item.Station_ID);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{item.Station_ID}</td>
                      <td>{item.Transmitter_Name}</td>
                      <td>{item.distance_km.toFixed(2)}</td>
                      <td>{item.Frequency.toFixed(2)}</td>
                      <td>{item.SNR}</td>
                      <td>
                        {activeRowId === item.Station_ID && (
                          <div>
                            <audio
                              ref={audioRef}
                              src={audioRef.current?.src}
                              controls
                              style={{ width: "100px" }}
                            ></audio>
                          </div>
                        )}
                      </td>
                      <td>
                        {/* Generate and add the Google Maps link */}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${item.Latitude},${item.Longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          เปิดในแผนที่ <Map />
                        </a>
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>

          <thead>
            <tr>
              <th>Station_ID</th>
              <th>Transmitter_Name</th>
              <th>Distance(km)</th>
              <th>Frequency</th>
              <th>SNR(dBm)</th>
              <th>Live</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <div className="p-4">
                <span className="badge badge-error ">ไม่พบข้อมูลความถี่</span>
              </div>
            </tr>
            {frequencyNotFound?.map((frequency) => (
              <tr
                key={frequency}
                onClick={() => {
                  setInputDataControl(frequency);
                  setActiveRowId(frequency);
                }}
                style={{ cursor: "pointer" }}
              >
                <td>No Data</td>
                <td>No Data</td>

                <td>No Data</td>

                <td>{frequency}</td>
                <td>
                  {frequencyNewDataFilter[0][1]?.filter(
                    (item, index) =>
                      frequencyNewDataFilter[0][0][index] === frequency,
                  )[0]
                    ? frequencyNewDataFilter[0][1]?.filter(
                        (item, index) =>
                          frequencyNewDataFilter[0][0][index] === frequency,
                      )[0]
                    : "No SNR data"}
                </td>
                <td>
                  {activeRowId === frequency && (
                    <div>
                      <audio
                        ref={audioRef}
                        src={audioRef.current?.src}
                        controls
                        style={{ width: "100px" }}
                      ></audio>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableFrequncy;

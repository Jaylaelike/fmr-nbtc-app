/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

import TableFrequncy from "~/component/table/TableFrequncy";

// import { Video } from "lucide-react";
// import { PiRecordFill } from "react-icons/pi";

import { AnimatedCounter } from "react-animated-counter";
import Minimaps from "~/component/minimaps/Minimaps";
import { debounce } from "lodash";

import ChartFrequencyAnt from "~/component/chart/ChartFrequencyAnt";
// import { useForm, SubmitHandler } from "react-hook-form";

// import { useMutation } from "@tanstack/react-query";
// import { CreateRecord } from "~/server/data";
// import { useRouter } from "next/navigation";

import AlertDialogDelButton from "~/component/dialog/alertDialogDelButton";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { Tv, DownloadIcon } from "lucide-react";

import TableAudioRecord from "~/component/table/TableAudioRecord";
import isBetween from "dayjs/plugin/isBetween";
import IconRipple from "~/components/animata/icon/con-ripple";

import Datepicker from "react-tailwindcss-datepicker";

import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";
import ClockDigitTimer from "~/component/clock/clockDigitTimer";
import CreateModal from "~/component/popup/CreateModal";
import EditModal from "~/component/popup/EditModal";

dayjs.extend(isBetween);

dayjs.extend(utc);
dayjs.extend(timezone);

interface MapsId {
  params: {
    id: number;
  };
}

interface HistoryRecord {
  id: number;
  recordId: string;
  urls: string;
  createdAt: string;
  updatedAt: string;
  startTime: string;
  endTime: string;
  record: {
    id: number;
    recordIds: string;
    stationId: number;
    ipAddress: string;
    startTime: string;
    endTime: string;
    frequncy: string;
    dayofweek: string;
    dailyStartTime: string;
    dailyEndTime: string;
    channel: string;
    userId: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface RecordType {
  id: number;
  urls: string;
  stationId: number;
  ipAddress: string;
  startTime: string;
  endTime: string;
  channel: string;
  frequncy: string;
  userId: string;
  username: string;
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
  const [distance, setDistance] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_STATION_URL + `${id}`,
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

  // console.log(latitudeData[0]);
  // console.log(longitudeData[0]);

  //state for FM  devices
  // const [fmdevices, setFmDevices] = useState("FM 1");

  const [selectedFmDevice, setSelectedFmDevice] = useState("");

  const setFmDevices = (device: string) => {
    setSelectedFmDevice(device);
  };

  const isSelected = (device: string) => {
    return selectedFmDevice === device
      ? "bg-gradient-to-b  from-fuchsia-500 to-cyan-500"
      : "bg-gradient-to-b from-violet-500 to-orange-300";
  };

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

  const [stationsData, chartData, recordsData, filterHistoryRecordEvent] =
    useQueries({
      queries: [
        {
          queryKey: [latitudeData[0], longitudeData[0], distance, id],
          queryFn: (): Promise<StationList> =>
            axios.get(
              process.env.NEXT_PUBLIC_SERVER_STATION_URL +
                `${latitudeData[0]}/${longitudeData[0]}/${distance}`,
            ),
        },
        {
          queryKey: ["scanner"],
          queryFn: (): Promise<FrequencyScaner> =>
            axios.get(process.env.NEXT_PUBLIC_SERVER_SCAN_URL as string),
        },
        {
          queryKey: ["records", id],
          // refetchInterval: 3000,
          queryFn: (): Promise<RecordType> =>
            axios.get(`http://localhost:3000/api/records/filter/${id}`),
        },
        {
          queryKey: ["data", id],
          queryFn: (): Promise<RecordType> =>
            axios.get(`http://localhost:3000/api/audiopath`),
        },
      ],
    });

  // console.log(stationsData);
  // console.log(chartData);

  const isFetchingStationsData = stationsData.isFetching;
  // const isFetchingChartData = chartData.isFetching;

  const frequencyData: number[] = chartData?.data?.data?.map(
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

  //console.log(frequencyNewData);

  //find `filterHistoryRecordEvent` find the item.record.stationId === id

  const filterHistoryRecordEventStationId =
    filterHistoryRecordEvent.data?.data.filter(
      (item: HistoryRecord) => item.stationIds == id ?? null,
    );

  // console.log(filterHistoryRecordEventStationId);

  // filter only  frequencyNewData[1] !=0  form frequencyNewData

  const frequencyNewDataFilter = frequencyNewData?.map((item) => {
    return [
      item[0].filter((_, index) => item[1][index] != 0),
      item[1].filter((item) => item != 0),
    ];
  });

  // console.log(frequencyNewDataFilter);

  const debouncedSetDistance = debounce((value: number) => {
    setDistance(value);
  }, 100);

  // // Using react-hook-form to manage form state and submission
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();

  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const handleCreatRecords: SubmitHandler<CreateRecord> = async (data) => {
  //   setIsSubmitting(true);
  //   // Your form submission logic here
  //   try {
  //     // Simulate form submission
  //     await new Promise((resolve) => setTimeout(resolve, 3000));
  //     // If submission is successful or you need to allow re-submission, reset the state
  //   } catch (error) {
  //     // Handle error
  //   }
  //   setIsSubmitting(false); // Re-enable the button after form processing
  //   createRecords(data);
  // };

  // const router = useRouter();

  // const { mutate: createRecords, isPending } = useMutation({
  //   mutationFn: (newRecord: CreateRecord) => {
  //     return axios.post("/api/records/create", newRecord);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  //   onSuccess: (data) => {
  //     console.log(data);
  //     location.reload();
  //     reset();
  //     router.push(`/map/${id}`);
  //   },
  // });

  //get Dayofweek
  const getDayofweek = (day: string): string => {
    switch (day) {
      case "0":
        return "Sunday";
      case "1":
        return "Monday";
      case "2":
        return "Tuesday";
      case "3":
        return "Wednesday";
      case "4":
        return "Thursday";
      case "5":
        return "Friday";
      case "6":
        return "Saturday";
      case "7":
        return "Everyday";
      default:
        return "Sunday";
    }
  };

  //create datepicker
  //create filter date from datepicker for filter history record event
  //only Date format
  const [values, setValues] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (
    newValue: SetStateAction<{ startDate: Date; endDate: number }>,
  ) => {
    //console.log("newValue:", newValue);
    setValues(newValue);

    setStartDates(new Date(newValue.startDate));
    setEndDates(new Date(newValue.endDate));
  };

  const [startDates, setStartDates] = useState(null);
  const [endDates, setEndDates] = useState(null);

  //console.log(startDates);
  //console.log(endDates);

  const [
    filterHistoryRecordEventStationIdDate,
    setFilterHistoryRecordEventStationIdDate,
  ] = useState<HistoryRecord[]>([]);
  useEffect(() => {
    setFilterHistoryRecordEventStationIdDate(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      filterHistoryRecordEventStationId
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ?.filter((item: HistoryRecord) =>
          dayjs(item.endTime).isBetween(startDates, endDates),
        ),
    );
  }, [startDates, endDates]);

  //console.log(filterHistoryRecordEventStationIdDate);

  //create observable scroll event for reload <tbody> every 10 sec  for update status record  using rxjs

  const [reload, setReload] = useState(false);
  useEffect(() => {
    const scrollObservable = fromEvent(
      document.getElementsByClassName(
        "col-span-2 w-full rounded-lg bg-red-400 p-4 text-white",
      ),
      "click",
    ).pipe(
      throttleTime(1000), // Throttle the scroll events to once per second
    );

    const subscription = scrollObservable.subscribe(() => {
      setReload((prev) => !prev); // Toggle reload state
    });

    return () => subscription.unsubscribe();
  }, [reload]);

  return (
    <main className="flex-col items-center justify-center p-10 pt-20">
      <div className="grid grid-flow-col grid-rows-3 gap-4 px-4 py-4 leading-10">
        <div className="row-span-3 w-full space-y-2 rounded-xl bg-gradient-to-b from-purple-500 to-red-400 p-4">
          <h2 className="text-3xl card-title text-white">Distance Scan</h2>

          <div className="grid grid-cols-1 justify-items-center gap-4">
            <div className="justify-items-between grid grid-cols-2 gap-2 px-4 py-4 xl:grid-cols-4">
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
              className="text-3xl input  input-bordered w-full 
            max-w-xs bg-gradient-to-b from-purple-500 to-red-400"
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
        <div className="text-3xl col-span-2 w-full rounded-xl bg-gradient-to-b from-purple-500 to-red-400 p-4 text-white">
          สถานี : {dataStation.map((item) => item.Station_Name)}
        </div>

        <div className="text-3xl col-span-2 row-span-2 w-full rounded-xl bg-gradient-to-b from-purple-500 to-red-400 p-4 text-white">
          <Minimaps id={id} />
        </div>

        {/* <div className="col-span-2 row-span-2 w-full rounded-xl bg-fuchsia-700 p-4 text-3xl text-white">
          <AnimatedCounter value={dataStation.map((item) => item.Frequency)} color="AEB6BF" fontSize="100px" />

            </div> */}
      </div>

      <section className="grid justify-items-center rounded-lg bg-gradient-to-r from-rose-400 to-orange-300 p-4 text-white  md:grid-cols-3">
        <h2 className="text-2xl font-bold">FM Devices : {selectedFmDevice}</h2>

        <div className="mt-4 flex flex-wrap justify-items-center gap-4">
          {["FM 1", "FM 2", "FM 3", "FM 4"].map((device, index) => (
            <button
              key={index}
              className={`rounded-lg ${isSelected(device)} px-4 py-2 text-black`}
              onClick={() => setFmDevices(device)}
            >
              {device}
              <Tv size={24} />
            </button>
          ))}
        </div>
      </section>

      <section className="grid h-4/5 grid-cols-1 space-y-3 p-4 md:grid-cols-3">
        <div className="col-span-3 rounded-lg bg-gradient-to-b from-purple-500 to-red-400 p-4 text-white">
          <h2 className="text-2xl font-bold">Frequency Chart</h2>

          <ChartFrequencyAnt />
        </div>

        <div className="col-span-3 row-span-3 w-full rounded-xl bg-gradient-to-b from-purple-500 to-red-400 ">
          <div className="text-3xl row-span-3  w-full p-4 text-white">
            Frequency Table
          </div>

          {/* <div className="w-full">
            <ChartFrequency />
          </div> */}

          <div className="col-span-2 row-span-2 w-full rounded-xl bg-gradient-to-b from-purple-500 to-red-400 p-4">
            <TableFrequncy
              stations={stationsData}
              loading={isFetchingStationsData}
              frequencyNewDataFilter={frequencyNewDataFilter}
              tunerStateChanel={selectedFmDevice.slice(-1)}
            />
          </div>

          {/* <div className="col-span-2 row-span-2 w-full rounded-xl bg-red-400 p-4">
            &nbsp;
          </div> */}
        </div>

        {/* <div className="col-span-2 w-full rounded-xl bg-red-400 p-4">
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
        </div> */}
      </section>

      {/* {isPending ? (
        <Loading />
      ) : (
        <section className="grid grid-cols-1 space-y-3 p-4 md:grid-cols-3"> */}
      {/* <div className="rounded-lg bg-red-400 p-4 text-white ">
            <h2 className="text-2xl font-bold">Recording Setup</h2>

            <form
              onSubmit={handleSubmit(handleCreatRecords)}
              className="grid grid-cols-1 space-y-5 p-5"
            >
              <input
                {...register("stationId", { required: true })}
                type="hidden"
                value={id}
                placeholder="Station ID"
                className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
              />

              <input
                {...register("channel", { required: true })}
                type="text"
                placeholder="FM 1"
                value={selectedFmDevice}
                className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
              />
              {errors.channel && <span>This field is required</span>}

              <input
                {...register("ipAddress", { required: true })}
                type="text"
                value={"172.16.116.124"}
                placeholder="IP Address"
                className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
              />

              <input
                {...register("frequncy", { required: true })}
                type="text"
                placeholder="Frequency"
                className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
              />
              {errors.frequency && <span>This field is required</span>}

              <input
                {...register("startTime", { required: true })}
                type="datetime-local"
                placeholder="Start DateTime"
                className="input input-bordered input-primary w-full max-w-xs p-5  text-gray-500"
              />
              {errors.startTime && <span>This field is required</span>}
              <input
                {...register("endTime", { required: true })}
                type="datetime-local"
                placeholder="End DateTime"
                className="input input-bordered input-primary w-full max-w-xs p-5  text-gray-500"
              />
              {errors.endTime && <span>This field is required</span>}
              <input
                {...register("dailyStartTime", { required: true })}
                type="time"
                placeholder="Daily Start Time"
                className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
              />
              {errors.dailyStartTime && <span>This field is required</span>}
              <input
                {...register("dailyEndTime", { required: true })}
                type="time"
                placeholder="Daily End Time"
                className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
              />
              {errors.dailyEndTime && <span>This field is required</span>}

      

              <select
                {...register("bitrates", { required: true })}
                defaultValue="128"
                className="input-warning w-full max-w-xs p-5 text-gray-500"
              >
                <option value="128">128 kbps</option>
                <option value="256">256 kbps</option>
              </select>

              <div className="grid grid-cols-3 gap-2 space-x-2">
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Everyday",
                ].map((day, index) => (
                  <label key={index} className="text-black">
                    <input
                      {...register("dayofweek", { required: true })}
                      type="radio"
                      value={index}
                      className="radio-primary radio"
                      defaultChecked={index === 0}
                    />
                    {day}
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPending || isSubmitting}
                {...(isSubmitting ? "Submitting..." : "Submit")}
              >
                Submit
              </button>
            </form>
          </div> */}
      <section className="grid grid-cols-1 space-y-3 p-4 md:grid-cols-3">
        <div className="col-span-3 row-span-3 w-full rounded-lg bg-gradient-to-b from-purple-500 to-red-400 p-4 text-white">
          <div className="grid grid-cols-2 justify-evenly">
            <div className="text-3xl row-span-3  w-full p-4 text-white">
              FM Configurations
            </div>

            <div className="text-3xl row-span-3  p-4 text-white">
              <CreateModal id={id} />
              <ClockDigitTimer />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra text-black">
              {/* head */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Station ID</th>
                  <th>IP Address</th>
                  <th>Channel</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Day of Week</th>
                  <th>Daily Start Time</th>
                  <th>Daily End Time</th>
                  <th>Frequency</th>

                  <th>User Name</th>
                </tr>
              </thead>

              {/* body */}
              <tbody>
                {recordsData.data?.data
                  .filter(
                    (item: RecordType) =>
                      selectedFmDevice === "" ||
                      item.channel === selectedFmDevice,
                  )
                  .map((item: RecordType) => {
                    // Convert item start and end times to Date objects

                    // const startTime = dayjs(item.startTime).subtract(7, "hour").format("DD-MM-YYYY HH:mm");

                    // const endTime = dayjs(item.endTime).subtract(7, "hour").format("DD-MM-YYYY HH:mm");

                    const startTime = dayjs(item.startTime).subtract(7, "hour");
                    const endTime = dayjs(item.endTime).subtract(7, "hour");
                    // Get current time
                    const now = dayjs();

                    // Determine if now is within the start and end times in 10 sec intervals

                    const isActive =
                      now.isAfter(startTime) && now.isBefore(endTime);

                    // Determine if now is before the start time
                    const isBefore = now.isBefore(startTime);

                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>

                        {/* {reload && (
                            <UpdateTableRecords
                              isActives={isActive || null}
                              isBefores={isBefore || null}
                            />
                          )} */}

                        {reload ? (
                          <>
                            <td>
                              <>
                                {isActive ? (
                                  <IconRipple />
                                ) : isBefore ? (
                                  <div className="badge badge-ghost text-nowrap">
                                    No Active
                                  </div> // Changed badge for "No Active" state
                                ) : (
                                  <div className="badge badge-success">
                                    Success
                                  </div>
                                )}
                              </>
                            </td>
                          </>
                        ) : (
                          <td>
                            <>
                              {isActive ? (
                                <IconRipple />
                              ) : isBefore ? (
                                <div className="badge badge-ghost text-nowrap">
                                  No Active
                                </div> // Changed badge for "No Active" state
                              ) : (
                                <div className="badge badge-success">
                                  Success
                                </div>
                              )}
                            </>
                          </td>
                        )}

                        <td>{item.stationId}</td>
                        <td>{item.ipAddress}</td>
                        <td>{item.channel}</td>
                        <td>
                          {dayjs(item.startTime)
                            .subtract(7, "hour")
                            .format("DD-MM-YYYY HH:mm")}
                        </td>
                        <td>
                          {dayjs(item.endTime)
                            .subtract(7, "hour")
                            .format("DD-MM-YYYY HH:mm")}
                        </td>

                        <td>{getDayofweek(item.dayofweek.toString())}</td>
                        <td>{item.dailyStartTime?.slice(0, -7)}</td>
                        <td>{item.dailyEndTime?.slice(0, -7)}</td>
                        <td>{item.frequncy}</td>
                        <td>{item.username}</td>

                        <td>
                          <AlertDialogDelButton
                            alertId={item.id}
                            stationIds={id}
                          />
                          {/* <button
                              className="btn-danger btn"
                              onClick={() => router.push(`/edit/${item.id}`)}
                            >
                              <PencilIcon />
                            </button> */}
                          <EditModal id={item.id} pagesId={id} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 space-y-3 p-4 md:grid-cols-3">
        <div className="col-span-3 row-span-3 w-full rounded-xl bg-gradient-to-b from-purple-500 to-red-400">
          <div className="text-3xl row-span-3  w-full p-4 text-white">
            Event Record
          </div>

          <div className="text-3xl row-span-3  w-full p-4 text-white">
            <Datepicker
              value={values}
              onChange={handleValueChange}
              primaryColor={"rose"}
            />
          </div>

          <div className="col-span-2 row-span-2 w-full rounded-xl bg-gradient-to-b from-purple-500 to-red-400 p-4">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>id</th>
                    {/* <th>chanel</th> */}
                    {/* <th>dailyStartTime</th>
                    <th>dailyEndTime</th>
                    */}
                    <th>Downloads</th>
                    <th>Frequency</th>
                    <th>StationId</th>
                  </tr>
                </thead>

                {endDates === null ? (
                  <tbody>
                    {filterHistoryRecordEventStationId?.map(
                      (item: RecordType) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>

                            <td>
                              <TableAudioRecord urls={item.urls} />
                            </td>
                            {/* <td>{item.record.channel}</td> */}

                            {/* <td>{item.dailyStartTime}</td>
                          <td>{item.dailyEndTime}</td> */}

                            <td>
                              <button className="btn btn-warning">
                                <DownloadIcon
                                  onClick={() => {
                                    ///download audio file blob form url

                                    void axios({
                                      url: "http://172.16.116.124/Audio/MP3/172_16_116_124_20240805_12-14-00_FM1(9425kHz).mp3",
                                      method: "GET",
                                      responseType: "blob",
                                      headers: {
                                        "Cache-Control": "force-cache",
                                      },
                                    })
                                      .then((response) => {
                                        const url = window.URL.createObjectURL(
                                          new Blob([response.data]),
                                        );
                                        const link =
                                          document.createElement("a");
                                        link.href = url;
                                        link.setAttribute(
                                          "download",
                                          "audio.mp3",
                                        );
                                        document.body.appendChild(link);
                                        link.click();
                                        link.parentNode?.removeChild(link);
                                      })
                                      .catch((error) => {
                                        console.error(
                                          "Error fetching the audio file:",
                                          error,
                                        );
                                      });

                                    // void fetch(
                                    //   "http://172.16.116.124/Audio/MP3/172_16_116_124_20240805_12-14-00_FM1(9425kHz).mp3",
                                    //   { cache: "force-cache" },
                                    // )
                                    //   .then((response) => response.blob())
                                    //   .then((blob) => {
                                    //     const url = window.URL.createObjectURL(
                                    //       new Blob([blob]),
                                    //     );
                                    //     const link =
                                    //       document.createElement("a");
                                    //     link.href = url;
                                    //     link.setAttribute(
                                    //       "download",
                                    //       "audio.mp3",
                                    //     );
                                    //     document.body.appendChild(link);
                                    //     link.click();
                                    //     link.parentNode?.removeChild(link);
                                    //   });
                                  }}
                                />
                              </button>
                            </td>

                            <td>{item.frequencies}</td>
                            <td>{item.stationIds}</td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                ) : (
                  <tbody>
                    {filterHistoryRecordEventStationIdDate?.map(
                      (item: RecordType) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>

                            <td>
                              <TableAudioRecord urls={item.urls} />
                            </td>
                            {/* <td>{item.record.channel}</td> */}

                            {/* <td>{item.dailyStartTime}</td>
          <td>{item.dailyEndTime}</td> */}

                            <td>
                              <button className="btn btn-warning">
                                <DownloadIcon
                                  onClick={() => {
                                    ///download audio file blob form url

                                    void fetch(item.urls)
                                      .then((response) => response.blob())
                                      .then((blob) => {
                                        const url = window.URL.createObjectURL(
                                          new Blob([blob]),
                                        );
                                        const link =
                                          document.createElement("a");
                                        link.href = url;
                                        link.setAttribute(
                                          "download",
                                          "audio.mp3",
                                        );
                                        document.body.appendChild(link);
                                        link.click();
                                        link.parentNode?.removeChild(link);
                                      });
                                  }}
                                />
                              </button>
                            </td>

                            <td>{item.frequencies}</td>
                            <td>{item.stationIds}</td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ModalTags;

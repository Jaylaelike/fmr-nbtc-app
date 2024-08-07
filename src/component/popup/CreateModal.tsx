"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResponsiveContainer } from "recharts";

import { SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { CreateRecord } from "~/server/data";

import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import axios from "axios";

// const today = dayjs();
// const yesterday = dayjs().subtract(1, "day");
// const todayStartOfTheDay = today.startOf("day");

interface PropsType {
  id: number;
}

import { DatePicker, Space, ConfigProvider, TimePicker } from "antd";
import type { DatePickerProps, GetProps } from "antd";
import dayjs from "dayjs";
import AlertCreateEvent from "../dialog/alertCreateEvent";
import AlertFailCreateEvent from "../dialog/alertFailCreateEvent";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { RangePicker } = DatePicker;

const onOk = (value: DatePickerProps["value"] | RangePickerProps["value"]) => {
  console.log("onOk: ", value);
};

function CreateModal({ id }: PropsType) {
  const [date, setDate] = React.useState<Date>();
  const [goal, setGoal] = React.useState(500);

  function onClick(adjustment: number) {
    setGoal(Math.max(500, Math.min(500, goal + adjustment)));
  }

  // Using react-hook-form to manage form state and submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleCreatRecords: SubmitHandler<CreateRecord> = async (data) => {
    // To change the format of the date when submitting the form
    (data.startTime = dayjs(data.startTime).format("YYYY-MM-DD HH:mm")),
      (data.endTime = dayjs(data.endTime).format("YYYY-MM-DD HH:mm")),
      (data.dailyStartTime = dayjs(data.dailyStartTime).format("HH:mm")),
      (data.dailyEndTime = dayjs(data.dailyEndTime).format("HH:mm")),
      setIsSubmitting(true);
    // Your form submission logic here
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // If submission is successful or you need to allow re-submission, reset the state
    } catch (error) {
      // Handle error
    }

    setIsSubmitting(false); // Re-enable the button after form processing
    createRecords(data);
  };

  const router = useRouter();

  const {
    mutate: createRecords,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (newRecord: CreateRecord) => {
      return axios.post("/api/records/create", newRecord);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      location.reload();
      reset();
      router.push(`/map/${id}`);
    },
  });

  return (
    <div className="grid grid-cols-1 justify-evenly p-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="default">Create Records + </Button>
        </DrawerTrigger>

        <DrawerContent>
          {isSuccess && <AlertCreateEvent />}

          {isError && <AlertFailCreateEvent />}

          <div className="mx-auto w-full max-w-sm">
            <ScrollArea className="h-[700px] w-full rounded-md border p-2">
              <div className="p-4 pb-0">
                <ResponsiveContainer width="100%" height="100%">
                  <div className="rounded-lg bg-gradient-to-b from-purple-500 to-red-400 p-4 text-white">
                    <h2 className="text-2xl font-bold">Recording Setup</h2>

                    <form
                      onSubmit={handleSubmit(handleCreatRecords)}
                      className="grid grid-cols-1 space-y-5"
                    >
                      <input
                        {...register("stationId", { required: true })}
                        type="hidden"
                        value={id}
                        placeholder="Station ID"
                        className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
                      />

                      <select
                        {...register("channel", { required: true })}
                        defaultValue="FM 1"
                        className="input-warning w-full max-w-xs p-5 text-gray-500"
                      >
                        <option value="FM 1">FM 1</option>
                        <option value="FM 2">FM 2</option>
                        <option value="FM 3">FM 3</option>
                        <option value="FM 4">FM 4</option>
                      </select>
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
                      {errors.frequncy && <span>This field is required</span>}

                      <div className="grid grid-cols-1 justify-items-center">
                        <ConfigProvider
                          theme={{
                            token: {
                              // Seed Token
                              colorPrimary: "#F87171",
                              borderRadius: 2,

                              // Alias Token
                              colorBgContainer: "#f6ffed",
                            },
                            components: {
                              DatePicker: {
                                timeColumnWidth: 40,

                                cellWidth: 20,
                              },
                            },
                          }}
                        >
                          <Space direction="vertical" size={12}>
                            {/* startTime */}
                            <Controller
                              control={control}
                              name="startTime"
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  showTime
                                  onChange={(value, dateString) => {
                                    field.onChange(value);
                                    console.log("Selected Time: ", value);
                                    console.log(
                                      "Formatted Selected Time: ",
                                      dateString,
                                    );
                                  }}
                                  onOk={field.onChange}
                                  size={"large"}
                                  placement="bottomRight"
                                  direction="rtl"
                                  defaultValue={dayjs()}
                                />
                              )}
                            />

                            {errors.startTime && (
                              <span>This field is required</span>
                            )}

                            {/* endTime */}

                            <Controller
                              control={control}
                              name="endTime"
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  showTime
                                  onChange={(value, dateString) => {
                                    field.onChange(value);
                                    console.log("Selected Time: ", value);
                                    console.log(
                                      "Formatted Selected Time: ",
                                      dateString,
                                    );
                                  }}
                                  onOk={field.onChange}
                                  size={"large"}
                                  placement="bottomRight"
                                  direction="rtl"
                                  defaultValue={dayjs()}
                                />
                              )}
                            />

                            {errors.endTime && (
                              <span>This field is required</span>
                            )}
                          </Space>
                        </ConfigProvider>
                      </div>

                      {/* <input
                        {...register("startTime", { required: true })}
                        type="datetime-local"
                        placeholder="Start DateTime"
                        className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
                      /> */}

                      {/* <input
                        {...register("endTime", { required: true })}
                        type="datetime-local"
                        placeholder="End DateTime"
                        className="input input-bordered input-primary w-full max-w-xs p-5  text-gray-500"
                      /> */}

                      <div className="grid grid-cols-1 justify-items-center">
                        <ConfigProvider
                          theme={{
                            token: {
                              // Seed Token
                              colorPrimary: "#F87171",
                              borderRadius: 2,

                              // Alias Token
                              colorBgContainer: "#f6ffed",
                              borderRadiusXS: 2,
                            },
                          }}
                        >
                          <Space direction="vertical" size={12}>
                            {/* dailyStartTime */}
                            <Controller
                              control={control}
                              name="dailyStartTime"
                              render={({ field }) => (
                                <TimePicker
                                  {...field}
                                  onChange={(value, dateString) => {
                                    field.onChange(value);
                                    console.log("Selected Time: ", value);
                                    console.log(
                                      "Formatted Selected Time: ",
                                      dateString,
                                    );
                                  }}
                                  onOk={field.onChange}
                                  size={"large"}
                                  placement="bottomRight"
                                  defaultValue={dayjs()}
                                  format={"HH:mm"}
                                />
                              )}
                            />
                            {errors.dailyStartTime && (
                              <span>This field is required</span>
                            )}

                            {/* dailyEndTime */}
                            <Controller
                              control={control}
                              name="dailyEndTime"
                              render={({ field }) => (
                                <TimePicker
                                  {...field}
                                  onChange={(value, dateString) => {
                                    field.onChange(value);
                                    console.log("Selected Time: ", value);
                                    console.log(
                                      "Formatted Selected Time: ",
                                      dateString,
                                    );
                                  }}
                                  onOk={field.onChange}
                                  size={"large"}
                                  placement="bottomRight"
                                  defaultValue={dayjs()}
                                  format={"HH:mm"}
                                />
                              )}
                            />

                            {errors.dailyEndTime && (
                              <span>This field is required</span>
                            )}
                          </Space>
                        </ConfigProvider>
                      </div>

                      {/* <input
                        {...register("dailyStartTime", { required: true })}
                        type="time"
                        placeholder="Daily Start Time"
                        className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
                      /> */}

                      {/* <input
                        {...register("dailyEndTime", { required: true })}
                        type="time"
                        placeholder="Daily End Time"
                        className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
                      /> */}

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
                  </div>
                </ResponsiveContainer>
              </div>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default CreateModal;

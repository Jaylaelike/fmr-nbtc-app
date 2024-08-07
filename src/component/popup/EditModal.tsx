"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useRouter } from "next/navigation";
import React from "react";

import { CreateRecord } from "~/server/data";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ResponsiveContainer } from "recharts";

import {  useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { DatePicker, Space, ConfigProvider, TimePicker } from "antd";
import type { DatePickerProps, GetProps } from "antd";
import dayjs from "dayjs";
import AlertUpdateEvent from "../dialog/alertUpdateEvent";
import AlertFailUpdateEvent from "../dialog/alertFailUpdate";


type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { RangePicker } = DatePicker;

const onOk = (value: DatePickerProps["value"] | RangePickerProps["value"]) => {
  console.log("onOk: ", value);
};

interface PropsType {
  id: number;
  pagesId: number;
}

function EditModal({ id, pagesId }: PropsType) {
  const router = useRouter();
  const { data: dataPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const res = await axios.get(`/api/records/${id}`);
      return res.data as CreateRecord;
    },
  });

  console.log(dataPost);

  // Ensure dataPost is defined and is an array
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const firstDataPost: CreateRecord | undefined = Array.isArray(dataPost) ? dataPost[0] : undefined;

  // Use firstDataPost safely
  if (firstDataPost) {
    console.log(firstDataPost.startTime);
  }

  // Using react-hook-form to manage form state and submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CreateRecord>({
    defaultValues: {
      stationId: firstDataPost?.stationId,
    },
  });

  useEffect(() => {
    // Set the initial value from the API
    if (firstDataPost?.startTime) {
      setValue("startTime", dayjs(firstDataPost.startTime).subtract(7, "hour"));
      setValue("endTime", dayjs(firstDataPost.endTime).subtract(7, "hour"));
      setValue("dailyStartTime", dayjs(firstDataPost.dailyStartTime, "HH:mm"));
      setValue("dailyEndTime", dayjs(firstDataPost.dailyEndTime, "HH:mm"));
    }
  }, [firstDataPost, setValue]);

  const { mutate: updatePost, isPending , isError, isSuccess } = useMutation({
    mutationFn: (newPost: CreateRecord) => {
      return axios.patch(`/api/records/${id}`, newPost);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      router.push(`/map/${pagesId}`);
      window.location.reload();
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleEditPost: SubmitHandler<CreateRecord> = async (data) => {
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
    updatePost(data);
  };

  // // Utility function to format time strings to "HH:mm:ss" format
  //   const formatTime = (timeString) => {
  //     // const date = new Date(`1970-01-01T${timeString}Z`);
  //     // // Format to HH:mm or HH:mm:ss as needed
  //     // return date.toISOString().substr(11, 8);

  //     if (!timeString) return "";

  //     // Create a new Date object using the time string
  //     const date = new Date(`1970-01-01T${timeString}Z`);
  //     // Convert to local time format (HH:mm)
  //     // This format is compatible with time input
  //     const localTime = date.toISOString().substr(11, 8);
  //     return localTime;
  //   };

  if (isLoadingPost) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <>
      <div className="grid grid-cols-1 justify-items-center p-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="default">Update</Button>
          </DrawerTrigger>

          <DrawerContent>

          {isSuccess && <AlertUpdateEvent />}
          {isError && <AlertFailUpdateEvent />}
            <div className="mx-auto w-full max-w-sm">
              <ScrollArea className="h-[700px] w-full rounded-md border p-2">
                <div className="p-4 pb-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <div className="rounded-lg bg-gradient-to-b from-purple-500 to-red-400 p-4 text-white">
                      <h2 className="text-2xl font-bold">Recording Edit</h2>

                      <form
                        onSubmit={handleSubmit(handleEditPost)}
                        className="grid grid-cols-1 space-y-5 p-5"
                      >
                        <input
                          {...register("stationId", { required: true })}
                          type="text"
                          value={firstDataPost?.stationId}
                          placeholder="Station ID"
                          className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
                        />

                        <input
                          {...register("channel", { required: true })}
                          type="text"
                          value={firstDataPost?.channel}
                          placeholder="FM 1"
                          className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
                        />
                        {errors.channel && <span>This field is required</span>}

                        <input
                          {...register("ipAddress", { required: true })}
                          type="text"
                          value={firstDataPost?.ipAddress}
                          placeholder="IP Address"
                          className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
                        />
                        {errors.ipAddress && (
                          <span>This field is required</span>
                        )}

                        <input
                          {...register("frequncy", { required: true })}
                          type="text"
                          placeholder="Frequency"
                          defaultValue={firstDataPost?.frequncy}
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
                                      if (!value === field.value) {
                                        field.onChange(value);
                                        console.log("Selected Time: ", value);
                                        console.log(
                                          "Formatted Selected Time: ",
                                          dateString,
                                        );
                                      }
                                    }}
                                    size={"large"}
                                    placement="bottomRight"
                                    direction="rtl"
                                    onOk={field.onChange}
                                    defaultValue={dayjs(
                                      firstDataPost?.startTime,
                                    ).subtract(7, "hour")}
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
                                      if (!value === field.value) {
                                        field.onChange(value);
                                        console.log("Selected Time: ", value);
                                        console.log(
                                          "Formatted Selected Time: ",
                                          dateString,
                                        );
                                      }
                                    }}
                                    onOk={field.onChange}
                                    size={"large"}
                                    placement="bottomRight"
                                    direction="rtl"
                                    defaultValue={dayjs(
                                      firstDataPost?.endTime,
                                    ).subtract(7, "hour")}
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
                                      if (!value === field.value) {
                                        field.onChange(value);
                                        console.log("Selected Time: ", value);
                                        console.log(
                                          "Formatted Selected Time: ",
                                          dateString,
                                        );
                                      }
                                    }}
                                    onOk={field.onChange}
                                    size={"large"}
                                    placement="bottomRight"
                                    mode="time"
                                    defaultValue={dayjs(
                                      firstDataPost?.dailyStartTime,
                                      "HH:mm",
                                    )}
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
                                      if (!value === field.value) {
                                        field.onChange(value);
                                        console.log("Selected Time: ", value);
                                        console.log(
                                          "Formatted Selected Time: ",
                                          dateString,
                                        );
                                      }
                                    }}
                                    onOk={field.onChange}
                                    size={"large"}
                                    placement="bottomRight"
                                    mode="time"
                                    defaultValue={dayjs(
                                      firstDataPost?.dailyEndTime,
                                      "HH:mm",
                                    )}
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
                          defaultValue={firstDataPost?.bitrates}
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
                                value={index.toString()}
                                className="radio-primary radio"
                                defaultChecked={
                                  firstDataPost?.dayofweek === index.toString()
                                }
                              />
                              {day}
                            </label>
                          ))}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
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
    </>
  );
}

export default EditModal;

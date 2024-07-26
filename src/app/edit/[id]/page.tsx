/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateRecord } from "~/server/data";
import dayjs from "dayjs";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

const EditRecordsPage: FC<EditPostPageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const {
    data: dataPost,
    isLoading: isLoadingPost,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const res = await axios.get(`/api/records/${id}`);
      return res.data as CreateRecord;
    },
  });

  console.log(dataPost);

  //   //console.log(dataPost);
  // Using react-hook-form to manage form state and submission
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRecord>({
    defaultValues: {
      stationId: dataPost?.stationId,
    },
  });

  const { mutate: updatePost, isPending } = useMutation({
    mutationFn: (newPost: CreateRecord) => {
      return axios.patch(`/api/records/${id}`, newPost);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      router.refresh();
      router.back();
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleEditPost: SubmitHandler<CreateRecord> = async (data) => {
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
  const formatTime = (timeString) => {
    // const date = new Date(`1970-01-01T${timeString}Z`);
    // // Format to HH:mm or HH:mm:ss as needed
    // return date.toISOString().substr(11, 8);

    if (!timeString) return "";

    // Create a new Date object using the time string
    const date = new Date(`1970-01-01T${timeString}Z`);
    // Convert to local time format (HH:mm)
    // This format is compatible with time input
    const localTime = date.toISOString().substr(11, 8);
    return localTime;
  };


  if (isLoadingPost) {
    return <span className="loading loading-lg"></span>;
  }
  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">แก้ไขการบันทึก</h1>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-red-300 p-4 text-white">
          <h2 className="text-2xl font-bold">Record</h2>

          <form
            onSubmit={handleSubmit(handleEditPost)}
            className="grid grid-cols-1 space-y-5 p-5"
          >
            <input
              {...register("stationId", { required: true })}
              type="text"
              value={dataPost[0]?.stationId}
              placeholder="Station ID"
              className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
            />

            <input
              {...register("channel", { required: true })}
              type="text"
              value={dataPost[0]?.channel}
              placeholder="FM 1"
              className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
            />

            <input
              {...register("ipAddress", { required: true })}
              type="text"
              value={dataPost[0]?.ipAddress}
              placeholder="IP Address"
              className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
            />

            <input
              {...register("frequncy", { required: true })}
              type="text"
              placeholder="Frequency"
              defaultValue={dataPost[0]?.frequncy}
              className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
            />
            {errors.frequency && <span>This field is required</span>}
            <input
              {...register("startTime", { required: true })}
              type="datetime-local"
              placeholder="Start DateTime"
              defaultValue={dayjs(dataPost[0]?.startTime).subtract(7, 'hour').format(
                "YYYY-MM-DDTHH:mm",
              )}
              className="input input-bordered input-primary w-full max-w-xs p-5  text-gray-500"
            />
            {errors.startTime && <span>This field is required</span>}
            <input
              {...register("endTime", { required: true })}
              type="datetime-local"
              placeholder="End DateTime"
              defaultValue={dayjs(dataPost[0]?.endTime).subtract(7, 'hour').format(
                "YYYY-MM-DDTHH:mm",
              )}
              className="input input-bordered input-primary w-full max-w-xs p-5  text-gray-500"
            />
            {errors.endTime && <span>This field is required</span>}
            <input
              {...register("dailyStartTime", { required: true })}
              type="time"
              placeholder="Daily Start Time"
              defaultValue={formatTime(dataPost[0]?.dailyStartTime)}
              className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
            />
            {errors.dailyStartTime && <span>This field is required</span>}
            <input
              {...register("dailyEndTime", { required: true })}
              type="time"
              placeholder="Daily End Time"
              defaultValue={formatTime(dataPost[0]?.dailyEndTime)}
              className="input input-bordered input-primary w-full max-w-xs p-5 text-gray-500"
            />
            {errors.dailyEndTime && <span>This field is required</span>}

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
                    defaultChecked={dataPost[0]?.dayofweek === index.toString()}
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
      </section>
    </div>
  );
};

export default EditRecordsPage;

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

interface MiniMpasIdProps {
  id: number;
}

interface StationTypes {
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

function Minimaps({ id }: MiniMpasIdProps) {
  console.log(id);

  const { data, isLoading, isError, isPending, isFetching } = useQuery({
    queryKey: ["station", id],
    queryFn: async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/station/${id}`);

        return res;
      } catch (error) {
        console.error(error);

        return error;
      }
    },
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }



  const position: LatLngExpression = [data?.data[0].Latitude, data?.data[0].Longitude];

  console.log(position);

  return (
    <MapContainer
      center={position || null}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors'
      />

      <Marker
        position={position || null}
        icon={L.icon({
          iconUrl:
            "https://res.cloudinary.com/satjay/image/upload/v1717490873/xcafgqpcykjtqjophf7a.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })}
      >
        <Popup>สถานีอยู่ตรงนี้</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Minimaps;

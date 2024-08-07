/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { SetStateAction, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { RadioTower, Radio, LocateFixed, Search } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/assets/css/leaflet.css";

import L, { type LatLngLiteral } from "leaflet";

import "../types";
import ModalTags from "~/component/modal";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";


//dynamic import leaflet to fix server side rendering

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.flyTo(center, zoom);
  return null;
}

function CurrentLocationMarker() {
  const [position, setPosition] = useState(null as [number, number] | null);
  const map = useMap();

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
      map.flyTo([latitude, longitude], 13); // Focus the map on the current location
    });
  }
  }, [map]);

  useEffect(() => {
    if (!map) return; // Ensure map is available

    const success = (position: {
      coords: { latitude: number; longitude: number };
    }) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
      if (map) {
        map.flyTo([latitude, longitude], 13); // Safely call flyTo
      }
    };

    const error = (error: any) => {
      console.error("Geolocation error:", error);
    };


    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success , error);
    }

    

    // navigator.geolocation.getCurrentPosition(success);
  }, [map]); // Dependency array includes map to ensure effect runs when map is available

  return position === null ? null : (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl:
          "https://res.cloudinary.com/satjay/image/upload/v1717490873/xcafgqpcykjtqjophf7a.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      })}
    >
      <Popup>คุณอยู่ตรงนี้</Popup>
    </Marker>
  );
}





//create search bar marker
function SearchBar() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        "accept-language": "th",
        countrycodes: "th",
        addressdetails: 1,
      },
    });

    const searchControl = new GeoSearchControl({
      provider: provider,
      showMarker: true,
      showPopup: false,

      marker: {
        icon: new L.Icon({
          iconUrl:
            "https://res.cloudinary.com/satjay/image/upload/v1717490873/xcafgqpcykjtqjophf7a.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        }),
      },
    });


    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
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
}

//set state of search data filter in search bar
const SearchBarAutoMini = ({
  stationdata,
  onLocationSelect,
}: {
  stationdata: StationList[];
  onLocationSelect: (location: { Latitude: number; Longitude: number }) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<StationList[]>([]);

  const handleClick = (Latitude: number, Longitude: number) => {
    onLocationSelect({ Latitude, Longitude });
  };

  useEffect(() => {
    const results = stationdata.filter((station) =>
      JSON.stringify(station).toLowerCase().includes(searchTerm),
    ) as StationList[];
    setSearchResults(results);
  }, [searchTerm, stationdata]);

  return (
    <div>
      <input
        type="text"
        placeholder="ค้นหาสถานี"
        className="input input-bordered"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      <ul className="scroll-smooth focus:scroll-auto">
        {searchResults.map((station: StationList) => (
          <li
            key={station.Station_ID}
            onClick={() => {
              handleClick(station.Latitude, station.Longitude);
            }}
          >
            <a className="hover:bg-error">
              {/* Assuming Radio is a component defined elsewhere */}
              <Radio color="#2ECC71" size={35} />
              {station.Transmitter_Name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Page() {
  // const [locations, setLocations] = useState([] as StationList[]);
  const [location, setLocation] = useState<LatLngLiteral>({
    lat: 13.751389,
    lng: 100.4925,
  });
  const [activeLocation, setActiveLocation] = useState<LatLngLiteral | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  // const [sourceStatus, setSourceStatus] = useState<string>("source1"); // Add setStatusSource state
  // const [aftertune, setAftertune] = useState<string | null>("1");

  console.log(activeLocation);

  // Assuming map initialization happens here and sets the map state

  // Effect to fly to the new location when onclick to change location form SearchBarAutoMini to set  setActiveLocation

  // Callback function to update location
  const handleLocationChange = (newLocation: L.LatLngLiteral) => {
    setActiveLocation(newLocation);
  };

  // Fetch location data using useQuery
  const { data, isLoading, isError, isLoadingError, isPending, isFetching } =
    useQuery({
      queryKey: [""],
      // refetchInterval: 5000,
      refetchOnWindowFocus: true,
      retryOnMount: true,
      refetchOnReconnect: true,
      queryFn: async () => {
        try {
          const res = await axios.get(
            process.env.NEXT_PUBLIC_SERVER_STATION_URL!,
          );

          // setLocations(res.data as StationList[]);

          return res;
        } catch (error) {
          console.error(error);

          return error;
        }
      },
    });

  //function set activeLocation to current location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });

      setActiveLocation({
        Latitude: latitude,
        Longitude: longitude,
        Transmitter_Name: "คุณอยู่ตรงนี้",
      });
    });
  };

  if (
    isPending ||
    isLoading ||
    isLoadingError ||
    isError ||
    isFetching ||
    !data.data
  ) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b pt-10">
        <>
          <span className="loading loading-spinner loading-lg size-40"></span>
        </>
      </main>
    );
  }

  return (
    <div>
      <div className="z-10">
        <MapContainer
          center={location}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "900px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data?.data.map((location: SetStateAction<null>) => (
            <Marker
              key={location.Station_Name}
              position={[location.Latitude, location.Longitude]}
              //onclick Marker to show popup
              eventHandlers={{
                click: () => {
                  setActiveLocation(location);
                  setShowModal(true);
                },
              }}
              icon={L.icon({
                iconUrl:
                  "https://res.cloudinary.com/satjay/image/upload/v1709036772/u6g1latznhguunzdcrzw.png",

                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
              })}
            >
              <Popup>{location.Transmitter_Name}</Popup>
            </Marker>
          ))}

          {activeLocation && (
            <ChangeView
              center={[activeLocation.Latitude, activeLocation.Longitude]}
              zoom={13}
            />
          )}

          <CurrentLocationMarker />
        

          <SearchBar />
        </MapContainer>

        {/* ShowModalTags */}
        {showModal && activeLocation && (
          <ModalTags
            activeLocation={activeLocation || null}
            showModal={setShowModal as (showModal: boolean) => void}
          />
        )}
      </div>

      {/* Drawer */}
      <div className="fixed bottom-10 z-30 p-5">
        <div className="drawer drawer-end">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}

            <label htmlFor="my-drawer" className="btn btn-error drawer-button">
              <RadioTower size={32} /> เลือกสถานี
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
              {/* input search filter all data every field and show in Sidebar content here  } */}

              <div className="grid grid-flow-col">
                <SearchBarAutoMini
                  stationdata={data?.data || undefined}
                  onLocationSelect={handleLocationChange}
                />

                <Search size={32} />
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* button get current location and fly to current location */}

      <div className="fixed bottom-20 right-5 z-40">
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowModal(false);
            getCurrentLocation();
          }}
        >
          <LocateFixed size={32} />
        </button>
      </div>
    </div>
  );
}

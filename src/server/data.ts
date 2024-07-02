import { DatetimeFsp } from "drizzle-orm/mysql-core";

export const projects = [
  {
    title: "FMR",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "/player",
  },
  {
    title: "Maps",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "/map",
  },
  {
    title: "Playback",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

export const playList = [
  {
    name: "Live Stream",
    writer: "Live Stream",
    img: "https://cdn-icons-png.flaticon.com/512/5822/5822065.png",
    src: "http://localhost:3000/stream",
    id: 1,
  },
  {
    name: "music - 2",
    writer: "react-modern-audio-player",
    img: "https://cdn.pixabay.com/photo/2021/09/06/16/45/nature-6602056__340.jpg",
    src: "https://wzljnrcgndtpgmwthcrj.supabase.co/storage/v1/object/public/songs/music-001/track1.mp3",
    id: 2,
  },
  {
    name: "music - 3",
    writer: "react-modern-audio-player",
    img: "https://cdn.pixabay.com/photo/2022/08/29/08/47/sky-7418364__340.jpg",
    src: "https://wzljnrcgndtpgmwthcrj.supabase.co/storage/v1/object/public/songs/music-001/todayisgood_whatfalse.mp3",
    id: 3,
  },
  {
    name: "music - 4",
    writer: "react-modern-audio-player",
    img: "https://cdn.pixabay.com/photo/2015/09/22/01/30/lights-951000__340.jpg",
    src: "https://cdn.pixabay.com/audio/2022/07/25/audio_3266b47d61.mp3",
    id: 4,
  },
  {
    name: "music - 5",
    writer: "react-modern-audio-player",
    img: "https://cdn.pixabay.com/photo/2022/08/28/18/03/dog-7417233__340.jpg",
    src: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3",
    id: 5,
  },
];

export const streamAudio = [
  {
    name: "Live Stream",
    writer: "Live Stream",
    img: "https://cdn-icons-png.flaticon.com/512/5822/5822065.png",
    src: "http://localhost:3001/stream",
    id: 1,
  },
];


export type CreateRecord  = {
  stationId: number;
  ipAddress: string;
  startTime: DatetimeFsp;
  endTime: DatetimeFsp;
  dayofweek: string;
  dailyStartTime: DatetimeFsp;
  dailyEndTime: DatetimeFsp;
  frequncy: string;
  userId: string;
  username: string;
}
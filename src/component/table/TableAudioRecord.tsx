import React from "react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";


import { MediaPlayer, MediaProvider, MediaAnnouncer } from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

interface PropsType {
  urls: string;
}

function TableAudioRecord({ urls }: PropsType) {
  return (
    <div>
      <MediaPlayer
        title="Sprite Fight"
        src={urls}
        // src="http://localhost:3000/stream"
      >
        <MediaProvider />
        <PlyrLayout
          icons={plyrLayoutIcons}
          controls={[
            "download",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "settings",
            "fullscreen",
            "duration",
            "rewind",
            "fast-forward",
            "restart",
          ]}
        />
         <MediaAnnouncer />
      </MediaPlayer>
   
    </div>
  );
}

export default TableAudioRecord;

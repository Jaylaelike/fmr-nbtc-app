import { useEffect, useState } from "react";

// import PCMPlayer from "pcm-player";

interface Propstype {
  closeStatus: boolean;
  sourceStatus: string | null;
  aftertune: string | null;
}

const Live = ({ closeStatus, sourceStatus, aftertune }: Propstype) => {
  // const audioRef = useRef<HTMLAudioElement>(null);
  // let mediaSource = new MediaSource();
  // let sourceBuffer: SourceBuffer | null = null;

  //create webcoket connection event and delay for 3 seconds
  const [isConnected, setIsConnected] = useState(false);

  //create state  of sourceStatus has change for delay 3 seconds
  const [tunerChange , setTunerChange] = useState(false);

  useEffect (() => {
    setTimeout(() => {
      setTunerChange(true);
    }, 3000);
  }
  , [aftertune]);



  


  

  //

  // function pcmToWav(
  //   pcmData: ArrayBuffer,
  //   sampleRate: number,
  //   sampleBits: number,
  //   channelCount: number,
  // ): Blob {
  //   const dataLength = pcmData.byteLength;
  //   const buffer = new ArrayBuffer(44 + dataLength);
  //   const view = new DataView(buffer);

  //   let offset = 0;
  //   function writeString(view: DataView, offset: number, string: string) {
  //     for (let i = 0; i < string.length; i++) {
  //       view.setUint8(offset + i, string.charCodeAt(i));
  //     }
  //   }

  //   // RIFF chunk descriptor
  //   writeString(view, offset, "RIFF");
  //   view.setUint32(offset + 4, 36 + dataLength, true);
  //   writeString(view, offset + 8, "WAVE");
  //   offset += 12;

  //   // FMT sub-chunk
  //   writeString(view, offset, "fmt ");
  //   view.setUint32(offset + 4, 16, true);
  //   view.setUint16(offset + 8, 1, true);
  //   view.setUint16(offset + 10, channelCount, true);
  //   view.setUint32(offset + 12, sampleRate, true);
  //   view.setUint32(
  //     offset + 16,
  //     sampleRate * channelCount * (sampleBits / 8),
  //     true,
  //   );
  //   view.setUint16(offset + 20, channelCount * (sampleBits / 8), true);
  //   view.setUint16(offset + 22, sampleBits, true);
  //   offset += 24;

  //   // data sub-chunk
  //   writeString(view, offset, "data");
  //   view.setUint32(offset + 4, dataLength, true);
  //   new Uint8Array(buffer, offset + 8, dataLength).set(new Uint8Array(pcmData));

  //   return new Blob([buffer], { type: "audio/wav" });
  // }

  useEffect(() => {
    const socketURL = "ws://192.168.111.85:3000" + "/" + sourceStatus;
    // const player = new PCMPlayer({
    //   format: "16bitInt",
    //   channels: 1,
    //   sampleRate: 44100,
    //   flushingTime: 2000,
    //   mode: "live",
    // });

    const ws = new WebSocket(socketURL);

    //and delay for 3 seconds
    ws.onopen = () => {
      setTimeout(() => {
        setIsConnected(true);
      }, 3000);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };
    ws.binaryType = "arraybuffer";

    // ws.addEventListener("message", function (event) {
    //   const data = new Uint8Array(event.data);
    //   player.feed(data);

    //   if (audioRef.current) {
    //     const audioBlob = pcmToWav(data.buffer, 44100, 16, 1); // Use the pcmToWav function from the previous response
    //     const audioURL = URL.createObjectURL(audioBlob);

    //     (audioRef.current as HTMLAudioElement).src = audioURL;

    //   }
    // }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [sourceStatus]);

  useEffect(() => {
    if (closeStatus) {
      setIsConnected(true);
    }
  }, [closeStatus]);

  return (
    <div className="justify-items-center space-y-2">
      <h2>FM Live</h2>
      {isConnected ? (
        <div className="badge badge-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-2 w-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
          online
        </div>
      ) : (
        <div className="badge badge-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-2 w-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
          offline
        </div>
      )}

      
      {tunerChange ? (
        <audio src="http://192.168.111.85:3001/stream" controls autoPlay></audio>
      ) : (
        <div>Connecting...</div>
      )}

        
    </div>
  );
};
export default Live;

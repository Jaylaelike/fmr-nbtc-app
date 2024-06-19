import { useState, useEffect } from "react";
import SlideRule from "react-slide-rule-fork";

import { StopCircle, Rewind, FastForward } from "lucide-react";
import Counter from "./Counter";

const [min, max, step] = [87, 108, 0.25];

interface Propstype {
  tunerStateChanel: string | null;
}

export default function FmTuner({ tunerStateChanel }: Propstype) {
  // const [message, setMessage] = useState(null);

  const [inputData, setInputData] = useState({
    seek_next: 0.25,
    seek_back: -0.25,
    frequency: 98.25,
    chanel: 1,
    state: "online",
    volume: 100,
  });

  // const [message, setMessage] = useState<null | string>(null); // Added type annotation

  const [value, setValue] = useState(87 || null);

  console.log(value);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.111.85:3000/Control_FM");

    //send value to websocket
    ws.onopen = () => {
      console.log("Connected to server");
      ws.send(
        // Convert value * 100 to integer and convert to string berfore sending
        "4" + tunerStateChanel + (value * 100).toString(),
      );
    };

    ws.onmessage = (event) => {
      console.log("Message from server", event.data);
    };

    return () => {
      ws.close();
    };
  }, [value]);

  // const handleInputChange = (e) => {
  //   setInputData({
  //     ...inputData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value === "" ? null : parseFloat(e.target.value)),
      setInputData({
        ...inputData,
        frequency: e.target.value,
      });
  };

  //when click rewind button to set data value change
  const handleRewind = () => {
    setValue((prevValue) => {
      if (prevValue !== null) {
        const newValue = Math.max(min, prevValue - step);
        setInputData({
          ...inputData,
          frequency: newValue,
        });

        return parseFloat(newValue.toFixed(2));
      }
      return null;
    });

    const audio = new Audio(
      "https://wzljnrcgndtpgmwthcrj.supabase.co/storage/v1/object/public/songs/music-001/pickupCoin.wav",
    );
    audio.play();
  };

  //when click fastforward button to set data value change
  const handleFastForward = () => {
    setValue((prevValue) => {
      if (prevValue !== null) {
        const newValue = Math.min(max, prevValue + step);
        setInputData({
          ...inputData,
          frequency: newValue,
        });
        return parseFloat(newValue.toFixed(2));
      }
      return null;
    });

    const audio = new Audio(
      "https://wzljnrcgndtpgmwthcrj.supabase.co/storage/v1/object/public/songs/music-001/pickupCoin.wav",
    );
    audio.play();
  };

  return (
    <>
      <div className=" justify-items-center space-y-4">
        <p>ความถี่ (MHz)</p>
        <div className="arrow" />

        <Counter data={value} />

        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered  w-full max-w-xs"
          value={value}
          onChange={handleChange}
          max={max}
          min={min}
          step={step}
        />

        <SlideRule
          value={value}
          onChange={(value) => {
            setValue(value);
            setInputData({
              ...inputData,
              frequency: value,
            });
          }}
          max={max}
          min={min}
          step={step}
          width={350}
          height={100}
          numberStyle={{ color: "#AEB6BF" }}
        />

        <div className="grid grid-cols-3 justify-items-center gap-4">
          <div>
            <Rewind size={70} onClick={handleRewind} />
          </div>
          <div>
            <StopCircle size={70} onClick={() => setValue(87)} />
          </div>
          <div>
            <FastForward size={70} onClick={handleFastForward} />
          </div>
        </div>
      </div>
    </>
  );
}

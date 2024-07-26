import { useState, useEffect } from "react";
import SlideRule from "react-slide-rule-fork";

import { Rewind, FastForward, CirclePower, Power, PowerOff } from "lucide-react";
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

  //update state value send "S" to websocket "ws://192.168.185.85:3000/Status_FM" to get current state
  const [value, setValue] = useState(0 || null);

  // Debounce function
  function debounce(func, wait) {
    let timeout: string | number | NodeJS.Timeout | undefined;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // update state value send "S" to websocket "ws://192.168.185.85:3000/Status_FM" to get current state
  useEffect(() => {
    const ws = new WebSocket("ws://172.16.116.32:3000/Status_FM");
    //send value to websocket
    ws.onopen = () => {
      //console.log("Connected to devices");
      ws.send("S");
    };

    // Debounced function to process the message
    const processMessage = debounce((data) => {
      const view = new DataView(data);
      const decoder = new TextDecoder();
      const text = decoder.decode(view);
      const parsedData = JSON.parse(text);

      //FM1
      const frequency = parsedData[0][0];
      const state = parsedData[0][1];

      //FM2
      const frequency_2 = parsedData[1][0];
      const state_2 = parsedData[1][1];

      //FM3
      const frequency_3 = parsedData[2][0];
      const state_3 = parsedData[2][1];

      //FM4
      const frequency_4 = parsedData[3][0];
      const state_4 = parsedData[3][1];

      console.log(state_3);
      console.log(state_4);

      //switchcase for tunerStateChanel setValue when frequency change by FM1, FM2, FM3 , FM4 ref by tunerStateChanel
      switch (tunerStateChanel) {
        case "1":
          setValue(frequency / 100);
          setSwitchState(state === 1 ? true : false);
          break;
        case "2":
          setValue(frequency_2 / 100);
          setSwitchState(state_2 === 1 ? true : false);
          break;
        case "3":
          setValue(frequency_3 / 100);
          setSwitchState(state_3 === 1 ? true : false);
          break;
        case "4":
          setValue(frequency_4 / 100);
          setSwitchState(state_4 === 1 ? true : false);
          break;
        default:
          break;
      }

      //setValue when frequency change by FM1, FM2, FM3 , FM4 ref by tunerStateChanel
      // if (tunerStateChanel === "1") {
      //   setValue(frequency / 100);
      // } else if (tunerStateChanel === "2") {
      //   setValue(frequency_2 / 100);
      // } else if (tunerStateChanel === "3") {
      //   setValue(frequency_3 / 100);
      // } else if (tunerStateChanel === "4") {
      //   setValue(frequency_4 / 100);
      // }

      setInputData((prevInputData) => ({
        ...prevInputData,
        frequency: frequency / 100,
      }));

      //setInputData when state change by FM1, FM2, FM3 , FM4 ref by tunerStateChanel
      // if (tunerStateChanel === "1") {
      //   setInputData((prevInputData) => ({
      //     ...prevInputData,
      //     frequency: frequency / 100,
      //   }));
      // } else if (tunerStateChanel === "2") {
      //   setInputData((prevInputData) => ({
      //     ...prevInputData,
      //     frequency: frequency_2 / 100,
      //   }));
      // } else if (tunerStateChanel === "3") {
      //   setInputData((prevInputData) => ({
      //     ...prevInputData,
      //     frequency: frequency_3 / 100,
      //   }));
      // } else if (tunerStateChanel === "4") {
      //   setInputData((prevInputData) => ({
      //     ...prevInputData,
      //     frequency: frequency_4 / 100,
      //   }));
      // }

      // setInputDataControl((prevInputDataControl) => ({
      //   ...prevInputDataControl,
      //   frequency: frequency / 100,
      // }));

      //setInputDataControl when state change by FM1, FM2, FM3 , FM4 ref by tunerStateChanel
      // if (tunerStateChanel === "1") {
      //   setInputDataControl((prevInputDataControl) => ({
      //     ...prevInputDataControl,
      //     frequency: frequency / 100,
      //   }));
      // } else if (tunerStateChanel === "2") {
      //   setInputDataControl((prevInputDataControl) => ({
      //     ...prevInputDataControl,
      //     frequency: frequency_2 / 100,
      //   }));
      // } else if (tunerStateChanel === "3") {
      //   setInputDataControl((prevInputDataControl) => ({
      //     ...prevInputDataControl,
      //     frequency: frequency_3 / 100,
      //   }));
      // } else if (tunerStateChanel === "4") {
      //   setInputDataControl((prevInputDataControl) => ({
      //     ...prevInputDataControl,
      //     frequency: frequency_4 / 100,
      //   }));
      // }

      // setSwitchState(state === 1 ? true : false);
    }, 500); // Adjust the debounce time (500ms) as needed

    //switchcase for tunerStateChanel setSwitchState when state change by FM1, FM2, FM3 , FM4 ref by tunerStateChanel and debounce 500ms

    //setSwitchState when state change by FM1, FM2, FM3 , FM4 ref by tunerStateChanel
    // if (tunerStateChanel === "1") {
    //   setSwitchState(state === 1 ? true : false);
    // } else if (tunerStateChanel === "2") {
    //   setSwitchState(state_2 === 1 ? true : false);
    // } else if (tunerStateChanel === "3") {
    //   setSwitchState(state_3 === 1 ? true : false);
    // } else if (tunerStateChanel === "4") {
    //   setSwitchState(state_4 === 1 ? true : false);
    // }

    ws.onmessage = (response) => {
      // console.log("Message from devices", response.data);
      response.data.arrayBuffer().then(processMessage);
    };

    return () => {
      ws.close();
    };
  }, [tunerStateChanel, inputData]);

  // ws.onmessage = (response) => {
  //   console.log("Message from devices", response.data);

  //   //convert blob to array buffer
  //   response.data.arrayBuffer().then((buffer) => {
  //     const view = new DataView(buffer);
  //     const decoder = new TextDecoder();
  //     const text = decoder.decode(view);

  //     const data: any = JSON.parse(text);

  //     const frequency: number = data[0][0];

  //     const state: number = data[0][1];
  //     console.log(frequency);

  //     setValue(frequency / 100);
  //     setInputData({
  //       ...inputData,
  //       frequency: frequency / 100,
  //     });

  //     setSwitchState(state === 1 ? true : false);
  //   });
  // };

  //console.log(value);

  // //sent "F" to get frequency array from websocket  for frequencyChart
  // useEffect(() => {
  //   const ws = new WebSocket("ws://192.168.185.85:3000/Status_FM");
  //   //send value to websocket
  //   ws.onopen = () => {
  //     //console.log("Connected to devices");
  //     ws.send("F");
  //   };

  //   ws.onmessage = (response2) => {
  //     // console.log("Message from devices", response.data);

  //     //convert blob to array buffer
  //     response2.data.arrayBuffer().then((buffer) => {
  //       const views = new DataView(buffer);
  //       const decoders = new TextDecoder();
  //       const texts = decoders.decode(views);
  //       console.log(texts);
  //     });
  //   };
  // }, [scanButtonState]);

  // useEffect(() => {
  //   const ws = new WebSocket("ws://192.168.111.85:3000/Control_FM");

  //   //send value to websocket
  //   ws.onopen = () => {
  //     console.log("Connected to server");
  //     ws.send(
  //       // Convert value * 100 to integer and convert to string berfore sending
  //       "4" + tunerStateChanel + (value * 100).toString(),
  //     );
  //   };

  //   ws.onmessage = (event) => {
  //     console.log("Message from server", event.data);
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, [value]);

  // const handleInputChange = (e) => {
  //   setInputData({
  //     ...inputData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setValue(e.target.value === "" ? null : parseFloat(e.target.value)),
    // setInputData({
    //   ...inputData,
    //   frequency: e.target.value,
    // });

    setInputDataControl({
      ...inputDateControl,
      frequency: e.target.value,
    });
  };

  //when click rewind button to set data value change
  // when click handleRewind button to set data value change and send to websocket "ws://192.168.185.85:3000/Control_FM" massage is "111"
  const handleRewind = () => {
    // Create an instance of AudioContext
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    //Create an oscillator node
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine"; // Type of the oscillator
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to 440 Hz
    // Connect the oscillator to the context's destination (the speakers)
    oscillator.connect(audioContext.destination);
    // Start the oscillator
    oscillator.start();
    // Stop the oscillator after 1 second
    setTimeout(() => {
      oscillator.stop();
      // Clean up after stopping
      oscillator.disconnect();
    }, 300);

    // const audio = new Audio(
    //   "https://wzljnrcgndtpgmwthcrj.supabase.co/storage/v1/object/public/songs/music-001/pickupCoin.wav",
    // );
    // audio.play().catch((error) => {
    //   // Handle any potential errors here
    //   console.error("Failed to play audio:", error);
    // });

    const ws = new WebSocket("ws://172.16.116.32:3000/Control_FM");

    //send value to websocket
    ws.onopen = () => {
      console.log("Connected to server");
      ws.send("1" + tunerStateChanel + "1");
    };

    ws.onmessage = (event) => {
      console.log("Message from server", event.data);
    };

    return () => {
      ws.close();
    };
  };

  // const handleRewind = async () => {
  //   setValue((prevValue) => {
  //     if (prevValue !== null) {
  //       const newValue = Math.max(min, prevValue - step);
  //       setInputData({
  //         ...inputData,
  //         frequency: newValue,
  //       });

  //       return parseFloat(newValue.toFixed(2));
  //     }
  //     return null;
  //   });

  //   const audio = new Audio(
  //     "https://wzljnrcgndtpgmwthcrj.supabase.co/storage/v1/object/public/songs/music-001/pickupCoin.wav",
  //   );
  //   await audio.play();
  // };

  //when click fastforward button to set data value change
  // const handleFastForward = () => {
  //   setValue((prevValue) => {
  //     if (prevValue !== null) {
  //       const newValue = Math.min(max, prevValue + step);
  //       setInputData({
  //         ...inputData,
  //         frequency: newValue,
  //       });
  //       return parseFloat(newValue.toFixed(2));
  //     }
  //     return null;
  //   });

  //   const audio = new Audio(
  //     "https://wzljnrcgndtpgmwthcrj.supabase.co/storage/v1/object/public/songs/music-001/pickupCoin.wav",
  //   );
  //   audio.play();
  // };

  //when click fastforward button to set data value change and send to websocket "ws://192.168.185.85:3000/Control_FM" massage is "110"
  const handleFastForward = () => {
    // Create an instance of AudioContext
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    //Create an oscillator node
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine"; // Type of the oscillator
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to 440 Hz
    // Connect the oscillator to the context's destination (the speakers)
    oscillator.connect(audioContext.destination);
    // Start the oscillator
    oscillator.start();
    // Stop the oscillator after 1 second
    setTimeout(() => {
      oscillator.stop();
      // Clean up after stopping
      oscillator.disconnect();
    }, 300);

    // const audio = new Audio(
    //   "https://wzljnrcgndtpgmwthcrj.supabase.co/storage/v1/object/public/songs/music-001/pickupCoin.wav",
    // );
    // audio.play().catch((error) => {
    //   // Handle any potential errors here
    //   console.error("Failed to play audio:", error);
    // });

    const ws = new WebSocket("ws://172.16.116.32:3000/Control_FM");

    //send value to websocket
    ws.onopen = () => {
      console.log("Connected to server");
      ws.send("1" + tunerStateChanel + "0");
    };

    ws.onmessage = (event) => {
      console.log("Message from server", event.data);
    };

    return () => {
      ws.close();
    };
  };

  //create toogle switch
  const [isOn, setIsOn] = useState<boolean | null>(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  //follow the state of the switch
  const [switchState, setSwitchState] = useState(false);

  useEffect(() => {
    // Initialize WebSocket connection
    const newWs = new WebSocket("ws://172.16.116.32:3000/Control_FM");
    setWs(newWs);

    newWs.onmessage = (event: MessageEvent) => {
      console.log("Message from server", event.data);
    };

    return () => {
      newWs.close();
    };
  }, []);

  const toggleOnSwitch = () => {
    // Create an instance of AudioContext
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    //Create an oscillator node
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine"; // Type of the oscillator
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to 440 Hz
    // Connect the oscillator to the context's destination (the speakers)
    oscillator.connect(audioContext.destination);
    // Start the oscillator
    oscillator.start();
    // Stop the oscillator after 1 second
    setTimeout(() => {
      oscillator.stop();
      // Clean up after stopping
      oscillator.disconnect();
    }, 300);

    //Send "611" == on by tunerStateChanel for button ON and close websocket
    if (ws) {
      // Construct the message based on isOn state and tunerStateChannel
      const message = "6" + tunerStateChanel + "1";

      // Check if WebSocket connection is open
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
        setIsOn(!isOn); // Toggle the state
      } else {
        console.log("WebSocket is not open. ReadyState:", ws.readyState);
        // Optional: Handle the case when WebSocket is not open
      }

    }

    // // setIsOn and send "611" == on ,"610" === off by lenght of messages position 1 is tunerStateChanel example "6" + tunerStateChanel + "1" === on and "6" + tunerStateChanel + "0" === off
    // if (ws) {
    //   // Construct the message based on isOn state and tunerStateChannel
    //   const message = "6" + tunerStateChanel + (isOn ? "1" : "0");

    //   // Check if WebSocket connection is open
    //   if (ws.readyState === WebSocket.OPEN) {
    //     ws.send(message);
    //     setIsOn(!isOn); // Toggle the state
    //   } else {
    //     console.log("WebSocket is not open. ReadyState:", ws.readyState);
    //     // Optional: Handle the case when WebSocket is not open
    //   }
    // }
  };

  const toggleOffSwitch = () => {
    // Create an instance of AudioContext
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    //Create an oscillator node
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine"; // Type of the oscillator
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to 440 Hz
    // Connect the oscillator to the context's destination (the speakers)
    oscillator.connect(audioContext.destination);
    // Start the oscillator
    oscillator.start();
    // Stop the oscillator after 1 second
    setTimeout(() => {
      oscillator.stop();
      // Clean up after stopping
      oscillator.disconnect();
    }, 300);

      //Send "610" == on by tunerStateChanel for button ON and close websocket
      if (ws) {
        // Construct the message based on isOn state and tunerStateChannel
        const message = "6" + tunerStateChanel + "0";
  
        // Check if WebSocket connection is open
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(message);
          setIsOn(!isOn); // Toggle the state
        } else {
          console.log("WebSocket is not open. ReadyState:", ws.readyState);
          // Optional: Handle the case when WebSocket is not open
        }
  
      
      }
    // // setIsOn and send "611" == on ,"610" === off by lenght of messages position 1 is tunerStateChanel example "6" + tunerStateChanel + "1" === on and "6" + tunerStateChanel + "0" === off
    // if (ws) {
    //   // Construct the message based on isOn state and tunerStateChannel
    //   const message = "6" + tunerStateChanel + (isOn ? "1" : "0");

    //   // Check if WebSocket connection is open
    //   if (ws.readyState === WebSocket.OPEN) {
    //     ws.send(message);
    //     setIsOn(!isOn); // Toggle the state
    //   } else {
    //     console.log("WebSocket is not open. ReadyState:", ws.readyState);
    //     // Optional: Handle the case when WebSocket is not open
    //   }
    // }
  };

  //create control FM to devices websocket

  const [inputDateControl, setInputDataControl] = useState({
    seek_next: 0.25,
    seek_back: -0.25,
    frequency: 98.25,
    chanel: 1,
    state: "online",
    volume: 100,
  });

  //Control FM Frequency to devices websocket
  useEffect(() => {
    const ws = new WebSocket("ws://172.16.116.32:3000/Control_FM");

    //send value to websocket
    ws.onopen = () => {
      console.log("Connected to server");
      ws.send(
        // Convert value * 100 to integer and convert to string berfore sending
        "4" + tunerStateChanel + (inputDateControl.frequency * 100).toString(),
      );
    };

    ws.onmessage = (event) => {
      console.log("Message from server", event.data);
    };

    return () => {
      ws.close();
    };
  }, [inputDateControl.frequency]);

  return (
    <>
      <div className=" justify-items-center space-y-4">
        <p>ความถี่ (MHz)</p>
        <div className="arrow" />

        <Counter data={value ?? undefined} />

        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered  w-full max-w-xs"
          //value={value ?? undefined}
          onChange={handleChange}
          max={max}
          min={min}
          step={step}
        />

        <SlideRule
          value={value ?? undefined}
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
          <div className="grid grid-cols-1 justify-stretch space-y-4">
            <button className="btn bg-green-500" onClick={toggleOnSwitch}>
            <Power />
            </button>
            <button className="btn btn-error" onClick={toggleOffSwitch}>
            <PowerOff />
            </button>
          </div>
          <div>
            <FastForward size={70} onClick={handleFastForward} />
          </div>
        </div>
      </div>
    </>
  );
}

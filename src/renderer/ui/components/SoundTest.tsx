import React, { useState, useCallback, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { FcInfo } from "react-icons/fc";
import { MdPlayCircleOutline, MdStopCircle } from "react-icons/md";
import { Howl } from "howler";

const SoundTest = () => {
  const [playing, setPlaying] = useState(false);
  const handleClick = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  useEffect(() => {
    let sound: any = null;
    if (playing) {
      sound = new Howl({
        src: [require("../assets/notification.wav")],
        html5: true,
        loop: true
      });
      sound.play();
    }
    return () => {
      if (sound) {
        sound.stop();
      }
    };
  }, [playing]);

  return (
    <Alert variant="info">
      <FcInfo />
      Натисніть на піктограму{" "}
      <div style={{ display: "inline" }} onClick={handleClick}>
        {!playing && <MdPlayCircleOutline className="clickable-icon" />}
        {playing && <MdStopCircle className="clickable-icon" />}
      </div>
      , щоб прослухати звуковий сигнал.
    </Alert>
  );
};

export default SoundTest;

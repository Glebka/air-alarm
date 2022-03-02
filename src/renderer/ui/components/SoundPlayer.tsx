import React, { useEffect } from "react";
import { Howl } from "howler";

import { useAppSelector } from "../redux/hooks";
import { selectSoundPlaybackStatus } from "../redux/AlarmStatusSlice";

const SoundPlayer = () => {
  const isPlaying = useAppSelector(selectSoundPlaybackStatus);
  useEffect(() => {
    let sound: any = null;
    if (isPlaying) {
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
  }, [isPlaying]);
  return <></>;
};

export default SoundPlayer;

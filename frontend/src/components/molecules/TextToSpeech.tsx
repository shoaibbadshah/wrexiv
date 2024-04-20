"use client";

import { useSpeechSynthesis } from "react-speech-kit";

type Props = {
  text: string;
};

const TextToSpeech = ({ text }: Props) => {
  const { speak } = useSpeechSynthesis();
  return (
    <button
      className="btn btn-xs btn-ghost"
      onClick={() => speak({ text: text })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        />
      </svg>
      Read
    </button>
  );
};

export default TextToSpeech;

"use client";

import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useCallback, useEffect } from "react";
import debounce from "lodash.debounce";

type Props = {
  handleExecute?: (text: string) => void;
  label?: string;
  onChange?: (text: string) => void;
  canReset?: boolean;
};

const VoiceInput = ({ handleExecute, label, onChange, canReset }: Props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // hydration error が出るのでコメントアウト
  /* if (!browserSupportsSpeechRecognition) {
    return <div>ブラウザが音声認識未対応です</div>;
  } */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    debounce((text: string) => {
      if (onChange) onChange(text);
    }, 1000),
    [onChange]
  );

  useEffect(() => {
    if (!listening && transcript && transcript.length > 0) {
      if (handleExecute) handleExecute(transcript);
      resetTranscript();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  useEffect(() => {
    handleChange(transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  return (
    <div className="pb-2">
      <div className="space-x-4 flex">
        {listening && <span className="loading loading-bars loading-sm"></span>}
        {listening && (
          <button
            onClick={() => SpeechRecognition.stopListening()}
            className="btn"
          >
            <span className="flex items-center">Submit</span>
          </button>
        )}
        {!listening && (
          <button
            className="btn"
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: "en-GB",
              })
            }
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                />
              </svg>
              {label || "Record"}
            </span>
          </button>
        )}
        {false && (
          <button
            className="btn"
            onClick={() => SpeechRecognition.stopListening()}
          >
            Stop
          </button>
        )}
        {canReset && (
          <button className="btn" onClick={() => resetTranscript()}>
            Reset
          </button>
        )}
      </div>
      {transcript}
    </div>
  );
};

export default VoiceInput;

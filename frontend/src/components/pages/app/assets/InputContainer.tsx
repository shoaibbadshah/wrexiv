"use client";

import { LanguageEnum, PlatformEnum } from "@/graphql/generated";
import {
  addLanguage,
  addPlatform,
  removeLanguage,
  removePlatform,
  useContentGenerationState,
} from "@/store/contentGenerationSlice";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

type PropsType = {
  handleSubmit: (input: string) => void;
};

type PlatformInfo = {
  label: string;
  value: PlatformEnum;
};

const PLATFORMS: PlatformInfo[] = Object.entries(PlatformEnum).map(
  ([key, value]) => {
    // Enumのキーを人間が読みやすい形式に変換（例：FACEBOOK -> Facebook）
    const label = key
      .split("_") // アンダースコアで分割
      .map(word => word.charAt(0) + word.slice(1).toLowerCase()) // 各単語の最初の文字を大文字にし、残りを小文字に
      .join(" "); // スペースで結合

    return { label, value };
  }
);

type LanguageInfo = {
  label: string;
  value: LanguageEnum;
};

const LANGUAGES: LanguageInfo[] = [
  { label: "Japanese", value: LanguageEnum.Ja },
  { label: "Korean", value: LanguageEnum.Ko },
];

const InputContainer = ({ handleSubmit }: PropsType) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { languages, platforms } = useContentGenerationState();

  const handlePlatformChange = (platform: PlatformEnum, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addPlatform(platform));
    } else {
      dispatch(removePlatform(platform));
    }
  };

  const handleLanguageChange = (language: LanguageEnum, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addLanguage(language));
    } else {
      dispatch(removeLanguage(language));
    }
  };

  return (
    <div>
      <div>
        <TextField
          fullWidth
          multiline
          rows="4"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
      <div>
        {PLATFORMS.map(({ label, value }) => (
          <FormControlLabel
            key={value}
            label={label}
            control={
              <Checkbox
                checked={platforms.includes(value)}
                onChange={e => handlePlatformChange(value, e.target.checked)}
                sx={{ textTransform: "none" }}
              />
            }
          />
        ))}
      </div>
      <div>
        {LANGUAGES.map(({ label, value }) => (
          <FormControlLabel
            key={value}
            label={label}
            control={
              <Checkbox
                checked={languages.includes(value)}
                onChange={e => handleLanguageChange(value, e.target.checked)}
              />
            }
          />
        ))}
      </div>
      <div>
        <button className="btn" onClick={() => handleSubmit(input)}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default InputContainer;

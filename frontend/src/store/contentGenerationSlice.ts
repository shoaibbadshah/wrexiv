import { LanguageEnum, PlatformEnum } from "@/graphql/generated";
import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction, Draft } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export type ContentGenerationState = {
  languages: LanguageEnum[];
  platforms: PlatformEnum[];
};

export const initialState: ContentGenerationState = {
  languages: [LanguageEnum.Ja, LanguageEnum.Ko],
  platforms: [PlatformEnum.Twitter, PlatformEnum.Instagram],
};

const contentGenerationSlice = createSlice({
  name: "contentGeneration",
  initialState,
  reducers: {
    addLanguage: (
      state: Draft<ContentGenerationState>,
      action: PayloadAction<LanguageEnum>
    ) => {
      state.languages.push(action.payload);
    },
    removeLanguage: (
      state: Draft<ContentGenerationState>,
      action: PayloadAction<LanguageEnum>
    ) => {
      state.languages = state.languages.filter(
        language => language !== action.payload
      );
    },
    addPlatform: (
      state: Draft<ContentGenerationState>,
      action: PayloadAction<PlatformEnum>
    ) => {
      state.platforms.push(action.payload);
    },
    removePlatform: (
      state: Draft<ContentGenerationState>,
      action: PayloadAction<PlatformEnum>
    ) => {
      state.platforms = state.platforms.filter(
        platform => platform !== action.payload
      );
    },
  },
});

export const useContentGenerationState = () =>
  useSelector(
    (state: { contentGeneration: ContentGenerationState }) =>
      state.contentGeneration
  );

export const { addLanguage, removeLanguage, addPlatform, removePlatform } =
  contentGenerationSlice.actions;

export default contentGenerationSlice.reducer;

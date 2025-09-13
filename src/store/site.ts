import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  apiKey: string | null;
  setApiKey: (key: string) => void;
};

export const useGeminiStore = create<State>()(
  persist(
    (set) => ({
      apiKey: null,
      setApiKey: (key) => set({ apiKey: key }),
    }),
    { name: "gemini-store" }
  )
);

import { useState } from "react";
import { ISettings } from "../types/types";

export const useSettings = () => {
  const [settings, setSettings] = useState<ISettings>({
    width: 50,
    height: 50,
  });

  return { settings, setSettings };
};

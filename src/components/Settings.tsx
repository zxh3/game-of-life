import React from "react";
import { ISettings } from "../types/types";
import produce from "immer";

interface Props {
  settings: ISettings;
  setSettings: (value: ISettings) => void;
  clearGrid: () => void;
  randomizeGrid: () => void;
  evolve: () => void;
}

const Settings: React.FC<Props> = ({
  settings,
  setSettings,
  clearGrid,
  randomizeGrid,
  evolve,
}) => {
  return (
    <div className="absolute top-12 left-6 flex flex-col">
      <div className="my-2 flex content-center justify-center">
        <label className="mr-4 w-20" htmlFor="grid-width">
          Width
        </label>
        <input
          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 leading-tight text-gray-700 focus:border-slate-500 focus:bg-white focus:outline-none"
          id="grid-width"
          value={settings.width}
          onChange={(e) => {
            setSettings(
              produce(settings, (draft) => {
                draft.width = Number(e.target.value);
              })
            );
          }}
          type="number"
        />
      </div>

      <div className="my-2 flex content-center justify-center">
        <label className="mr-4 w-20" htmlFor="grid-height">
          Height
        </label>
        <input
          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 leading-tight text-gray-700 focus:border-slate-500 focus:bg-white focus:outline-none"
          id="grid-height"
          value={settings.height}
          onChange={(e) => {
            setSettings(
              produce(settings, (draft) => {
                draft.height = Number(e.target.value);
              })
            );
          }}
          type="number"
        />
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <div>
          <button
            onClick={clearGrid}
            className="rounded bg-slate-500 py-2 px-4 font-bold text-white hover:bg-slate-700"
          >
            Clear (Keyboard: c)
          </button>
        </div>
        <div>
          <button
            onClick={randomizeGrid}
            className="rounded bg-slate-500 py-2 px-4 font-bold text-white hover:bg-slate-700"
          >
            Randomize (Keyboard: r)
          </button>
        </div>
        <div>
          <button
            onClick={evolve}
            className="rounded bg-slate-500 py-2 px-4 font-bold text-white hover:bg-slate-700"
          >
            Evolve (Keyboard: e)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

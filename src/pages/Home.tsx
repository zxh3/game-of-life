import React from "react";
import { useSettings } from "../hooks/useSettings";
import { useGrid } from "../hooks/useGrid";
import GridComponent from "../components/Grid";
import Settings from "../components/Settings";

const Home: React.FC = () => {
  const { settings, setSettings } = useSettings();
  const { grid, toggleCell, clearGrid, randomizeGrid, evolve } =
    useGrid(settings);

  return (
    <div>
      <Settings
        settings={settings}
        setSettings={setSettings}
        clearGrid={clearGrid}
        randomizeGrid={randomizeGrid}
        evolve={evolve}
      />
      <GridComponent grid={grid} toggleCell={toggleCell} />
    </div>
  );
};

export default Home;

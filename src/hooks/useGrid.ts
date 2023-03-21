import { useState, useEffect, useCallback } from "react";
import type { Grid, ISettings } from "../types/types";
import produce from "immer";

export const useGrid = (settings: ISettings) => {
  const [grid, setGrid] = useState<Grid>(
    getEmptyGrid({ width: settings.width, height: settings.height })
  );

  const toggleCell = useCallback((i: number, j: number) => {
    setGrid((grid) =>
      produce(grid, (draft) => {
        draft[i][j] = !grid[i][j];
      })
    );
  }, []);

  const randomizeGridHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === "r") {
      setGrid((grid) => randomizeGrid(grid));
    }
  }, []);

  const clearGridHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === "c") {
      setGrid((grid) => clearGrid(grid));
    }
  }, []);

  const evolveHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === "e") {
      setGrid((grid) => evolve(grid));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", randomizeGridHandler);
    window.addEventListener("keydown", clearGridHandler);
    window.addEventListener("keydown", evolveHandler);

    return () => {
      window.removeEventListener("keydown", randomizeGridHandler);
      window.removeEventListener("keydown", clearGridHandler);
      window.removeEventListener("keydown", evolveHandler);
    };
  }, [randomizeGridHandler, clearGridHandler, evolveHandler]);

  useEffect(() => {
    const { width, height } = settings;
    if (
      Number.isSafeInteger(width) &&
      Number.isSafeInteger(height) &&
      width > 0 &&
      height > 0
    ) {
      setGrid(getEmptyGrid({ width, height }));
    }
  }, [settings]);

  return {
    grid,
    toggleCell,
    clearGrid: () => setGrid((grid) => clearGrid(grid)),
    randomizeGrid: () => setGrid((grid) => randomizeGrid(grid)),
    evolve: () => setGrid((grid) => evolve(grid)),
  };
};

const getEmptyGrid = ({ width, height }: { width: number; height: number }) => {
  const grid: Grid = [];
  for (let i = 0; i < width; i++) {
    grid.push(new Array(height).fill(false));
  }
  return grid;
};

const _fillGrid = (grid: Grid, fn: () => boolean): Grid => {
  return produce(grid, (draft) => {
    const [width, height] = [grid.length, grid[0].length];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        draft[i][j] = fn();
      }
    }
  });
};

const clearGrid = (grid: Grid): Grid => {
  return _fillGrid(grid, () => false);
};

const randomizeGrid = (grid: Grid): Grid => {
  return _fillGrid(grid, () => Math.random() > 0.5);
};

const evolve = (grid: Grid): Grid => {
  return produce(grid, (draft) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        const neighbors = getNeighbors(grid, i, j);
        const livedNeighbors = neighbors.filter((neighbor) => neighbor);

        let done = false;
        // Any live cell with two or three live neighbours survives.
        if (
          grid[i][j] &&
          (livedNeighbors.length === 2 || livedNeighbors.length === 3)
        ) {
          done = true;
        }

        // Any dead cell with three live neighbours becomes a live cell.
        if (!done && !grid[i][j] && livedNeighbors.length === 3) {
          draft[i][j] = true;
          done = true;
        }

        // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        if (!done) {
          draft[i][j] = false;
        }
      }
    }
  });
};

const getNeighbors = (grid: Grid, i: number, j: number): boolean[] => {
  const neighbors: boolean[] = [];
  const [w, h] = [grid.length, grid[0].length];

  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      const ni = i + di;
      const nj = j + dj;
      if (ni === i && nj === j) continue;
      if (ni >= 0 && nj >= 0 && ni < h && nj < w) {
        neighbors.push(grid[ni][nj]);
      }
    }
  }

  return neighbors;
};

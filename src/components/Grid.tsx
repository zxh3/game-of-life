import React from "react";

interface Props {
  grid: boolean[][];
  toggleCell: (i: number, j: number) => void;
}

const Grid: React.FC<Props> = ({ grid, toggleCell }) => {
  const h = grid[0].length;

  return (
    <div className="m-8 flex content-center justify-center">
      {grid.map((row, i) => {
        return (
          <div key={i}>
            {row.map((_cell, j) => {
              return (
                <div
                  onClick={() => toggleCell(i, j)}
                  key={j}
                  style={{
                    width: `calc(90vh / ${h})`,
                    height: `calc(90vh / ${h})`,
                    background: grid[i][j] ? "black" : "white",
                    border: "0.1px solid black",
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;

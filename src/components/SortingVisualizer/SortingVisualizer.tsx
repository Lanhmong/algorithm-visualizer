import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  sleep,
} from "./SortingVisualizerUtil";

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sleepTime, setSleepTime] = useState<number>(20); // Initial sleep time
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray: number[] = [];
    for (let i = 0; i < 20; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  };

  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const visualizeSort = async (algorithm: string) => {
    const arrayCopy = [...array];

    switch (algorithm) {
      case "bubbleSort":
        await bubbleSort(
          arrayCopy,
          setArray,
          (ms) => sleep(ms * sleepTime),
          setHighlightedIndices
        );
        break;

      case "selectionSort":
        await selectionSort(
          arrayCopy,
          setArray,
          (ms) => sleep(ms * sleepTime),
          setHighlightedIndices
        );
        break;

      case "insertionSort":
        await insertionSort(
          arrayCopy,
          setArray,
          (ms) => sleep(ms * sleepTime),
          setHighlightedIndices
        );
        break;

      case "quickSort":
        await quickSort(
          arrayCopy,
          setArray,
          (ms) => sleep(ms * sleepTime),
          setHighlightedIndices
        );
        break;

      // Add more cases for other sorting algorithms

      default:
        console.error("Invalid algorithm");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sorting Visualizer</h2>
      <div className="array-container mb-4">
        {array.map((value, idx) => (
          <div
            className={`array-bar ${
              highlightedIndices.includes(idx) ? "highlighted" : ""
            }`}
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
      <div className="form-group">
        <label htmlFor="sleepTime">Sleep Time (ms): </label>
        <input
          type="number"
          id="sleepTime"
          className="form-control"
          value={sleepTime}
          onChange={(e) => setSleepTime(parseInt(e.target.value))}
        />
      </div>
      <div className="button-container">
        <button
          className="btn btn-primary mr-2"
          onClick={() => generateArray()}
        >
          Generate New Array
        </button>
        <button
          className="btn btn-primary mr-2"
          onClick={() => visualizeSort("bubbleSort")}
        >
          Bubble Sort
        </button>
        <button
          className="btn btn-primary mr-2"
          onClick={() => visualizeSort("selectionSort")}
        >
          Selection Sort
        </button>
        <button
          className="btn btn-primary mr-2"
          onClick={() => visualizeSort("insertionSort")}
        >
          Insertion Sort
        </button>
        <button
          className="btn btn-primary"
          onClick={() => visualizeSort("quickSort")}
        >
          Quick Sort
        </button>
        {/* Add buttons for other sorting algorithms */}
      </div>
    </div>
  );
};

export default SortingVisualizer;

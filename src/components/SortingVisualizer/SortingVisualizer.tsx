import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  sleep,
} from "./Algorithms";
import { AlgorithmButton } from "../AlgorithmButton/AlgorithmButton";
import { randomIntFromInterval } from "./SortingVisualizerUtil";

const algorithmFunctions = {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  // Add more algorithms as needed
};

const SortingVisualizer = () => {
  const [sleepTime, setSleepTime] = useState<number>(20);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(20);
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    generateArray();
  }, []);

  const changeArraySize = () => {
    generateArray();
  };

  const generateArray = () => {
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  };

  const visualizeSort = async (algorithm: string) => {
    const arrayCopy = [...array];
    const sortFunction =
      algorithmFunctions[algorithm as keyof typeof algorithmFunctions];
    if (sortFunction) {
      await sortFunction(
        arrayCopy,
        setArray,
        (ms) => sleep(ms * sleepTime),
        setHighlightedIndices
      );
    } else {
      console.error("Invalid algorithm");
    }
  };

  const renderAlgorithmButtons = () => {
    const algorithms = Object.keys(algorithmFunctions);

    return algorithms.map((algorithm) => (
      <AlgorithmButton
        key={algorithm}
        algorithm={algorithm}
        onClick={visualizeSort}
      />
    ));
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
        <label htmlFor="arraySize">Array Size: </label>
        <input
          type="number"
          id="arraySize"
          className="form-control"
          value={arraySize}
          onChange={(e) => setArraySize(parseInt(e.target.value))}
        />
        <button
          className="btn btn-primary ml-2"
          onClick={() => changeArraySize()}
        >
          Generate New Array
        </button>
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
        {renderAlgorithmButtons()}
        {/* Add buttons for other sorting algorithms */}
      </div>
    </div>
  );
};

export default SortingVisualizer;

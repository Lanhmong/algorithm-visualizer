export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const bubbleSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  customSleep: (ms: number) => Promise<void>,
  setHighlightedIndices: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      setHighlightedIndices([j, j + 1]);

      const newArray = array.slice();
      newArray[j] = newArray[j] + 50; // Highlight
      newArray[j + 1] = newArray[j + 1] + 50; // Highlight
      setArray(newArray);
      await customSleep(5);

      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        setArray([...array]);
        await customSleep(5);
      }

      setArray(array.slice());
      setHighlightedIndices([]);

  
    }
  }
};

export const selectionSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  customSleep: (ms: number) => Promise<void>,
  setHighlightedIndices: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      setHighlightedIndices([minIndex, j]);

      const newArray = array.slice();
      newArray[minIndex] = newArray[minIndex] + 50; // Highlight
      newArray[j] = newArray[j] + 50; // Highlight
      setArray(newArray);
      await customSleep(5);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }

      setArray(array.slice());
      setHighlightedIndices([]);
    }

    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
    setArray([...array]);
    await customSleep(5);
  }
};

export const insertionSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  customSleep: (ms: number) => Promise<void>,
  setHighlightedIndices: React.Dispatch<React.SetStateAction<number[]>>,
  

) => {
  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    setHighlightedIndices([i, j]);

    const newArray = array.slice();
    newArray[i] = newArray[i] + 50; // Highlight
    newArray[j] = newArray[j] + 50; // Highlight
    setArray(newArray);
    await customSleep(5);

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      setArray([...array]);
      await customSleep(5);
      j--;
    }

    array[j + 1] = key;
    setArray([...array]);
    await customSleep(5);
    setHighlightedIndices([]);
  }
};

export const quickSort = async (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  customSleep: (ms: number) => Promise<void>,
  setHighlightedIndices: React.Dispatch<React.SetStateAction<number[]>>,

) => {
  const partition = async (low: number, high: number) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;

        const newArray = array.slice();
        newArray[i] = newArray[i] + 50; // Highlight
        newArray[j] = newArray[j] + 50; // Highlight
        setArray(newArray);
        await customSleep(5);

        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        setArray([...array]);
        await customSleep(5);
      }
    }

    const newArray = array.slice();
    newArray[i + 1] = newArray[i + 1] + 50; // Highlight
    newArray[high] = newArray[high] + 50; // Highlight
    setArray(newArray);
    await customSleep(5);

    const temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    setArray([...array]);
    await customSleep(5);

    return i + 1;
  };

  const quickSortRecursive = async (low: number, high: number) => {
    if (low < high) {
      // Ensure partitionIndex is always defined
      const partitionIndex: number = await partition(low, high) || 0;
  
      setHighlightedIndices([partitionIndex]); // Highlight the partition index
      await customSleep(5); // Add a small delay to ensure highlighting is visible
  
      await Promise.all([
        quickSortRecursive(low, partitionIndex - 1),
        quickSortRecursive(partitionIndex + 1, high),
      ]);
  
      setHighlightedIndices([]); // Remove the highlight after the recursive calls
    }
  };
  

  await quickSortRecursive(0, array.length - 1);
};

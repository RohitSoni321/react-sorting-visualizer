import React, { useEffect, useState } from "react";
import "../components/styles/visualizer.css";
import Button from "./assests/Button";
import Dropdown from "./assests/Dropdown";
import Slider from "./assests/Slider";

const ARRAYSIZE = 100;
const Visualizer = () => {
  const [primaryArray, setPrimaryArray] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [disableOptions, setDisableOptions] = useState(false);
  const randomArray = () => {
    for (let i = 0; i < primaryArray.length; i++) {
      let bar = document.getElementById(i).style;
      bar.backgroundColor = "aqua";
    }
    let array = [];
    for (let i = 0; i < ARRAYSIZE; i++) {
      array.push(randomVals(20, 80));
    }
    console.log(array);
    setPrimaryArray(array);
  };

  const randomVals = (min, max) => {
    let randomVal = Math.floor(Math.random() * (max - min + 1) + min);
    return randomVal;
  };

  useEffect(() => {
    randomArray();
    // eslint-disable-next-line
  }, []);

  const handleSorting = () => {
    setDisableOptions(true);
    switch (algorithm) {
      case "bubbleSort":
        bubbleSort();
        break;
      case "selectionSort":
        selectionSort();
        break;
      case "insertionSort":
        insertionSort();
        break;
      case "mergeSort":
        mergeSort();
        break;
      case "quickSort":
        quickSort();
        break;
      case "heapSort":
        heapSort();
        break;
      default:
        break;
    }
  };
  const sleep = (milliSeconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds));
  };
  const finishedAnimation = async () => {
    for (let i = 0; i < ARRAYSIZE; i++) {
      let bar = document.getElementById(i).style;
      bar.backgroundColor = "green";
      await sleep(animationSpeed);
    }

    setDisableOptions(false);
  };
  const bubbleSort = async () => {
    let curArray = primaryArray;
    let len = curArray.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (curArray[j] > curArray[j + 1]) {
          let temp = curArray[j];
          curArray[j] = curArray[j + 1];
          curArray[j + 1] = temp;
          setPrimaryArray([...primaryArray, curArray]);
          let bar1 = document.getElementById(j).style;
          let bar2 = document.getElementById(j + 1).style;

          bar1.backgroundColor = "#DC143C";
          bar2.backgroundColor = "#6A5ACD";
          await sleep(animationSpeed);
          bar1.backgroundColor = "#FF7F50";
          bar2.backgroundColor = "#FF7F50";
        }
      }
    }
    finishedAnimation();
  };

  const selectionSort = async () => {
    let curArray = primaryArray;
    for (let i = 0; i < ARRAYSIZE - 1; i++) {
      for (let j = i + 1; j < ARRAYSIZE; j++) {
        if (curArray[i] > curArray[j]) {
          let temp1 = curArray[i];
          let temp2 = curArray[j];
          curArray[j] = temp1;
          curArray[i] = temp2;
          setPrimaryArray([...primaryArray, curArray]);
          let bar1 = document.getElementById(i).style;
          let bar2 = document.getElementById(j).style;

          bar1.backgroundColor = "#DC143C";
          bar2.backgroundColor = "#6A5ACD";
          await sleep(animationSpeed);
          bar1.backgroundColor = "#FF7F50";
          bar2.backgroundColor = "#FF7F50";
        }
      }
    }
    finishedAnimation();
  };
  const insertionSort = async () => {
    let curArray = primaryArray;
    for (let i = 1; i < ARRAYSIZE; i++) {
      let current = curArray[i];
      let j = i - 1;
      while (j >= 0 && curArray[j] > current) {
        curArray[j + 1] = curArray[j];
        setPrimaryArray([...primaryArray, curArray]);

        let bar1 = document.getElementById(j + 1).style;
        let bar2 = document.getElementById(j).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        await sleep(animationSpeed);

        bar1.backgroundColor = "#FF7F50";
        bar2.backgroundColor = "#FF7F50";

        j--;
      }
      curArray[j + 1] = current;
      setPrimaryArray([...primaryArray, curArray]);
    }
    finishedAnimation();
  };
  const mergeSort = async () => {
    let currentArr = primaryArray;
    setAlgorithm({ name: "Merge Sort", timeComplexity: "O(n log(n))" });

    await sort(currentArr, 0, currentArr.length - 1);
    finishedAnimation();
  };

  const sort = async (arr, low, high) => {
    if (low < high) {
      let mid = Math.floor((low + high) / 2);
      await sort(arr, low, mid);
      await sort(arr, mid + 1, high);
      await merge(arr, low, mid, high);
    }
  };

  const merge = async (arr, low, mid, high) => {
    let i = low;
    let j = mid + 1;
    let k = 0;
    let tempArr = [];

    while (i <= mid && j <= high) {
      if (arr[i] < arr[j]) {
        tempArr[k] = arr[i];
        i++;
        k++;
      } else {
        tempArr[k] = arr[j];
        j++;
        k++;
      }
      setPrimaryArray([...primaryArray, tempArr]);

      let bar1 = document.getElementById(i).style;
      let bar2 = document.getElementById(j).style;
      bar1.backgroundColor = "#DC143C";
      bar2.backgroundColor = "#6A5ACD";

      await sleep(animationSpeed);

      bar1.backgroundColor = "#FF7F50";
      bar2.backgroundColor = "#FF7F50";
    }

    while (i <= mid) {
      tempArr[k] = arr[i];

      setPrimaryArray([...primaryArray, tempArr]);

      let bar1 = document.getElementById(i).style;
      let bar2 = document.getElementById(j).style;

      await sleep(animationSpeed);

      bar1.backgroundColor = "#FF7F50";
      bar2.backgroundColor = "#FF7F50";

      i++;
      k++;
    }

    while (j <= high) {
      tempArr[k] = arr[j];

      setPrimaryArray([...primaryArray, tempArr]);

      let bar1 = document.getElementById(i).style;
      let bar2 = document.getElementById(j).style;
      bar1.backgroundColor = "#DC143C";
      bar2.backgroundColor = "#6A5ACD";

      await sleep(animationSpeed);

      bar1.backgroundColor = "#FF7F50";
      bar2.backgroundColor = "#FF7F50";

      j++;
      k++;
    }

    for (let i = low; i <= high; i++) {
      arr[i] = tempArr[i - low];
      setPrimaryArray([...primaryArray, arr]);
    }
  };
  // Quick Sort
  const quickSort = async () => {
    let currentArr = primaryArray;

    await sorts(currentArr, 0, currentArr.length - 1);
    finishedAnimation();
  };

  const sorts = async (arr, left, right) => {
    if (left < right) {
      let partitionIndex = partition(arr, left, right);

      setPrimaryArray([...primaryArray, arr]);
      await sleep(animationSpeed);

      await sorts(arr, left, partitionIndex - 1);
      await sorts(arr, partitionIndex + 1, right);
    }
  };

  const partition = (arr, left, right) => {
    let pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        let bar1 = document.getElementById(i).style;
        let bar2 = document.getElementById(j).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        setTimeout(() => {
          bar1.backgroundColor = "#ff7f50";
          bar2.backgroundColor = "#ff7f50";
        }, 500);

        setPrimaryArray([...primaryArray, arr]);
      }
    }

    let temp = arr[i + 1];
    arr[i + 1] = arr[right];
    arr[right] = temp;

    return i + 1;
  };

  // Heap Sort
  const heapSort = async () => {
    let arr = primaryArray;
    let length = arr.length;
    let index = Math.floor(length / 2 - 1);
    let lastChild = length - 1;

    while (index >= 0) {
      await heapify(arr, length, index);
      index--;

      setPrimaryArray([...primaryArray, arr]);

      if (index >= 0) {
        let bar1 = document.getElementById(index).style;
        let bar2 = document.getElementById(index + 1).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        await sleep(animationSpeed);

        bar1.backgroundColor = "#FF7F50";
        bar2.backgroundColor = "#FF7F50";
      } else {
        await sleep(animationSpeed);
      }
    }

    while (lastChild >= 0) {
      let swap1 = arr[0];
      let swap2 = arr[lastChild];

      arr[0] = swap2;
      arr[lastChild] = swap1;
      await heapify(arr, lastChild, 0);
      lastChild--;

      setPrimaryArray([...primaryArray, arr]);

      if (index >= 0) {
        let bar1 = document.getElementById(lastChild).style;
        let bar2 = document.getElementById(0).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        bar1.backgroundColor = "#FF7F50";
        bar2.backgroundColor = "#FF7F50";
      } else {
        await sleep(animationSpeed);
      }
    }

    finishedAnimation();
  };

  const heapify = async (arr, length, index) => {
    let largest = index;
    let leftNode = index * 2 + 1;
    let rightNode = leftNode + 1;

    if (arr[leftNode] > arr[largest] && leftNode < length) {
      largest = leftNode;
    }

    if (arr[rightNode] > arr[largest] && rightNode < length) {
      largest = rightNode;
    }

    if (largest !== index) {
      let swap1 = arr[index];
      let swap2 = arr[largest];
      arr[index] = swap2;
      arr[largest] = swap1;

      let bar1 = document.getElementById(index).style;
      let bar2 = document.getElementById(largest).style;
      bar1.backgroundColor = "#DC143C";
      bar2.backgroundColor = "#6A5ACD";

      await sleep(animationSpeed);

      bar1.backgroundColor = "#FF7F50";
      bar2.backgroundColor = "#FF7F50";

      await heapify(arr, length, largest);
    }

    return arr;
  };

  return (
    <div>
      <div className="header">
        <Button
          type="NEWARRAY"
          name="New Array"
          onClick={randomArray}
          disabled={disableOptions}
        ></Button>
        <Dropdown
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={disableOptions}
        ></Dropdown>
        <Slider
          onChange={(e) => setAnimationSpeed(e.target.value)}
          disabled={disableOptions}
        ></Slider>
        <Button
          type="SORT"
          name="Sort"
          onClick={handleSorting}
          disabled={disableOptions}
        ></Button>
      </div>
      <div className="sorting-bars">
        {primaryArray &&
          primaryArray.map((val, key) => {
            val = val * 4;
            if (key === 100) {
              return (
                <div
                  className="bars"
                  id={key}
                  key={key}
                  style={{ height: 0 + "px" }}
                ></div>
              );
            }

            return (
              <div
                className="bars"
                id={key}
                key={key}
                style={{ height: val + "px" }}
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default Visualizer;

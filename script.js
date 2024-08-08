const algorithmSelect = document.getElementById('algorithm-select');
const runButton = document.getElementById('run-button');
const arrayContainer = document.getElementById('array-container');

let array = [];
let algorithm;

// generate a random array of 20 elements
for (let i = 0; i < 20; i++) {
  array.push(Math.floor(Math.random() * 100));
}

// render the array
array.forEach((element) => {
  const elementDiv = document.createElement('div');
  elementDiv.className = 'array-element';
  elementDiv.style.height = `${element}px`;
  arrayContainer.appendChild(elementDiv);
});

// add event listener to run button
runButton.addEventListener('click', async () => {
  algorithm = algorithmSelect.value;
  switch (algorithm) {
    case 'bubble-sort':
      await bubbleSort(array);
      break;
    case 'selection-sort':
      await selectionSort(array);
      break;
    case 'insertion-sort':
      await insertionSort(array);
      break;
    case 'merge-sort':
      mergeSort(array);
      break;
    case 'quick-sort':
      quickSort(array);
      break;
    default:
      console.error(`Unknown algorithm: ${algorithm}`);
  }
});

// sorting algorithms
async function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        renderArray(array);
        await sleep(10); // add a small delay to make the animation smoother
      }
    }
  }
}

async function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    swap(array, i, minIndex);
    renderArray(array);
    await sleep(10); // add a small delay to make the animation smoother
  }
}

async function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
    renderArray(array);
    await sleep(10); // add a small delay to make the animation smoother
  }
}

function mergeSort(array) {
  if (array.length <= 1) return array;
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left).concat(right);
}

function quickSort(array) {
  if (array.length <= 1) return array;
  const pivot = array[0];
  const less = [];
  const greater = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] <= pivot) {
      less.push(array[i]);
    } else {
      greater.push(array[i]);
    }
  }
  return quickSort(less).concat(pivot, quickSort(greater));
}

// helper function to swap two elements in the array
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  renderArray(array);
}

// helper function to render the array
function renderArray(array) {
  const arrayElements = arrayContainer.children;
  for (let i = 0; i < array.length; i++) {
    arrayElements[i].style.height = `${array[i]}px`;
    if (i === array.length - 1) {
      arrayElements[i].classList.add('active');
    } else {
      arrayElements[i].classList.remove('active');
    }
  }
}

// helper function to add a small delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
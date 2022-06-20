// gets the dataset and puts it in a list called listOfRanNums
var listOfRanNums = getColumn("nums", "column1");

//sets a boolean to false so that my function knows if it needs to create hte numbers still
var createdNums = false;

//my function that creates buttons, it takes 2 numbers as input, an id and the number that is in nums_list for that index
// it then creates the button and gives it some basic properties
function buttonCreate(id, number){
  button(id, "");
  setProperty(id, "background-color", "white");
  setProperty(id, 'height', number*10);
  setProperty(id, "width", 5);
  setPosition(id, id*30+12, 80);
}


// this is my insertion sort implementation
// for more information on hwo it works click on the "Insertion" button on the main screen
function improvedInsertionSort(array){
  var i = 1;
  timedLoop(1000, function(){
    if (i == 10){
      return;
    }
    else{
      var temp = array[i];
      var j = i - 1;
      var k = j+1;
      while(j >= 0 && array[j] > temp){
        k = k.toString();
        j = j.toString();
        setProperty(k, "background-color", "green");
        setProperty(j, "background-color", "red");
        j = parseInt(j);
        array[j + 1] = array[j];
        setTimeout(updateBars.bind(null, array), 1000);
        j = j - 1;  
      }
      array[j+1] = temp;
    }
    i += 1;
  });
}

// this is my selection sort implementation
// for more information on how it works click on the button "Selection" on the home screen
function selectionSort(array){
  var minIdx, i, j;
  for (i = 0; i <array.length-1; i++){
    minIdx = i;
    for (j = i+1; j < array.length; j++){
      if(array[j] < array[minIdx]){
          minIdx = j;
          i = i.toString();
          minIdx = minIdx.toString();
          updateColors(minIdx, i);
        }
      }
      i = parseInt(i);
      minIdx = parseInt(minIdx);
      swap(array, minIdx, i);
      updateBars(array);
    }
}


// this is a helper function that takes in 2 ID names in the form of indices. 
// it then changes the colors of those bars. 
function updateColors(min, i){
  setProperty(min, "background-color", "green");
  setProperty(i, "background-color", "red");
}

// this is my bubleSort implementation
// for more information on how it works click on the button called "bubble" 
function bubbleSort(array, i){
  var j = 0;
  if (i == array.length){
    return 0;
  }
  timedLoop(100, function(){
    if (j == array.length){
      stopTimedLoop();
      bubbleSort(array, i+1);
    }
    if (j > i && array[j] < array[i]){
      i = i.toString();
      j = j.toString();
      setProperty(i, "background-color", "green");
      setProperty(j, "background-color", 'red');
      i = parseInt(i);
      j = parseInt(j);
      swap(array, i, j);
      setTimeout(function(){
        updateBars(array);
      }, 1000);
    }
    j = incrementJ(j);
  });
}

// this is my swap function- it takes 3 inputs, the array it needs to change, and 2 indexes.
function swap(array, i, j){
  // stores one of them to a temp variable so that they are not lost when the other is written over
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;

}

// this is my update bars function, which takes in an array as input. 
function updateBars(array){
  // it first loops through teh array so that it can delete each pre-existing bar at it's position
  for (var i =0; i <array.length; i++){
    i = i.toString();
    try{
      deleteElement(i);
    }
    catch(err){
      break;
    }
  }
  // then it re-creates them at the proper position
  for (var j =0; j < 10; j++){
    j = j.toString();
    buttonCreate(j, array[j]);
  }
}

// this is another helper function whos only purpose is to incrememnt J by one
// i made this because it was giving me difficulty when i wasn't using it
function incrementJ(j){
  return j+ 1;
}

function deleteNums(){
  for (var i =0; i < 10; i++){
    if (createdNums){
      i = i.toString();
      deleteElement(i);
    }
  }
}

// initializes the list where i'll be storing the random numbers
var numsList = [];

// this function is responsible for creating the numbers. 
function createNums(){
  //it first checks if it's already created numbers. if it has then it will delete them all first and then set the variable to false again
  // this way it won't make a list twice as long
  if (createdNums){
    for (var i =0; i < 10; i++){
      i = i.toString();
      try{
        deleteElement(i);
      }
      catch(err){
        break;
      }
    }
    createdNums = false;
    numsList.length = 0;
  }
  // then it re-creates the list with new values and recreates the bars aswell that represent the numbers
  for (var j =0; j < 10; j++){
    var index = randomNumber(listOfRanNums.length-1);
    var number = listOfRanNums[index];
    insertItem(numsList, j, number);
    j = j.toString();
    buttonCreate(j, number);
    }
  createdNums = true;
}

// this checks for when the user clicks on the "Sort" button on the bubble sort page
// when it happens it will begin sorting the list using the bubblesort algorithm
onEvent("sort", 'click', function(){
  bubbleSort(numsList, 0);
});

// this is going to check for when the user clicks on the "sort" button on the insertion sort page
// when this happens, it will run the insertion sort algorithm
onEvent("sort2", "click", function(){
  improvedInsertionSort(numsList);
});

// this checks for user input on the "Bubble" button on the main page
// then it sends them to page that explains hwo the algorithm works and some information about it
onEvent("bubbleSort", "click", function(){
  setScreen("bubbleSort(2)");
});

// this checks for when the user clicks on the "see in action" button on the bubblesort page. Thsi will then take them to another bubble sort page
onEvent("seeInActionBut3", "click", function(){
  setScreen("bubbleSort(1)");
});

// this will chekc if they click on the "insertion" button on the main page. It will then take them to the 
// information page where  they can learn about how the algorithm works
onEvent("insertionSort", "click", function(){
  setScreen("insertionSort2");
});

// this checks for user input on the "See in action" button on the insertion sort information page.
// it will then take them to the page where they can see the algorithm working
onEvent("seeInActionBut2", "click", function(){
  setScreen("insertionSort(1)");
});

// this will check for user input on the "create list" button and will create and initalize the list and bars
// for htem to see
onEvent("createNums", 'click', function(){
  createNums();
});

// this will check for user input on the "create list" button and will create and initalize the list and bars
// for htem to see
onEvent("createNums2", "click", function(){
  createNums();
});

// this checks for user input on the "Selection" button, and will send them to the information page
// on the selection sort algorithm, where they can learn about the time and space complexity etc.
onEvent("selectionSort", "click", function(){
  setScreen("selectionSort(2)");
});

// this checks for user input on the "See in action" button on the seleection sort algorithm info page
// it will take them to the place where they can see the working algorithm 
onEvent("seeInActionBut1", "click", function(){
  setScreen("selectionSort(1)");
});

// this will check for user input on the "create list" button and will create and initalize the list and bars
// for htem to see
onEvent("createNums3", "click", function(){
  createNums();
});

// this will check for user input on the "Sort" button on the selection sort page
// then it will run the selection sort algorithm so they can see it working
onEvent("sort3", "click", function(){
  selectionSort(numsList);
});


// these following onEvents are responsible for taking the user back to the home page depending on where they are at
onEvent("home2", "click", function(){
  setScreen("mainScreen");
  deleteNums();
});

onEvent("home3", "click", function(){
  setScreen("mainScreen");
  deleteNums();
});

onEvent("home4", "click", function(){
  setScreen("mainScreen");
  deleteNums();
});

onEvent("home5", "click", function(){
  setScreen("mainScreen");
  deleteNums();
});

onEvent("home6", "click", function(){
  setScreen("mainScreen");
  deleteNums();
});

onEvent("home7", "click", function(){
  setScreen("mainScreen");
  deleteNums();
});

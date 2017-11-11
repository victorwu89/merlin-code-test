/***
* Author: Victor Wu
* Purpose: Merlin Guides auto-load dilenma using ES5 standards
* Create a piece of js code compatible across all browsers to detect a state of loading
* Code which is given a callback, and tries to detect for these.
* If page doesn't appear to be loading, then call the callbaack, if it does then wait until it has finished (then calls it)
* Version: 1.0
***/
//function detectLoad that has the option of taking in values if necessary as well as the callback function to call
function detectLoad(val, callback){
  //use a JSON to store data so it's easy to manage content changes
  var testObj = {
      "image": {
        "src": "//loading.io/assets/img/default-loader.gif",
        "id": "merlin_test1",
        "height": "50",
        "width": "50"
      },
      "text": {
        "id": "merlin_test2",
        "content": "loading text"
      },
      "class": "merlin_test_case"
  }

  //create necessary variables for the stage
  var loading = new Image();
  var paragraph = document.createElement('p');
  var texts = document.createTextNode(testObj.text.content);

  //create loading gif for test1
  loading.src = testObj.image.src;
  loading.id = testObj.image.id;
  loading.height = testObj.image.height;
  loading.width = testObj.image.width;
  loading.className = testObj.class;
  //create text for test2 if previous test fail
  paragraph.id = testObj.text.id;
  paragraph.className = testObj.class;
  console.log('setting the stage');

  //readyStateCheckInterval is a function to check for the readyState through intervals
  var readyStateCheckInterval = setInterval(function() {
    //If complete is found than append necessary elements to the stage and clear the interval
      if(document.readyState === "loading"){}
      else if(document.readyState === "interactive"){}
      else if (document.readyState === "complete") {
          clearInterval(readyStateCheckInterval);
          console.log('ready state change');
          document.body.appendChild(loading);
          paragraph.appendChild(texts);
          document.body.appendChild(paragraph);
          //hides the elements created so they aren't seen
          hideMerlinElements();
          //calls the callback with some parameters
          callback(testObj, loading);
      }else{
        console.log('hmmm... readyState does not appear to be registering');
        //fallback in case somehow the readyState isn't found run callback regardless
        callback();
      }
  }, 10);

}
//function to hide all Elements created by Merlin
function hideMerlinElements(){
  var merlinEle = document.getElementsByClassName('merlin_test_case');
  for (var i = 0; i < merlinEle.length; i++) {
    merlinEle[i].style.visibility = "hidden";
  }
}

//callBack function to simply console out messages for now
function consoleLog(testObj, loading){
  //going to use if and else if (getting dirty)
  if( loading.complete && document.getElementById(testObj.image.id) ){
    console.log('gif loaded callback called');
  }else if( document.getElementById(testObj.text.id) && document.getElementById(testObj.text.id).innerHTML === testObj.text.content ){
    console.log('text loaded callback called');
  }else{
    console.log('not loading but callback called anyways');
  }

}

//run detectLoad
detectLoad("true", consoleLog);

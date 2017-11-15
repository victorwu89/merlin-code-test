/***
* Author: Victor Wu
* Purpose: Merlin Guides auto-load dilenma using ES5 standards to create a piece of js code compatible across all browsers to detect a state of loading. Code should be given a callback, and that tries to detect for specific body element changes. If page doesn't appear to be loading, then call the callbaack, if it does then wait until it has finished (then calls it)
* Version: 2.0
* Description: I've decided to use vanilla javascript with the use of Mutation Observers. Time was an issue trying to find a way to hack ajax using vanilla js so I figured I'd give this a shot using MutationObserver. Only working with the addition and removing of elements as of now and assumes the webpage contains a body.
* Browser Compabibility: https://caniuse.com/mutationobserver/embed
***/

//function detectLoad that has the option of taking in values if necessary as well as the callback function to call
function detectLoad(val, callback){

  //setup variable for observerConfig for use with ObeserverMutation
  var observerConfig = {
          attributes: true,
          childList: true,
          characterData: true, //checks for data changes
          subtree: true
  },
 targetNode  =  document.body ? document.body : document.getElementsByTagName("body")[0],
 log,
 bool = false;

  //readyStateCheckInterval is a function to check for the readyState through intervals
  var readyStateCheckInterval = setInterval(function() {
    //list out each reayState variable
      switch(document.readyState){
        case 'loading':
          console.log('page loading');
          break;
        case 'interactive':
          console.log('page interactive');
          break;
        //If page is fully loaded then attach observer mutation to the body
        case 'complete':
          clearInterval(readyStateCheckInterval);
          console.log('page complete');
          ///create MutationObserver object
          var mutationObs = new MutationObserver(function(mutations) {
            bool = true;
            //run through each mutation or change detected on the body
            mutations.forEach(function(mutation, index ,array) {
              //console.log('Mutation type: ' + mutation.type);
              //any changes with children of the targetNode
              if (mutation.type == 'childList' ) {
                //check to see if there were any insertion or deleting of content OR changes to attributes (detect loaders)
                if (mutation.addedNodes.length >= 1) {
                  log = 'Added ' + mutation.addedNodes.length + ' tag(s). Adding Merlin elements.';
                }else if (mutation.removedNodes.length >= 1) {
                  log =  'Removed ' + mutation.removedNodes.length + ' tag(s). Adding Merlin elements.';
                }
                callback(log);
              }/* Tried to add feature to detect certain display attributes
              else if(mutation.type == 'attributes'){
                  log = 'Changed ' + mutation.attributeName + ' adding Merlin elements.';
                  callback(log);
              }*/
            });//end forEach
          }); //end MutationObserver object creation
          // Listen to all changes to body and child nodes
          mutationObs.observe(targetNode, observerConfig);
          //if no changes are loading then run callback after a time out after 3 seconds
          setTimeout(function(){
            if (!bool){ callback(); }
          }, 4000);
          break;
        default:
          //fallback in case somehow the readyState isn't found run callback regardless
          callback();
          break;
      }
    }, 10); //end setInterval
}// end detectLoad

//callBack function to simply console out messages for now
function consoleLog(text){
 text = text ? text : 'add Merlin elements';
  //going to use if and else if (getting dirty)
  console.log(text);
}

//run detectLoad
detectLoad("true", consoleLog);

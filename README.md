##  Title: merlin-code-test
<strong>Author:</strong> Victor Wu <br />
<strong>Purpose:</strong> Merlin Guides auto-load dilenma using ES5 standards to create a piece of js code compatible across all browsers to detect a state of loading. Code should be given a callback, and that tries to detect for specific body element changes. If page doesn't appear to be loading, then call the callbaack, if it does then wait until it has finished (then calls it) <br />
<strong>Version:</strong> 3.0 <br />
<strong>Description:</strong> I've decided to use vanilla javascript with the use of Mutation Observers. Time was an issue trying to find a way to hack ajax using vanilla js so I figured I'd give this a shot using MutationObserver. Only working with the addition and removing of elements as of now and assumes the webpage contains a body. <br />
<strong>Browser Compabibility:</strong> https://caniuse.com/mutationobserver/embed <br />

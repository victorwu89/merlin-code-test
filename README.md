# merlin-code-test
# Author: Victor Wu
# Purpose: Merlin Guides auto-load dilenma using ES5 standards to create a piece of js code compatible across all browsers to detect a state of loading. Code should be given a callback, and that tries to detect for specific body element changes. If page doesn't appear to be loading, then call the callbaack, if it does then wait until it has finished (then calls it)
# Version: 3.0
# Description: I've decided to use vanilla javascript with the use of Mutation Observers. Time was an issue trying to find a way to hack ajax using vanilla js so I figured I'd give this a shot using MutationObserver. Only working with the addition and removing of elements as of now and assumes the webpage contains a body.
# Browser Compabibility: https://caniuse.com/mutationobserver/embed

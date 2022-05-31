/**
 * @param {string} selector The selector passed to querySelector
 * @param {string} elementSelector The selector for the element to attach the listener to
 * @param {function} callback The callback function to run
 */

 function qs(selector) {

 	let sel1 = document.querySelector(selector);
 	return sel1;


 }

 function onTouch(elementSelector, callback) {

 	document.getElementById(elementSelector).addEventListener("click", callback);

 }
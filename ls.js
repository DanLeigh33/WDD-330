/**
 * @param {string} key The key under which the value is stored under in LS
 * @param {array} data The information to be stored as an array of objects. Must be serialized.
 */

function writeToLS(key, data) {

	window.localStorage.setItem(key, JSON.stringify(data));
	
}

export { writeToLS }

function readFromLS(key) {

	let object = JSON.parse(window.localStorage.getItem(key));

	return object;

}

export { readFromLS }

function removeFromLS(key) {

	window.localStorage.removeItem(key);

}

export{ removeFromLS }
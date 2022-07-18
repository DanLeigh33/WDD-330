function writeToLS(key, data) {
	window.localStorage.setItem(key, JSON.stringify(data));
}

export { writeToLS }

function readFromLS(key) {
	let obj = JSON.parse(window.localStorage.getItem(key));
	return obj;
}

export { readFromLS }

function removeFromLS() {
	window.localStorage.clear();
}

export{ removeFromLS }
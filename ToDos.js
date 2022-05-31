let toDoList = [];

import { writeToLS } from './ls.js'
import { readFromLS } from './ls.js'
import { removeFromLS } from './ls.js'
import { qs } from './utilities.js'
import { onTouch } from './utilities.js'

export class Todos {

	constructor(key, todo) {

		this.key = key;
		this.todo = todo;

	}

	addTodo() {

		let input = document.getElementById('new-task').value;
		key = 'lsTodo';
		saveToDo(key, input);

	}

	listToDo() {

		renderToDoList(toDoList, 'ul');

	}

	completeToDo() {


	}

	removeToDo() {


	}

	filterToDos() {

		
	}


}


/*
*@param {string} key The key under which the value is stored under in LS 
*@param {string} task The text of the task to be saved
*/

function saveToDo(key, task) {

	todo = {

		id: Date.now(),
		content: task,
		completed: false
	};
	toDoList.push(nTodo);
	writeToLS(key, toDoList);
}

/*
*@param {string} key The key under which the value is stored under in LS 
*@return {array} The value as an array of objects
*/
function getToDos(key) {

	let i = 0;
	for (let x in toDoList) {
		i += 1;
	}
	if (i == 0) {

		let nArray = readFromLS(key);
		toDoList.push.apply(toDoList, nArray);
	}

}

/*
*@param {array} list The list of tasks to render to HTML 
*@param {element} element The DOM element to insert our list elements into.
*/
function renderToDoList(list, element) {

	let ul = document.getElementById(element);
/*Just in case the list needs to be cleared before it is rendered again*/	
	while (ul.hasChildNodes()) {
  		ul.removeChild(ul.firstChild);
	}

	list.forEach((r) => {
		/*creating the li*/
		let li = document.createElement('li');
		li.id = r.id;

		/*creating the checkbox*/
    	let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = r.id;
        li.appendChild(checkbox);

        /*creating the label and attaching it to the checkbox*/
        let label = document.createElement('label');
        label.for = r.id;
        let contents = r.content;
        label.appendChild(contents);
        li.appendChild(label);

        ul.appendChild(li);

	};
}
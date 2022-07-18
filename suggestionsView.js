import {readFromLS} from "./ls.js"

export default class SuggestionsView {

	constructor() {
		this.key = "lsWeather";
	}

  renderWeather() {
  	let obj = readFromLS(this.key);
  	document.querySelector(".city").innerHTML = "The weather in " + obj.cityName + ":";
  	document.querySelector(".temp").innerHTML =  obj.temperat + "°C";
  	document.querySelector(".description").innerHTML =  obj.desc;
  	document.querySelector(".humidity").innerHTML = "Humidity: " + obj.hum + "%";

  }

  renderActivities (element) {

  	function buildCard(obj) {

  		const card = document.createElement("div");
  		card.style.width = "400px";
			card.style.height = "500px";
			card.classList.add("card-tab");

			const name = document.createElement("h3");
			name.innerText = obj.name;
			card.appendChild(name);

			const desc = document.createElement("p")
			desc.innerText = obj.description;
			card.append(desc);
			return card;
  }

  	const div = document.querySelector(element);
  	let list = readFromLS("lsPref");
  	console.log(list);
  	if (list.length > 0) {
	  	list.forEach((card) => {
	    	div.appendChild(buildCard(card));
	  });
	  }

  	else {
  		const name = document.createElement("h3");
		name.innerText = "Looks like we're out of ideas!";
		div.appendChild(name);
  	}

  }

  	nextSlide(num) {
		let x = document.getElementsByClassName("tab");
		if (num == 0) {
			x[num].style.display = "block";
			x[num + 1].style.display = "none";
			x[num + 2].style.display = "none";
		}
		 else if (num == 1) {

		 	x[num].style.display = "block";
			x[num - 1].style.display = "none";
			x[num + 1].style.display = "none";

		 }
		 else if (num == 2) {
		 	x[num].style.display = "block";
			x[num - 1].style.display = "none";
			x[num - 2].style.display = "none";
			this.renderWeather();
		}
		else if (num == 3) {
		 	x[num].style.display = "block";
			x[num - 1].style.display = "none";
			x[num - 2].style.display = "none";
			x[num - 3].style.display = "none";
		}
		 }



}
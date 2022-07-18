import {writeToLS} from "./ls.js";
import {removeFromLS} from "./ls.js";

export default class Suggestions {
	constructor() {
		this.bUrl = "https://api.openweathermap.org/data/2.5/";
		this.apiKey = "fe1f037910450a03f6ae079afd64e6de";
		this.iid = null;
		this.preferenceList = [];
		this.key = "lsWeather";
		this.key2 = "lsPref";
		this.listSuggestions = [
					{
						name : "Swimming",
						description: "Looks like its a clear sunny day! Get out there and have some fun in the sun!",
						budget: "Small",
						art: "N",
						company: "Y",
						door: "Out",
						temp: "800"
					},
					{
						name : "Sketching",
						description: "Up for a sketch? You can never really go too wrong.",
						budget: "Small",
						art: "Y",
						company: "N",
						door: "In",
						temp: "Any"
					},
					{
						name : "Sketching",
						description: "Up for a sketch? Try sketch some landscapes or some outdoor scenery",
						budget: "Small",
						art: "Y",
						company: "N",
						door: "Out",
						temp: "800"
					},
					{
						name : "Walking",
						description: "Maybe a little walk would do you some good?",
						budget: "Small",
						art: "N",
						company: "N",
						door: "Out",
						temp: "800"
					},
					{
						name : "Baking",
						description: "How about baking? You can bake anything you like! Muffins, bread, biscuits, you can do it all!",
						budget: "Big",
						art: "N",
						company: "N",
						door: "In",
						temp: "Any"
					},
					{
						name : "Gardening",
						description: "Gardening? Maybe even setting up some indoor plants? Be sure to protect yourself from the sun.",
						budget: "Big",
						art: "N",
						company: "N",
						door: "Out",
						temp: "800"
					},
					{
						name : "Boardgames... Or Cards?",
						description: "A great way to spend time indoors with your friends, regardless of how the weathers going.",
						budget: "Small",
						art: "N",
						company: "Y",
						door: "In",
						temp: "Any"
					},
					{
						name : "Hiking",
						description: "Time spent in nature is time well spent!",
						budget: "Big",
						art: "N",
						company: "Y",
						door: "Out",
						temp: "800"
					},
					{
						name : "Visit Something Old",
						description: "How about a museum? A good ol' library? Some cafes that were established eons ago?",
						budget: "Small",
						art: "Y",
						company: "N",
						door: "Out",
						temp: "800"
					},
					{
						name : "Sculpting",
						description: "Might be on the pricier side but why not give it a go?",
						budget: "Big",
						art: "Y",
						company: "N",
						door: "In",
						temp: "Any"
					},
					{
						name : "Yoga",
						description: "A little exercise never did any harm! Its a wonderful way to relax too.",
						budget: "Small",
						art: "N",
						company: "N",
						door: "In",
						temp: "Any"
					},

		];
	}


	//getting inputs and pluggin them into their appropriate processing methods
	getCityName(input, button, viewButt) {

		this.fetchWeather(input, button, viewButt);

	}

	getPreferences(input){

		const pref = this.getActivities(input, this.listSuggestions);
		this.filterPreferences(pref, this.iid);
	}


	//processing methods - building the URL and the activities list
	getActivities(listP, listA, desc) {

		console.log("Initialized");
		const activities = [];
		for (let i = 0; i < listA.length; i++) {

			if (listA[i].budget == listP.budget) {

				if (listA[i].art == listP.art) {

					if (listA[i].company == listP.company){

						if (listA[i].door == listP.door) {

							let myObj = {
								name : listA[i].name,
								description : listA[i].description,
								temp : String(listA[i].temp)
							}
							activities.push(myObj);
						}
					}	
				}
			}
		}

		return activities;
	}

	filterPreferences(list, id) {

		console.log("Initializing filter");
		const filtered = [];
		if (list.length == 0) {
			return filtered;
		}
		else {
			for (let i = 0; i < list.length; i++) {
				if (list[i].temp.charAt(0) == String(id).charAt(0) || list[i].temp == "Any"){
					let myObj = {
								name : list[i].name,
								description : list[i].description,
							}

					filtered.push(myObj);

				}
			}
		}

		  writeToLS(this.key2, filtered);  

}


	fetchWeather(cityName, buttonName, viewB){
		fetch(
			this.bUrl + "weather?q=" + cityName + "&units=metric&appid=" + this.apiKey
			).then((response) => {if (response.status >= 200 && response.status <= 299) {
      			viewB.disabled = false;
      			return response.json();
    		} else {
      			throw Error(response.statusText);}
      		}).then((data) => this.getWeather(data)).catch((error) => {
    			alert(error);
    			document.getElementById("cityName").placeholder = "Couldn't find it.";
    		});

	}


	getWeather(data) {
		const { name} = data;
		const { description, id } = data.weather[0];
		const { temp, humidity } = data.main;
		this.iid = id;

		const weatherObj = {
			cityName: name,
			desc: description,
			temperat: temp,
			hum: humidity
		}

		writeToLS(this.key, weatherObj);
	}

}


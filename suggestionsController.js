import Suggestions from './suggestions.js';
import SuggestionsView from './suggestionsView.js';
import {readFromLS} from './ls.js';
import {removeFromLS} from "./ls.js";


export default class suggestionsController {
  constructor() {
    this.suggestions = new Suggestions();
    this.suggestionsView = new SuggestionsView();
  }

  init() {
    this.suggestionsView.nextSlide(0);

    }


  //sends the city name input to the model to be validated
  //changes the disabled property of corresponding buttons depending on validity results
  handleCitySubmit() {
    let item = document.getElementById("cityName").value;
    let button = document.getElementById("citySubmit");
    let viewButt = document.getElementById("pSubmit");
    this.suggestions.getCityName(item, button, viewButt);
    if (viewButt.disabled == false) {
      this.suggestionsView.nextSlide(1);
    }
     
  }

  //checks if the radio button preference input is valid before putting the values 
  //into an object and passing it into a method
  handlePreferenceSubmit() {

  //checks if input is valid
  function validateP(name, para) {
    let pref = document.getElementsByName(name);
    let prefP = ""
    if (!(pref[0].checked || pref[1].checked)){
      document.querySelector(para).innerHTML = "Looks like you missed a spot!";
    }
    else {
       prefP = document.querySelector('input[name="'+ name + '"]:checked').value;
       return prefP
    }
  }

  //assembling input into an object
  let budgetP = validateP("budget", ".bPara");
  let artP = validateP("art", ".aPara");
  let doorP = validateP("door", ".dPara");
  let companyP = validateP("company", ".cPara");
  
  const preferences = {
      budget: budgetP,
      art: artP,
      company: companyP,
      door: doorP
  };

  //continues to check validity before passing it into a method
  //enables and disables the necessary buttons 
  let count = 0;
  Object.entries(preferences).forEach(([key, value]) => {

    if (value == undefined) {
      document.getElementById("pSubmit").disabled = false;
    }
    else {
      count += 1;
    }
  });

  if (count == 4) {
    this.suggestions.getPreferences(preferences);
    document.getElementById("pSubmit").disabled = true;
    document.getElementById("nextButton").disabled = false;
    this.suggestionsView.nextSlide(2);
  }

}


}
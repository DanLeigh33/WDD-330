import suggestionsController from './suggestionsController.js';

const mySuggestionsController = new suggestionsController();
mySuggestionsController.init();


//adding events to buttons
window.onload = function() {

  document.getElementById("citySubmit").onclick = function() {
    mySuggestionsController.handleCitySubmit();
  }

  document.getElementById("pSubmit").onclick = function() {
  	mySuggestionsController.handlePreferenceSubmit();

  }

  document.getElementById("nextButton").onclick = function() {
  	mySuggestionsController.suggestionsView.nextSlide(3);
  	mySuggestionsController.suggestionsView.renderActivities("#activities");
  }

}
	







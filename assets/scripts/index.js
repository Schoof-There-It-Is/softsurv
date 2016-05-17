'use strict';

const authEvents = require('./auth/events');
const display = require('./display');
const surveyEvents = require('./surveys/events');
const urlParams = require('./url-params');
const surveyApi = require('./surveys/api');
const surveyUi = require('./surveys/ui');

// User Home Page
const userHomePage = function() {
  console.log("Loading User Home Page");
  display.renderNewSurveyForm();
  surveyEvents.addHandlers();
  surveyEvents.refreshSurveys();
};

// Welcome/Sign In Page
const welcomePage = function() {
  console.log("Loading Welcome Page");

  display.clearContent();
  $('body').addClass('main-background');

	display.renderModal();
  authEvents.addHandlers(userHomePage);
};

// Survey Response Thank You
const responseThankYouPage = function() {
  console.log("Loading Thank You Page");
};

// Survey Response Page
const surveyResponsePage = function(surveyId) {
  console.log("Loading Survey Response Page");
  surveyApi.showSurvey([surveyUi.showSurveySuccess, surveyEvents.addResponseHandlers], surveyUi.failure, surveyId);
};

$(() => {
  let params = urlParams.getUrlParams();

  if (params && params.id) {
    surveyResponsePage(params.id);
  } else {
    welcomePage();
  }
});

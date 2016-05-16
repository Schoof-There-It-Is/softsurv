'use strict';
const app = require('../app-data');
const display = require('../display');
const surveyApi = require('./api');
const getFormFields = require('../../../lib/get-form-fields');
const urlParams = require('../url-params');
// Require app-data so that user/state info can be updated.

// Set of functions to call on success/failure of AJAX requests.

// getUserSurveys success function
const getSurveysSuccess = function(data) {
  console.log("Surveys Loaded!");
  app.surveys = data.surveys;
  display.showAllUserSurveys(app.surveys);
  console.log(data);
  console.log(app);
  $('.delete-survey').on('click', function (event) {
    event.preventDefault();
    console.log('survey delete requested');
    let targetId = $(this).data("target");
    surveyApi.deleteSurvey(success, failure, targetId);
  });

};

// answerSurvey success function
const respondSurveySuccess = function() {
  console.log('response success');

};

// showSurvey success function
const showSurveySuccess = function(data) {
  console.log("Survey Got!");
  console.log(data);
  display.renderSurveyResponseForm({survey : data});
  $('.survey-response-form').on('submit', function(event){
    event.preventDefault();
    let id = urlParams.getUrlParams().id;
    let data = getFormFields(this);
    console.log(data);
    surveyApi.respondSurvey(respondSurveySuccess, failure, id, data);
  });
};

// createSurvey success function
const createSurveySuccess = function(data) {
  console.log("Survey Created!");
  console.log(data);
};

// deleteSurvey success function

// General Success and Failure Functions
const success = function(data) {
  console.log(data);
};

const failure = function(error) {
  console.error(error);
};

// Export functions as module
module.exports = {
  failure,
  success,
  createSurveySuccess,
  getSurveysSuccess,
  showSurveySuccess,
  respondSurveySuccess,
};

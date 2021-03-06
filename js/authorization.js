// Client ID and API key from the Developer Console
var CLIENT_ID = '352647482546-rkkt3jikdurpr70pr17dsl2fun9j2bf0.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD9V7BVzpm0jPTr2cllYIdE623faoCiE9w';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    if(!gapi.auth2.getAuthInstance().isSignedIn.get()){
      gapi.auth2.getAuthInstance().signIn();
    }
    // only for test purposes
    /*authorizeButton.style.display = 'none';
    signoutButton.style.display = 'none';*/
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
    //
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';

    clearNode("la-members")
    readData('Lasičky!A2:J14', "la");

    clearNode("je-members")
    readData('Ještěrky!A2:J8', "je");

    clearNode("ka-members")
    readData('Káňata!A2:J11', "ka");

    clearNode("li-members")
    readData('Lišáci!A2:J8', "li");

  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

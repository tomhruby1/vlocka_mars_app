
const max_score = 150;

function addMember(id, row){
    var members = document.getElementById(id);
    var score = 0;
    for (let i = 1; i < row.length; i++) {
        score += parseInt(row[i]);
    }
    members.innerHTML = members.innerHTML + 
    "<li><b>" + row[0] + "</b>: Hodnocení:  " + score + 
    "<div class=\"progress w-25 \" style=\"height: 5px;\">" +
        "<div class=\"progress-bar\" " + 
              "role=\"progressbar\" " +
              "style=\"width:" + score/max_score * 100 + "%\" " + 
              "aria-valuenow=\"" + score + "\" " + 
              "aria-valuemin=\"0\" " + 
              "aria-valuemax=\"" + max_score + "\">" +
        "</div>" +
    "</div></li>"
}

function teamScore(id, range){
    var score = 0;
    var team_max_score = max_score * range.values.length;

    for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];

        for (let i = 1; i < row.length; i++) {
            score += parseInt(row[i]);
        }
    }
    var teamSc = document.getElementById(id);
    teamSc.setAttribute("aria-valuenow", score);
    teamSc.setAttribute("aria-valuemax", team_max_score);
    teamSc.setAttribute("style", "width:" + score/team_max_score * 100 + "%;"); 
    teamSc.innerHTML = Math.round(score/team_max_score * 100) + "%";

}

function clearNode(id){
     node = document.getElementById(id);
     node.innerHTML = '';
 }

function readData(range, druzina) {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1jkYhI56T6Bn7BYlXIEwZCZ2ue-oewsJTj2sgMrBvC6w',
      range: range,
    }).then(function(response) {
      var range = response.result;
      teamScore(druzina + "-team-score", range);
      teamScore(druzina + "-team-score2", range);
      if (range.values.length > 0) {
        for (i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          addMember(druzina + "-members", row);
        }
      } else {
        appendPre('No data found.');
      }
    }, function(response) {
      appendPre('Error: ' + response.result.error.message);
    });
  }
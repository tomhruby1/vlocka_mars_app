
var max_score = 0;
var max_dovednosti = 0;
var max_stezka = 0;
var max_odborky = 0;

function addMember(id, row, no){
    var members = document.getElementById(id);
    var celkem = 0;
    var dovednosti = 0;
    var stezka = parseInt(row[1]);
    var odborky = parseInt(row[2]);

    
    for (let i = 3; i < row.length; i++) {
      dovednosti += parseInt(row[i]);
    }
    celkem = dovednosti + stezka + odborky;
    /*
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
    */
    
    members.innerHTML +=  "<table class=\"table table-bordered w-75 border border-5\">"+
    "<tr>"+
    `<th rowspan="4" class="w-25 align-bottom"><img src="assets/avatars/${row[0]}.png"></th>`+
    "<th class=\"border-0\">#" + no + " " + row[0] + "</th>"+
    "<th colspan=\"2\" class=\"border-0\">"+
    "<div class=\"progress\">"+
    `<div class=\"progress-bar" role="progressbar" style="width: ${celkem/max_score * 100 }%" aria-valuenow="${celkem}" aria-valuemin="0" aria-valuemax="${max_score}">${Math.round(celkem/max_score * 100 )}%</div>`+
    "</div>"+
    "</th>"+
    "</tr>"+
    "<tr>"+
    "<td class=\"w-25\">Dovednosti: </td>"+
    `<td class="w-25"><center>${dovednosti}</center></td>`+
    "<td>"+
    "<div class=\"progress\">"+
    `<div class=\"progress-bar" role="progressbar" style="width: ${dovednosti/max_dovednosti * 100 }%" aria-valuenow="${dovednosti}" aria-valuemin="0" aria-valuemax="${max_dovednosti}">${Math.round(dovednosti/max_dovednosti * 100 )}%</div>`+
    "</div>"+
    "</td>"+
    "</tr>"+

    "<tr>"+
    "<td>Stezka: </td>"+
    `<td class=\"w-25\"><center>${stezka}</center></td>`+
    "<td>"+
    "<div class=\"progress\">"+
    `<div class=\"progress-bar" role="progressbar" style="width: ${stezka/max_stezka * 100 }%" aria-valuenow="${stezka}" aria-valuemin="0" aria-valuemax="${max_stezka}">${Math.round(stezka/max_stezka * 100 )}%</div>`+
    "</div>"+
    "</td>"+
    "</tr>"+

    "<tr> <td>Odborky: </td>"+
    `<td class=\"w-25\"><center>${odborky}</center></td>`+
    "<td>"+
    "<div class=\"progress\">"+
    `<div class=\"progress-bar" role="progressbar" style="width: ${odborky/max_odborky * 100 }%" aria-valuenow="${odborky}" aria-valuemin="0" aria-valuemax="${max_odborky}">${Math.round(odborky/max_odborky * 100 )}%</div>`+
    "</div>"+
    "</td>"+
    "</tr>"+

    "</table>"
}

function teamScore(id, range){
    var score = 0;
    var team_max_score = max_score * (range.values.length-1);

    for (i = 0; i < range.values.length-1; i++) {
        var row = range.values[i];

        for (let j = 1; j < row.length; j++) {
            score += parseInt(row[j]);
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
      
      if (range.values.length > 0) {

        
        max_score = 0;
        var last_row = range.values[range.values.length - 1]
        for (let i = 1; i < last_row.length; i++) {
          max_score += parseInt(last_row[i]);
        }
        max_stezka = parseInt(last_row[1]);
        max_odborky = parseInt(last_row[2]);
        max_dovednosti = max_score-max_stezka-max_odborky;


        teamScore(druzina + "-team-score", range);
        teamScore(druzina + "-team-score2", range);
        for (i = 0; i < range.values.length-1; i++) {
          var row = range.values[i];
          addMember(druzina + "-members", row, i+1);
        }
        

      } else {
        appendPre('No data found.');
      }
    }, function(response) {
      appendPre('Error: ' + response.result.error.message);
    });
  }
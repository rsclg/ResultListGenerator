var actCompetitionId = 0;
var errorCount = 0;

function getXML() {
	var resultXML = '';
	
	resultXML += getXMLRow('	<paragraph>');
	resultXML += getXMLRow('		<title>' + parseFieldValue(document.getElementById("dateDay"), true) + '.' + parseFieldValue(document.getElementById("dateMonth"), true) + '.' + parseFieldValue(document.getElementById("dateYear"), true) + ' : ' + parseTextFieldValue(document.getElementById("competition")) + '</title>');
	resultXML += getXMLRow('		<text><![CDATA[');
	resultXML += getCompetitions();
	resultXML += getXMLRow('		]]></text>');
	resultXML += getXMLRow('	</paragraph>');
	
	return resultXML;
}

function generateXML() {
	errorCount = 0;
	document.getElementById("resultXML").value = getXML();
}

function generateHTML() {
	errorCount = 0;
	document.getElementById("resultHTML").innerHTML = getCompetitions();
}

function sendResults()
{
	var xml = getXML();
	
	if (errorCount > 0) {
		showErrorMsg();
	}
	else
	{
		var name = prompt("Bitte gib deinen Namen ein.", "");
		if (name != null) {
			if (name.length > 0) {
				var params = new Array();
				params.push(["1_Name", name]);
				params.push(["2_XML", "\n\n" + xml]);
				
				doAjaxRequest("php/formmailer.php", params, function handleAjax(){resultsSendHandler()});
			}
			else {
				alert("Sie haben keinen Namen eingegeben. Die Ergebnisse wurden nicht �bertragen.");
			}
		}
	}
}

function showErrorMsg() {
	if (errorCount > 0) {
		alert("Es wurden " + errorCount + " fehlende oder fehlerhafte Eingaben gefunden.\nBitte korrigieren bzw. erg�nzen Sie diese Felder!");
	}

}

function getCompetitions() {
	var result = '';
	
	for (var a = 0; a < document.getElementById("competitions").getElementsByTagName("table").length; a++) {
		var actId = document.getElementById("competitions").getElementsByTagName("table")[a].id;
	
		if (a > 0) {
			result += getXMLRow('		<br/><br/>');
		}
	
		result += getXMLRow('		<table class="resultTable" border="0" cellpadding="5" cellspacing="0" width="100%">');
		result += getXMLRow('			<thead>');
		result += getXMLRow('				<tr style="font-size: 1.1em; text-align: center;">');
		result += getXMLRow('					<td colspan="5" style="border-bottom: 1px solid #000000;">' + parseTextFieldValue(document.getElementById("competition_" + actId + "_title")) + '</td>');
		result += getXMLRow('				</tr>');
		result += getXMLRow('				<tr>');
		result += getXMLRow('					<td style="border-bottom: 1px solid #000000;">Teilnehmer</td>');
		result += getXMLRow('					<td style="border-bottom: 1px solid #000000;" width="20%">Zeit</td>');
		
		if (document.getElementById("competition_" + actId + "_placingAgeGroup").checked) {
			result += getXMLRow('					<td style="border-bottom: 1px solid #000000;" width="20%">Platz Gesamt (M/W)</td>');
			result += getXMLRow('					<td style="border-bottom: 1px solid #000000;" width="20%">Platz Altersklasse</td>');
		} else {
			result += getXMLRow('					<td style="border-bottom: 1px solid #000000;" width="40%">Platz Gesamt (M/W)</td>');
		
		}
		
		result += getXMLRow('				</tr>');
		result += getXMLRow('			</thead>');
		result += getXMLRow('			<tbody>');
		
		var actNode = document.getElementById("competition_" + actId + "_tbody").firstChild.nextSibling;
		var womenFinished = false;
		var womanAdded = false;
		var manAdded = false;
		while (actNode != null) {
			if (actNode.nodeType == 1) {
				if (actNode.id == "competition_" + actId + "_tr_men") {
					womenFinished = true;
				} else if (actNode.getElementsByTagName("select")[0].selectedIndex  > 0) {
					if (!womenFinished) {
						if(!womanAdded && actNode.getElementsByTagName("select")[0].selectedIndex  > 0) {
							result += getXMLRow('				<tr>');
							result += getXMLRow('					<td colspan="5" style="font-style: italic;">Frauen</a></td>');
							result += getXMLRow('				</tr>');
							womanAdded = true;
						}
					}
					else {
						if(!manAdded && actNode.getElementsByTagName("select")[0].selectedIndex  > 0) {
							result += getXMLRow('				<tr>');
							result += getXMLRow('					<td colspan="5" style="font-style: italic;">M�nner</a></td>');
							result += getXMLRow('				</tr>');
							manAdded = true;
						}
					
					}
					
					var timeHours = parseFieldValue(actNode.getElementsByTagName("input")[0], true);
					var timeMinutes = parseFieldValue(actNode.getElementsByTagName("input")[1], true);
					var timeSeconds = parseFieldValue(actNode.getElementsByTagName("input")[2], true);
					
					// add member
					result += getXMLRow('				<tr>');
					result += getXMLRow('					<td class="member">' + actNode.getElementsByTagName("select")[0].options[actNode.getElementsByTagName("select")[0].selectedIndex].value + '</td>');
					if ((parseInt(timeHours, 10) + parseInt(timeMinutes, 10) + parseInt(timeSeconds, 10)) == 0) {
						result += getXMLRow('					<td colspan="4">DNF (Did not finish)</td>');
					}
					else {
						var placingOverall = parseFieldValue(actNode.getElementsByTagName("input")[3], false);
						var placingOverallTotal = parseFieldValue(actNode.getElementsByTagName("input")[4], false);
						var medalOverall = getMedalString(placingOverall, true);

						result += getXMLRow('					<td>' + timeHours + ':' + timeMinutes + ':' + timeSeconds + ' h</td>');
						result += getXMLRow('					<td>' + placingOverall + './' + placingOverallTotal + medalOverall + '</td>');
						if (document.getElementById("competition_" + actId + "_placingAgeGroup").checked) {
							var placingAgeGroup = parseFieldValue(actNode.getElementsByTagName("input")[5], false);
							var placingAgeGroupTotal = parseFieldValue(actNode.getElementsByTagName("input")[6], false);
							var medalAgeGroup = getMedalString(placingAgeGroup, false);
							result += getXMLRow('					<td>' + placingAgeGroup + './' + placingAgeGroupTotal + medalAgeGroup + '</td>');
						}
					}
					result += getXMLRow('				</tr>');
				}
			}
			actNode = actNode.nextSibling;
		}
		
		
		result += getXMLRow('			</tbody>');
		result += getXMLRow('		</table>');
	}
	
	return result;
}

function parseFieldValue (field, addLeadingZeros) {
	var value = parseInt(field.value, 10);
	
	if (isNaN(value)) {
		errorCount++;
		return "<span style='color: red; font-weight: bold;'>???</span>"
	}
	else {
		if (addLeadingZeros) {
			var maxLength = field.maxLength;
			while ((value + "").length < maxLength) {
				value = "0" + value;
			}
		}
		return value;
	}
}

function parseTextFieldValue (field) {
	var value = field.value;
	
	if (value == null || value.length < 1) {
		errorCount++;
		return "<span style='color: red; font-weight: bold;'>???</span>"
	}
	else {
		return value;
	}
}

function getXMLRow(row) {
	return row + '\n';
}

// Adding and deleting competitions
function addCompetition() {
	var nextId = actCompetitionId++;
	
	var table = document.createElement("table");
	table.className = "inputTable";
	table.id = nextId;
	table.border = "0";
	table.cellPadding = "5";
	table.cellSpacing = "0";
	table.width = "100%";
	
	var thead = document.createElement("thead");
	
	var row = document.createElement("tr");
	row.style.fontSize = "1.1em";
	row.style.textAlign = "center";
	
	var col = document.createElement("td");
	col.colSpan = "5";
	col.style.borderBottom = "1px solid #000000";
	
	var input = document.createElement("input");
	input.title = "Name des Wettbewerbs";
	input.id = "competition_" + nextId + "_title";
	input.type = "text";
	input.size = "50";
	input.style.textAlign = "center";
	input.style.fontWeight = "bold";
	col.appendChild(input);
	
	col.appendChild(document.createTextNode("\u00A0"));

	var button = document.createElement("button");
	button.onclick = function () {moveCompetitionUp(this);};
	button.title = "Wettbewerb nach oben verschieben";
	button.appendChild(document.createTextNode("\u2191"));
	button.tabIndex="-1";
	button.className="moveBtn";
	col.appendChild(button);
	
	col.appendChild(document.createTextNode("\u00A0"));
	
	button = document.createElement("button");
	button.onclick = function () {moveCompetitionDown(this);};
	button.title = "Wettbewerb nach unten verschieben";
	button.appendChild(document.createTextNode("\u2193"));
	button.tabIndex="-1";
	button.className="moveBtn";
	col.appendChild(button);
	
	col.appendChild(document.createTextNode("\u00A0"));
	
	var competitionMasterSelect = document.createElement("select");
	competitionMasterSelect.title = "Vorlagenauswahl f�r den Wettbewerbsnamen, kann dann noch angepasst werden";
	competitionMasterSelect.onchange = function () {document.getElementById("competition_" + nextId + "_title").value = this.options[this.selectedIndex].value};
	addCompetitionMasterValues(competitionMasterSelect);
	col.appendChild(competitionMasterSelect);
	
	row.appendChild(col);
	thead.appendChild(row);
	
	row = document.createElement("tr");
	
	col = document.createElement("td");
	col.style.borderBottom = "1px solid #000000";
	col.appendChild(document.createTextNode("Teilnehmer"));
	row.appendChild(col);
	
	col = document.createElement("td");
	col.width = "20%";
	col.style.borderBottom = "1px solid #000000";
	col.appendChild(document.createTextNode("Zeit"));
	row.appendChild(col);
	
	col = document.createElement("td");
	col.width = "20%";
	col.style.borderBottom = "1px solid #000000";
	col.appendChild(document.createTextNode("Platz Gesamt (M/W)"));
	row.appendChild(col);
	
	col = document.createElement("td");
	col.width = "20%";
	col.style.borderBottom = "1px solid #000000";
	col.appendChild(document.createTextNode("Platz Altersklasse "));
	
	var checkBox = document.createElement("input");
	checkBox.title = "Angabe der Altersklassenwertung: Falls keine Altersklassenwertung existiert bitte hier deselektiert.";
	checkBox.type = "checkbox";
	checkBox.id = "competition_" + nextId + "_placingAgeGroup";
	col.appendChild(checkBox);
	
	row.appendChild(col);
	
	thead.appendChild(row);
	
	table.appendChild(thead);
	
	var tbody = document.createElement("tbody");
	tbody.id = "competition_" + nextId + "_tbody";
	
	row = document.createElement("tr");
	
	col = document.createElement("td");
	col.colSpan = "5";
	col.style.fontStyle = "italic";
	
	var span = document.createElement("div");
	span.appendChild(document.createTextNode("Frauen"));
	
	col.appendChild(span);
	
	var link = document.createElement("a");
	link.href = "javascript:addWomanRow('competition_" + nextId + "_tbody', 'competition_" + nextId + "_tr_men');";
	link.className = "add";
	link.title = "Frau hinzuf�gen";
	link.appendChild(document.createTextNode("+"));
	col.appendChild(link);
				
	col.appendChild(document.createTextNode(" "));
	
	link = document.createElement("a");
	link.href = "javascript:delWomanRow('competition_" + nextId + "_tbody', 'competition_" + nextId + "_tr_men');";
	link.className = "del";
	link.title = "Letzte Frau l�schen";
	link.appendChild(document.createTextNode("X"));
	col.appendChild(link);
	
	row.appendChild(col);
	tbody.appendChild(row);
	
	row = document.createElement("tr");
	row.id = "competition_" + nextId + "_tr_men";
	col = document.createElement("td");
	col.colSpan = "5";
	col.style.fontStyle = "italic";
	
	var span = document.createElement("div");
	span.appendChild(document.createTextNode("M�nner"));
	
	col.appendChild(span);
	
	link = document.createElement("a");
	link.href = "javascript:addManRow('competition_" + nextId + "_tbody');";
	link.className = "add";
	link.title = "Mann hinzuf�gen";
	link.appendChild(document.createTextNode("+"));
	col.appendChild(link);
				
	col.appendChild(document.createTextNode(" "));
	
	link = document.createElement("a");
	link.href = "javascript:delManRow('competition_" + nextId + "_tbody');";
	link.className = "del";
	link.title = "Letzten Mann l�schen";
	link.appendChild(document.createTextNode("X"));
	col.appendChild(link);
	
	row.appendChild(col);
	tbody.appendChild(row);
	
	table.appendChild(tbody);
		
	document.getElementById("competitions").appendChild(table);
	
	document.getElementById("competition_" + nextId + "_placingAgeGroup").checked = true;
}

function delCompetition() {
	var nodeToDelete = document.getElementById("competitions").lastChild;
	if (nodeToDelete.nodeType == 1 && nodeToDelete.nodeName == "TABLE") {
		document.getElementById("competitions").removeChild(nodeToDelete);
	}
}

// Adding and deleting women rows
function addWomanRow(tbodyId, trId) {
	document.getElementById(tbodyId).insertBefore(getRow(women), document.getElementById(trId));
	focusActMemberSelect();
}

function delWomanRow(tbodyId, trId) {
	var nodeToDelete = document.getElementById(trId).previousSibling;
	if (nodeToDelete.firstChild.firstChild.firstChild.nodeType == 1) {
		document.getElementById(tbodyId).removeChild(nodeToDelete);
	}
}

// Adding and deleting men rows
function addManRow(tbodyId) {
	document.getElementById(tbodyId).appendChild(getRow(men));
	focusActMemberSelect();
}

function delManRow(tbodyId) {
	var nodeToDelete = document.getElementById(tbodyId).lastChild;
	if (nodeToDelete.firstChild.firstChild.firstChild.nodeType == 1) {
		document.getElementById(tbodyId).removeChild(nodeToDelete);
	}
}

// Create new row
function getRow(array) {
	var row = document.createElement("tr");
	row.className="member";
	
	var col = document.createElement("td");
	col.className="member";
	col.appendChild(getMemberSelectBox(array));
	
	col.appendChild(document.createTextNode("\u00A0"));

	var button = document.createElement("button");
	button.onclick = function () {moveRowUp(this);};
	button.title = "Zeile nach oben verschieben";
	button.appendChild(document.createTextNode("\u2191"));
	button.tabIndex="-1";
	button.className="moveBtn";
	col.appendChild(button);
	
	col.appendChild(document.createTextNode("\u00A0"));
	
	button = document.createElement("button");
	button.onclick = function () {moveRowDown(this);};
	button.title = "Zeile nach unten verschieben";
	button.appendChild(document.createTextNode("\u2193"));
	button.tabIndex="-1";
	button.className="moveBtn";
	col.appendChild(button);
	
	row.appendChild(col);
	
	col = document.createElement("td");
	col.appendChild(getSmallInput(2, "Gesamtzeit: Stunden"));
	col.appendChild(document.createTextNode(":"));
	col.appendChild(getSmallInput(2, "Gesamtzeit: Minuten"));
	col.appendChild(document.createTextNode(":"));
	col.appendChild(getSmallInput(2, "Gesamtzeit: Sekunden"));
	col.appendChild(document.createTextNode(" h"));
	row.appendChild(col);

	col = document.createElement("td");
	col.appendChild(getSmallInput(null, "Platzierung im Gesamtklassement pro Geschlecht"));
	col.appendChild(getDotSlash());
	col.appendChild(getSmallInput(null, "Gesamtzahl Teilnehmer im Gesamtklassement pro Geschlecht"));
	row.appendChild(col);

	col = document.createElement("td");
	col.appendChild(getSmallInput(null, "Platzierung in der Altersklasse"));
	col.appendChild(getDotSlash());
	col.appendChild(getSmallInput(null, "Gesamtzahl Teilnehmer in der Altersklasse"));
	row.appendChild(col);

	return row;
}

// Create row elements
function getSmallInput(maxlength, title) {
	var input = document.createElement("input");
	input.type = "text";
	input.className = "small";
	input.title = title;
	if (maxlength != null) {
		input.maxLength = maxlength;
	}
	return input;
}

function getDotSlash() {
	return document.createTextNode("./");
}

function getMedalString(placing, overallPlacing) {
	var titlePart = "Gesamtplatz";
	var medalType = "trophy";
	if (!overallPlacing) {
		titlePart = "Altersklassenplatz";
		medalType = "medal";
	}
	
	switch (placing) {
		case 1 : return ' <img src="pics/results/' + medalType + '_gold.png" title="1. ' + titlePart + '"/>';
		case 2 : return ' <img src="pics/results/' + medalType + '_silver.png" title="2. ' + titlePart + '"/>';
		case 3 : return ' <img src="pics/results/' + medalType + '_bronze.png" title="3. ' + titlePart + '"/>';
		default : return '';
	}
}

function moveRowUp(srcButton) {
	var actRow = srcButton.parentNode.parentNode;
	var previousRow = actRow.previousSibling;
	var tbody = actRow.parentNode;
	if (previousRow.firstChild.colSpan != 5) {
		tbody.removeChild(actRow);
		tbody.insertBefore(actRow, previousRow);
	}
}

function moveRowDown(srcButton) {
	var actRow = srcButton.parentNode.parentNode;
	var nextRow = actRow.nextSibling;
	var tbody = actRow.parentNode;
	if (nextRow != null && nextRow.firstChild.colSpan != 5) {
		tbody.removeChild(actRow);
		if (nextRow.nextSibling == null) {
			tbody.appendChild(actRow);
		} else {
			tbody.insertBefore(actRow, nextRow.nextSibling);
		}
	}
}

function moveCompetitionUp(srcButton) {
	var actTable = srcButton.parentNode.parentNode.parentNode.parentNode;
	var previousElement = actTable.previousSibling;
	if (previousElement.nodeName != "LEGEND") {
		document.getElementById("competitions").removeChild(actTable);
		document.getElementById("competitions").insertBefore(actTable, previousElement);
	}
}

function moveCompetitionDown(srcButton) {
	var actTable = srcButton.parentNode.parentNode.parentNode.parentNode;
	var nextTable = actTable.nextSibling;
	if (nextTable != null) {
		document.getElementById("competitions").removeChild(actTable);
		if (nextTable.nextSibling == null) {
			document.getElementById("competitions").appendChild(actTable);
		} else {
			document.getElementById("competitions").insertBefore(actTable, nextTable.nextSibling);
		}
		
	}
}

function addCompetitionMasterValues (select) {
	var optGroup = document.createElement("optgroup");
	optGroup.label = "Vorlagenauswahl ..."
	
	for (var i = 0; i < competitionMasters.length; i++) {
		var option = document.createElement("option");
		option.value = competitionMasters[i];
		option.appendChild(document.createTextNode(competitionMasters[i]));
		
		optGroup.appendChild(option);
	}
	
	select.appendChild(optGroup);
}

var competitionMasters = new Array("",
"SD (0,5 km - 20 km - 5 km)",
"OD (1,5 km - 40 km - 10 km)",
"MD (2 km - 80 km - 20 km)",
"IM 70.3 (1,9 km - 90 km - 21,1 km)",
"MD (1,9 km - 90 km - 21,1 km)",
"IM (3,8 km - 180 km - 42,2 km)",
"LD (3,8 km - 180 km - 42,2 km)",
"Halbmarathon",
"Marathon",
"24-Stunden-Schwimmen");

function getMemberSelectBox(array) {
	var select = document.createElement("select");
	select.title = "Auswahl der Starter";
	var option = null;
	for (var i = 0; i < array.length; i++) {
		option = document.createElement("option");
		option.value = array[i];
		option.appendChild(document.createTextNode(array[i]));
		select.appendChild(option);
	}
	actMemberSelect = select;
	return select;
}

var actMemberSelect = null;

function focusActMemberSelect () {
	if (actMemberSelect != null) {
		actMemberSelect.focus();
		actMemberSelect = null;
	}
}

/**
 * -------------------------------------
 * Adding Ajax
 * -------------------------------------
 */
var browserUrl = String(window.location);
var baseUrl = browserUrl.substring(0, browserUrl.indexOf(".de") + 3) + "/";
 
function doAjaxRequest(url, params, handlerFunction)
{
	try
	{
		req = new XMLHttpRequest();
	}
	catch (e)
	{
		try
		{
			req = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (failed)
			{
				req = null;
			}
		}
	}

	if (req == null)
	{
		showErrorMessage("Error creating request object!");
	}
	
	var paramString = "";
	
	if (params != null && params.length > 0)
	{
		for (var i = 0; i < params.length; i++)
		{
			paramString += encodeParam(params[i][0]);
			paramString += "="
			paramString += encodeParam(params[i][1]);
			
			if (i < (params.length - 1))
			{
				paramString += "&";
			}
		}
	}
	
	req.open("POST", baseUrl + url, true);

	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", paramString.length);
	req.setRequestHeader("Connection", "close");
	
	req.onreadystatechange = handlerFunction;
	
	req.send(paramString);

}

// private method for UTF-8 encoding
function encodeParam (param)
{
	var string = String(param);
	string = escape(string);
	string = string.replace(/\+/g, encodeURIComponent("+"));
	return string;
}

/**
 * Handler message if results where send
 */
function resultsSendHandler ()
{
	switch(req.readyState)
	{
		case 4:
			if(req.status!=200)
			{
				alert("Beim Senden der Ergebnisse ist ein Fehler entstanden.\nBitte versuchen Sie es ein weiteres Mal oder versenden das generierte XML mit ihrem Email-Programm.\n(Request-Status: " + req.status + "; Request-Statustext: " + req.statusText + ")");
			}
			else
			{
				alert("Die Ergebnisse wurden erfolgreich gesendet.");
			}
			break;
		default: return false; break;
	}
}

function enlarge(id) {
	var element = document.getElementById(id);
	element.style.width = "800px";
	element.style.height = "600px";
	element.style.position = "absolute";
	element.style.top = "50px";
	element.style.left = "50px";
	element.style.backgroundColor = "#ffffff";

}
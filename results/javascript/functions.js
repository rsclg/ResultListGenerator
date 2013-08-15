// Select Box for Women
var eventTypes = new Array("",
"Schwimm-Event",
"Radfahr-Event",
"Lauf-Event",
"Duathlon",
"Triathlon",
"Sonstiges");

var actCompetitionId = 0;
var errorCount = 0;

function getXML() {
	
	var competitions = getCompetitions();
	if (competitions == null || competitions.length < 1) {
		return "";
	}
	
	var resultXML = '';
	
	resultXML += getXMLRow('	<paragraph>');
	resultXML += getXMLRow('		<title>' + parseFieldValue(document.getElementById("dateDay"), true) + '.' + parseFieldValue(document.getElementById("dateMonth"), true) + '.' + parseFieldValue(document.getElementById("dateYear"), true) + ' : ' + parseTextFieldValue(document.getElementById("competition")) + '</title>');
	resultXML += getXMLRow('		<text><![CDATA[');
	resultXML += competitions;
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

function reportResults()
{
	errorCount = 0;
	var xml = getXML();
	
	if (errorCount > 0) {
		showErrorMsg();
	}
	else if (xml != null && xml.length > 0)
	{
		if (document.getElementById("sendDialog") == null) {
			var dialog = document.createElement("div");
			dialog.id = "sendDialog";
			dialog.style.width = "340px";
			dialog.style.height = "380px";
			dialog.style.left = "50%";
			dialog.style.marginLeft = "-150px";
			dialog.style.position = "absolute";
			dialog.style.top = "150px";
			dialog.style.zIndex = "10";
			dialog.style.border = "2px solid #000000";
			dialog.style.background = "#ffffff";
			dialog.style.padding = "5px";
			
			var headline = document.createElement("div");
			headline.style.fontSize = "12px";
			headline.style.fontWeight = "bold";
			headline.appendChild(document.createTextNode("Ergebnisse melden"));
			dialog.appendChild(headline);

			var input = document.createElement("div");
			input.style.height = "320px";
			input.style.marginTop = "10px";
			input.style.marginBottom = "10px";
			
			{
				var userLabel = document.createElement("div");
				userLabel.style.fontStyle = "italic";
				userLabel.innerHTML = "Name<span class=\"mandatory\" title=\"Pflichtfeld: Bitte einen Eintrag aus der Liste auswählen.\">*</span>";
				input.appendChild(userLabel);

				var allUser = women.slice();
				allUser.reverse();
				allUser.pop();
				allUser = allUser.concat(men);
				allUser.sort();

				var userSelect = document.createElement("select");
				userSelect.id = "userSelect";
				for (var i = 0; i < allUser.length; i++) {
					var userOption = document.createElement("option");
					userOption.value = allUser[i];
					userOption.appendChild(document.createTextNode(allUser[i]));
					userSelect.appendChild(userOption);
				}
				input.appendChild(userSelect);
				
				var eventTypeLabel = document.createElement("div");
				eventTypeLabel.style.fontStyle = "italic";
				eventTypeLabel.style.paddingTop = "10px";
				eventTypeLabel.innerHTML = "Veranstaltungsart<span class=\"mandatory\" title=\"Pflichtfeld: Bitte einen Eintrag aus der Liste auswählen.\">*</span>";
				input.appendChild(eventTypeLabel);

				var eventTypeSelect = document.createElement("select");
				eventTypeSelect.id = "eventTypeSelect";
				for (var i = 0; i < eventTypes.length; i++) {
					var eventTypeOption = document.createElement("option");
					eventTypeOption.value = eventTypes[i];
					eventTypeOption.appendChild(document.createTextNode(eventTypes[i]));
					eventTypeSelect.appendChild(eventTypeOption);
				}
				input.appendChild(eventTypeSelect);

				var commentLabel = document.createElement("div");
				commentLabel.style.fontStyle = "italic";
				commentLabel.style.paddingTop = "10px";
				commentLabel.appendChild(document.createTextNode("Kommentar"));
				input.appendChild(commentLabel);

				var commentTextarea = document.createElement("textarea");
				commentTextarea.id = "commentTextarea";
				commentTextarea.style.width = "340px";
				commentTextarea.style.height = "100px";
				input.appendChild(commentTextarea);

				var completenessLabelGeneral = document.createElement("div");
				completenessLabelGeneral.setAttribute("class", "completeness");
				{
					var completenessCheckboxGeneral = document.createElement("input");
					completenessCheckboxGeneral.type = "checkbox";
					completenessCheckboxGeneral.id = "completenessCheckboxGeneral";
					completenessCheckboxGeneral.setAttribute("class", "completeness");
					completenessLabelGeneral.appendChild(completenessCheckboxGeneral);
					
					var completenessTextGeneral = document.createElement("label");
					completenessTextGeneral.setAttribute("for", "completenessCheckboxGeneral");
					completenessTextGeneral.setAttribute("class", "completeness");
					completenessTextGeneral.innerHTML = "Ja, die Ergebnismeldung ist vollständig.<span class=\"mandatory\" title=\"Pflichtfeld: Bitte bestätigen.\">*</span>";
					completenessLabelGeneral.appendChild(completenessTextGeneral);
				}
				input.appendChild(completenessLabelGeneral);
				
				var completenessLabelCompetitions = document.createElement("div");
				completenessLabelCompetitions.setAttribute("class", "completeness");
				{
					var completenessCheckboxCompetitions = document.createElement("input");
					completenessCheckboxCompetitions.type = "checkbox";
					completenessCheckboxCompetitions.id = "completenessCheckboxCompetitions";
					completenessCheckboxCompetitions.setAttribute("class", "completeness");
					completenessLabelCompetitions.appendChild(completenessCheckboxCompetitions);
					
					var completenessTextCompetitions = document.createElement("label");
					completenessTextCompetitions.setAttribute("for", "completenessCheckboxCompetitions");
					completenessTextCompetitions.setAttribute("class", "completeness");
					completenessTextCompetitions.innerHTML = "Ja, ich habe <u>alle</u> Wettbewerbe, die stattgefunden haben, eingetragen.<span class=\"mandatory\" title=\"Pflichtfeld: Bitte bestätigen.\">*</span>";
					completenessLabelCompetitions.appendChild(completenessTextCompetitions);
				}
				input.appendChild(completenessLabelCompetitions);
				
				var completenessLabelMembers = document.createElement("div");
				completenessLabelMembers.setAttribute("class", "completeness");
				{
					var completenessCheckboxMembers = document.createElement("input");
					completenessCheckboxMembers.type = "checkbox";
					completenessCheckboxMembers.id = "completenessCheckboxMembers";
					completenessCheckboxMembers.setAttribute("class", "completeness");
					completenessLabelMembers.appendChild(completenessCheckboxMembers);
					
					var completenessTextMembers = document.createElement("label");
					completenessTextMembers.setAttribute("for", "completenessCheckboxMembers");
					completenessTextMembers.setAttribute("class", "completeness");
					completenessTextMembers.innerHTML = "Ja, ich habe <u>alle</u> Vereinsmitglieder, die teilgenommen haben, eingetragen.<span class=\"mandatory\" title=\"Pflichtfeld: Bitte bestätigen.\">*</span>";
					completenessLabelMembers.appendChild(completenessTextMembers);
				}
				input.appendChild(completenessLabelMembers);
				
			}
			
			dialog.appendChild(input);

			var buttons = document.createElement("div");
			buttons.style.width = "100%";
			buttons.style.textAlign = "center";
			
			{
				var buttonAbort = document.createElement("input");
				buttonAbort.className = "actionBtn";
				buttonAbort.type = "button";
				buttonAbort.value = "Abbrechen";
				buttonAbort.onclick = function () {document.getElementById("body").removeChild(document.getElementById("sendDialog"));};
				buttons.appendChild(buttonAbort);
				
				buttons.appendChild(document.createTextNode(" "));

				var buttonSend = document.createElement("input");
				buttonSend.className = "actionBtn";
				buttonSend.type = "button";
				buttonSend.value = "Senden";
				buttonSend.onclick = function () {sendResults(xml);};
				buttons.appendChild(buttonSend);
			}
			
			dialog.appendChild(buttons);
			
			document.getElementById("body").appendChild(dialog);
			
			document.getElementById("userSelect").focus();
		}
	}
}

function sendResults(xml) {
	if (document.getElementById("userSelect").selectedIndex > 0 && 
		document.getElementById("eventTypeSelect").selectedIndex > 0 && 
		document.getElementById("completenessCheckboxGeneral").checked && 
		document.getElementById("completenessCheckboxCompetitions").checked && 
		document.getElementById("completenessCheckboxMembers").checked) {
	
		var user = document.getElementById("userSelect").options[document.getElementById("userSelect").selectedIndex].value;
		var competition = document.getElementById("competition").value;
		var eventType = document.getElementById("eventTypeSelect").options[document.getElementById("eventTypeSelect").selectedIndex].value;
		var comment = commentTextarea.value;

		var params = new Array();
		params.push(["1_Name", user]);
		params.push(["2_Wettkampfname", competition]);
		params.push(["3_Veranstaltungsart", eventType]);
		params.push(["4_Kommentar", "\n\n" + comment + "\n"]);
		params.push(["5_XML", "\n\n" + xml]);
		
		doAjaxRequest("php/formmailer.php", params, function handleAjax(){resultsSendHandler()});
		
		document.getElementById("body").removeChild(document.getElementById("sendDialog"));
	}
	else {
		alert("Bitte wähle deinen Namen sowie die Veranstaltungsart aus und bestätige die Vollständigkeit der Ergebnismeldung.");
		document.getElementById("userSelect").focus();
	}
}

function showErrorMsg() {
	if (errorCount > 0) {
		alert("Es wurden " + errorCount + " fehlende oder fehlerhafte Eingaben gefunden.\nBitte korrigieren bzw. ergänzen Sie diese Felder!");
	}

}

function getCompetitions() {
	var result = '';
	
	if (document.getElementById("competitions").getElementsByTagName("table").length < 1) {
		alert("Es sind keine Wettbewerbe angelegt. Bitte korrigiere deine Eingaben.");
		errorCount = 0;
		return "";
	}
	
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
							result += getXMLRow('					<td colspan="5" style="font-style: italic;">Männer</a></td>');
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
		
		if (!womanAdded && !manAdded) {
			alert("Es wurde mindestens 1 Wettbewerb ohne Teilnehmer gefunden. Bitte korrigiere deine Eingaben.");
			errorCount = 0;
			return "";
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
	
	var competitionTemplateSelect = document.createElement("select");
	competitionTemplateSelect.title = "Vorlagenauswahl für den Wettbewerbsnamen, kann dann noch angepasst werden";
	competitionTemplateSelect.onchange = function () {document.getElementById("competition_" + nextId + "_title").value = this.options[this.selectedIndex].value};
	addCompetitionTemplateValues(competitionTemplateSelect);
	col.appendChild(competitionTemplateSelect);
	
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
	
	var label = document.createElement("label");
	label.setAttribute("for", "competition_" + nextId + "_placingAgeGroup");
	label.appendChild(document.createTextNode("Platz Altersklasse "));
	col.appendChild(label);
	
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
	link.title = "Frau hinzufügen";
	link.appendChild(document.createTextNode("+"));
	col.appendChild(link);
				
	col.appendChild(document.createTextNode(" "));
	
	link = document.createElement("a");
	link.href = "javascript:delWomanRow('competition_" + nextId + "_tbody', 'competition_" + nextId + "_tr_men');";
	link.className = "del";
	link.title = "Letzte Frau löschen";
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
	span.appendChild(document.createTextNode("Männer"));
	
	col.appendChild(span);
	
	link = document.createElement("a");
	link.href = "javascript:addManRow('competition_" + nextId + "_tbody');";
	link.className = "add";
	link.title = "Mann hinzufügen";
	link.appendChild(document.createTextNode("+"));
	col.appendChild(link);
				
	col.appendChild(document.createTextNode(" "));
	
	link = document.createElement("a");
	link.href = "javascript:delManRow('competition_" + nextId + "_tbody');";
	link.className = "del";
	link.title = "Letzten Mann löschen";
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
	col.appendChild(getSmallInput(5, "Platzierung im Gesamtklassement pro Geschlecht"));
	col.appendChild(getDotSlash());
	col.appendChild(getSmallInput(5, "Gesamtzahl Teilnehmer im Gesamtklassement pro Geschlecht"));
	row.appendChild(col);

	col = document.createElement("td");
	col.appendChild(getSmallInput(5, "Platzierung in der Altersklasse"));
	col.appendChild(getDotSlash());
	col.appendChild(getSmallInput(5, "Gesamtzahl Teilnehmer in der Altersklasse"));
	row.appendChild(col);

	return row;
}

// Create row elements
function getSmallInput(maxlength, title) {
	var input = document.createElement("input");
	input.type = "text";
	input.className = "small_" + maxlength;
	input.title = title;
	input.maxLength = maxlength;
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

function addCompetitionTemplateValues (select) {
	var optionEmpty = document.createElement("option");
	optionEmpty.value = "";
	optionEmpty.appendChild(document.createTextNode(">>> Vorlage auswählen"));
	select.appendChild(optionEmpty);
	
	var optGroup = document.createElement("optgroup");
	optGroup.label = "Vorlagenauswahl ..."
	
	for (var i = 0; i < competitionTemplates.length; i++) {
		var option = document.createElement("option");
		option.value = competitionTemplates[i];
		option.appendChild(document.createTextNode(competitionTemplates[i]));
		
		optGroup.appendChild(option);
	}
	
	select.appendChild(optGroup);
}

var competitionTemplates = new Array(
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
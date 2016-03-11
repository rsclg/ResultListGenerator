<?php

$jsonurl = "https://api.trello.com/1/lists/4fd317c79dfbd66e10e9f30f?fields=name&cards=open&card_fields=name&key=1048b364a775a469686d4a8a1670fb73";
$json = file_get_contents($jsonurl,0,null,null);
$json_output = json_decode($json);

?>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1" />
	<meta http-equiv="content-language" content="de" />
	<title>Ergebnislisten - Generator</title>

	<!-- script src="javascript/user.js" type="text/javascript"></script -->
	<script src="http://intranet.rsc-lueneburg.de/tl_files/results/_external/user.js?<?php echo date('Ymd'); ?>" type="text/javascript"></script>
	<script src="javascript/functions.js?<?php echo getlastmod(); ?>" type="text/javascript"></script>
	
	<link rel="stylesheet" href="css/layout.css?<?php echo getlastmod(); ?>" type="text/css" />
	
	<link rel="icon" type="image/vnd.microsoft.icon" href="pics/favicon.ico" />
	<link rel="shortcut icon" type="image/vnd.microsoft.icon" href="pics/favicon.ico" />
</head>
<body id="body" onload="addCompetition(); showHintCheckLastSend();">
	<h2>Ergebnislisten - Generator</h2>
	<!-- Competition -->
	<fieldset>
	<legend>Datum / Wettkampf</legend>
		<input id="dateDay" type="text" class="small_2" maxlength="2" title="Datum des Wettkampfs: Tag"/>.
		<input id="dateMonth" type="text" class="small_2" maxlength="2" title="Datum des Wettkampfs: Monat"/>.
		<input id="dateYear" type="text" class="small_4" maxlength="4" title="Datum des Wettkampfs: Jahr"/>
		&nbsp;:&nbsp;
		<input id="competition" type="text" size="50" title="Name des Wettkampfs"/>
		<select title="Vorlagenauswahl für den Wettkampfnamen, kann dann noch angepasst werden" onChange="document.getElementById('competition').value = this.options[this.selectedIndex].value;">
			<option value="">>>> Vorlage auswählen</option>
			<optgroup label="Schwimm-Events ...">
				<option value="24-Stunden-Schwimmen Lippstadt">24-Stunden-Schwimmen Lippstadt</option>
				<option value="24-Stunden-Schwimmen Lüneburg">24-Stunden-Schwimmen Lüneburg</option>
				<option value="Clausthal-Zellerfelder 24 Stunden-Schwimmen">Clausthal-Zellerfelder 24 Stunden-Schwimmen</option>
				<option value="Glücksburger Förde-Crossing">Glücksburger Förde-Crossing</option>
				<option value="Lüchower Stundenschwimmen">Lüchower Stundenschwimmen</option>
				<option value="Sehnder Stichkanalschwimmen">Sehnder Stichkanalschwimmen</option>
				<option value="Wilhelmshavener Leuchtturmschwimmen">Wilhelmshavener Leuchtturmschwimmen</option>
			</optgroup>
			<optgroup label="Radfahr-Events ...">
				<option value="Bad Harzburger Bike-Marathon">Bad Harzburger Bike-Marathon</option>
				<option value="Bike Day Lüneburg">Bike Day Lüneburg</option>
				<option value="Buchholzer Stevens Cup">Buchholzer Stevens Cup</option>
				<option value="Cyclassics Hamburg">Cyclassics Hamburg</option>
				<option value="Harzer MTB-Event Marathon">Harzer MTB-Event Marathon</option>
				<option value="Helmuts Höllenritt">Helmuts Höllenritt</option>
				<option value="MTB Marathon Braunlage">MTB Marathon Braunlage</option>
				<option value="MTB Marathon Clausthal-Zellerfeld">MTB Marathon Clausthal-Zellerfeld</option>
				<option value="Ötztaler Radmarathon Sölden">Ötztaler Radmarathon Sölden</option>
				<option value="Peak Break">Peak Break</option>
				<option value="Race to Sky">Race to Sky</option>
				<option value="Ruhrbike-Festival">Ruhrbike-Festival</option>
				<option value="Stunde von Banzau">Stunde von Banzau</option>
				<option value="Vätternrundan Schweden">Vätternrundan Schweden</option>
				<option value="Velothon Berlin">Velothon Berlin</option>
			</optgroup>
			<optgroup label="Lauf-Events ...">
				<option value="6-Stunden-Lauf Nürnberg">6-Stunden-Lauf Nürnberg</option>
				<option value="Ashausen Cross">Ashausen Cross</option>
				<option value="Berlin Marathon">Berlin Marathon</option>
				<option value="BIG 25 Berlin">BIG 25 Berlin</option>
				<option value="Brocken Challenge">Brocken Challenge</option>
				<option value="Celler Wasa Lauf">Celler Wasa Lauf</option>
				<option value="Citymarathon Bremerhaven">Citymarathon Bremerhaven</option>
				<option value="City-Nacht Berlin">City-Nacht Berlin</option>
				<option value="Deichlauf Hohnstorf">Deichlauf Hohnstorf</option>
				<option value="Drestedter Siebenmeilenstiefellauf">Drestedter Siebenmeilenstiefellauf</option>
				<option value="Ebstorfer Winter-Volkslauf">Ebstorfer Winter-Volkslauf</option>
				<option value="Echemer Dorflauf">Echemer Dorflauf</option>
				<option value="Energie-Südwest Cup Landau-Nußdorf">Energie-Südwest Cup Landau-Nußdorf</option>
				<option value="Fisherman`s Friend Strongman Run">Fisherman`s Friend Strongman Run</option>
				<option value="Halbmarathon Hall-Wattens (Tirol)">Halbmarathon Hall-Wattens (Tirol)</option>
				<option value="Hamburg Marathon">Hamburg Marathon</option>
				<option value="Harzquerung">Harzquerung</option>
				<option value="Heide-Elbe-Ultralauf">Heide-Elbe-Ultralauf</option>
				<option value="Heideköniginnenpokal">Heideköniginnenpokal</option>
				<option value="Herbstlauf TSV Gellersen">Herbstlauf TSV Gellersen</option>
				<option value="Herbstlauf Westergellersen">Herbstlauf Westergellersen</option>
				<option value="Hitzacker Herbsthärte">Hitzacker Herbsthärte</option>
				<option value="Ilmenaulauf Bad Bevensen">Ilmenaulauf Bad Bevensen</option>
				<option value="Junkernhof-Lauf">Junkernhof-Lauf</option>
				<option value="Köln Marathon">Köln Marathon</option>
				<option value="König Ludwig Lauf">König Ludwig Lauf</option>
				<option value="Lüneburger Firmenlauf">Lüneburger Firmenlauf</option>
				<option value="Marathon Hannover">Marathon Hannover</option>
				<option value="Marathon Mainz">Marathon Mainz</option>
				<option value="Müritz-Lauf">Müritz-Lauf</option>
				<option value="Nachtlauf Hamburg">Nachtlauf Hamburg</option>
				<option value="Nordenhamer Citylauf">Nordenhamer Citylauf</option>
				<option value="North Sea Beach Marathon">North Sea Beach Marathon</option>
				<option value="Ratzeburger Adventslauf">Ratzeburger Adventslauf</option>
				<option value="Rotenburger Oster-Volkslauf (Rotenburg a.d. Fulda)">Rotenburger Oster-Volkslauf (Rotenburg a.d. Fulda)</option>
				<option value="Rottorfer Volkslauf">Rottorfer Volkslauf</option>
				<option value="Salzewerlauf Lüneburg">Salzewerlauf Lüneburg</option>
				<option value="Schiffshebewerksvolkslauf Scharnebeck">Schiffshebewerksvolkslauf Scharnebeck</option>
				<option value="Schweriner Nachtlauf">Schweriner Nachtlauf</option>
				<option value="Ostseelauf Timmendorfer Strand">Ostseelauf Timmendorfer Strand</option>
				<option value="SportScheck Nachtlauf Hamburg">SportScheck Nachtlauf Hamburg</option>
				<option value="Stadt- und Deichlauf Winsen">Stadt- und Deichlauf Winsen</option>
				<option value="Stadtlauf Lüneburg">Stadtlauf Lüneburg</option>
				<option value="Swissalpine Davos">Swissalpine Davos</option>
				<option value="Syltlauf">Syltlauf</option>
				<option value="Tangendorfer Volkslauf">Tangendorfer Volkslauf</option>
				<option value="Tiergarten-Volkslauf Lüneburg">Tiergarten-Volkslauf Lüneburg</option>
				<option value="Volkslauf Jesteburg">Volkslauf Jesteburg</option>
				<option value="Volkslauf TSV Adendorf">Volkslauf TSV Adendorf</option>
				<option value="Volkswaldlauf Borstel">Volkswaldlauf Borstel</option>
				<option value="Wald- und Wiesenlauf Salzhausen">Wald- und Wiesenlauf Salzhausen</option>
				<option value="Wintervolkslauf Amelinghausen">Wintervolkslauf Amelinghausen</option>
			</optgroup>
			<optgroup label="Duathlon ...">
				<option value="Crossduathlon Meudelfitz">Crossduathlon Meudelfitz</option>
				<option value="Duathlon Scheeßel">Duathlon Scheeßel</option>
				<option value="Eifeler Crossduathlon">Eifeler Crossduathlon</option>
				<option value="Gartower Seeduathlon">Gartower Seeduathlon</option>
				<option value="Güstrower Cross-Duathlon">Güstrower Cross-Duathlon</option>
				<option value="Müritz Duathlon Waren">Müritz Duathlon Waren</option>
				<option value="Osterduathlon Godern">Osterduathlon Godern</option>
				<option value="Scheeßeler Volks-Duathlon">Scheeßeler Volks-Duathlon</option>
				<option value="Swim and Run Elmshorn">Swim and Run Elmshorn</option>
			</optgroup>
			<optgroup label="Triathlon ...">
				<option value="Achimer Triathlon">Achimer Triathlon</option>
				<option value="Alpen Triathlon Schliersee">Alpen Triathlon Schliersee</option>
				<option value="Bonn Triathlon">Bonn Triathlon</option>
				<option value="Büchener Triathlon">Büchener Triathlon</option>
				<option value="Celler Triathlon">Celler Triathlon</option>
				<option value="Challenge Kraichgau">Challenge Kraichgau</option>
				<option value="Challenge Roth">Challenge Roth</option>
				<option value="Citytriathlon Schwerin">Citytriathlon Schwerin</option>
				<option value="Elbe Triathlon">Elbe Triathlon Hamburg</option>
				<option value="Föhr Triathlon">Föhr Triathlon</option>
				<option value="Gegen den Wind Thriathlon St.Peter-Ording">Gegen den Wind Thriathlon St.Peter-Ording</option>
				<option value="Güstrower Triathlon">Güstrower Triathlon</option>
				<option value="Hachede Triathlon">Hachede Triathlon</option>
				<option value="Hamburg Triathlon">Hamburg Triathlon</option>
				<option value="Hamelner Triathlon">Hamelner Triathlon</option>
				<option value="Harsewinkel-Triathlon">Harsewinkel-Triathlon</option>
				<option value="Harz Triathlon">Harz Triathlon</option>
				<option value="Herrenkoog-Triathlon">Herrenkoog-Triathlon</option>
				<option value="Hückeswagener Triathlon">Hückeswagener Triathlon</option>
				<option value="IM 70.3 Wiesbaden">IM 70.3 Wiesbaden</option>
				<option value="Inseltriathlon Ratzeburg">Inseltriathlon Ratzeburg</option>
				<option value="Ironman 70.3 Austria">Ironman 70.3 Austria</option>
				<option value="Ironman 70.3 WM Clearwater">Ironman 70.3 WM Clearwater</option>
				<option value="Ironman Austria">Ironman Austria</option>
				<option value="Ironman Cozumel (Mexiko)">Ironman Cozumel (Mexiko)</option>
				<option value="Ironman Frankfurt">Ironman Frankfurt</option>
				<option value="Ironman Hawaii">Ironman Hawaii</option>
				<option value="Ironman Lanzarote">Ironman Lanzarote</option>
				<option value="Ironman Nizza">Ironman Nizza</option>
				<option value="Ironman Regensburg">Ironman Regensburg</option>
				<option value="Ironman Switzerland">Ironman Switzerland</option>
				<option value="Irontown Triathlon Ferropolis">Irontown Triathlon Ferropolis</option>
				<option value="Islandman Norderney">Islandman Norderney</option>
				<option value="ITU Triathlon London">ITU Triathlon London</option>
				<option value="Junior Challenge Roth">Junior Challenge Roth</option>
				<option value="Kaliman-Triathlon">Kaliman-Triathlon</option>
				<option value="Kiel Triathlon">Kiel Triathlon</option>
				<option value="Kiez-Kinder-Triathlon">Kiez-Kinder-Triathlon</option>
				<option value="Köln Triathlon">Köln Triathlon</option>
				<option value="Leipziger LVB Triathlon">Leipziger LVB Triathlon</option>
				<option value="Maschsee Triathlon Hannover">Maschsee Triathlon Hannover</option>
				<option value="Midsummer-Triathlon Großensee">Midsummer-Triathlon Großensee</option>
				<option value="Münster City Triathlon">Münster City Triathlon</option>
				<option value="Munsteraner Triathlon">Munsteraner Triathlon</option>
				<option value="Mürtiz Triathlon Waren">Mürtiz Triathlon Waren</option>
				<option value="Nordseeman Wilhelmshaven">Nordseeman Wilhelmshaven</option>
				<option value="Oldenburger Bärentriathlon">Oldenburger Bärentriathlon</option>
				<option value="O-See-Triathlon Uelzen">O-See-Triathlon Uelzen</option>
				<option value="Ostseeman Glücksburg">Ostseeman Glücksburg</option>
				<option value="Paderborner City Triathlon">Paderborner City Triathlon</option>
				<option value="Peiner Triathlon">Peiner Triathlon</option>
				<option value="Pellwormer Trifun">Pellwormer Trifun</option>
				<option value="Powertriathlon Gera">Powertriathlon Gera</option>
				<option value="Ratzeburger Inseltriathlon">Ratzeburger Inseltriathlon</option>
				<option value="Rostocker Triathlon">Rostocker Triathlon</option>
				<option value="Sassenberger Triathlon">Sassenberger Triathlon</option>
				<option value="Scheunenhof-Triathlon Nordhausen">Scheunenhof-Triathlon Nordhausen</option>
				<option value="Schluchsee-Triathlon">Schluchsee-Triathlon</option>
				<option value="SCI Triathlon Itzehoe">SCI Triathlon Itzehoe</option>
				<option value="Seepark-Triathlon Bad Bodenteich">Seepark-Triathlon Bad Bodenteich</option>
				<option value="Silbersee-Triathlon">Silbersee-Triathlon</option>
				<option value="Silkeborg (DK) Triathlon">Silkeborg (DK) Triathlon</option>
				<option value="Stadtpark Triathlon Hamburg">Stadtpark Triathlon Hamburg</option>
				<option value="Stadttriathlon Erding">Stadttriathlon Erding</option>
				<option value="Steinbecker Triathlon">Steinbecker Triathlon</option>
				<option value="Sternberger Triathlon">Sternberger Triathlon</option>
				<option value="Tankumsee Triathlon Gifhorn">Tankumsee Triathlon Gifhorn</option>
				<option value="Triathlon Bokeloh">Triathlon Bokeloh</option>
				<option value="Triathlon Dahlenburg">Triathlon Dahlenburg</option>
				<option value="TriStar Worms Germany">TriStar Worms Germany</option>
				<option value="Türme Triathlon Lübeck">Türme Triathlon Lübeck</option>
				<option value="Vierlanden Triathlon">Vierlanden Triathlon</option>
				<option value="Wa(h)ltriathlon Brunsbüttel">Wa(h)ltriathlon Brunsbüttel</option>
				<option value="Wasserstadt Triathlon Hannover-Limmer">Wasserstadt Triathlon Hannover-Limmer</option>
				<option value="Wendland-Triathlon">Wendland-Triathlon</option>
				<option value="Wolfsburger Triathlon">Wolfsburger Triathlon</option>
				<option value="WVC-Triathlon Kassel">WVC-Triathlon Kassel</option>
			</optgroup>
		</select>
	</fieldset>
	
	<!-- Competitions -->
	<fieldset id="competitions"><legend>Wettbewerbe <a href="javascript:addCompetition();" class="add" title="Wettbewerb hinzufügen">+</a> <a href="javascript:delCompetition();" class="del" title="Letzten Wettbewerb löschen">X</a></legend></fieldset>
	
	<!-- Preview -->
	<fieldset style="float: left; width: 47%;">
	<legend>Vorschau</legend>
		<div id="resultHTML"/>
	</fieldset>
	<!-- Output -->
	<fieldset style="float: right; width: 47%;">
	<legend>Generiertes XML</legend>
		<textarea id="resultXML" readonly="readonly" wrap="off"></textarea>
	</fieldset>
	<!-- Action -->
	<fieldset style="clear: both; text-align: center;">
	<legend>Aktionen</legend>
		<input class="actionBtn" type="button" onclick="document.getElementById('resultXML').value=''; document.getElementById('resultHTML').innerHTML='';" value="Felder leeren" title="Leert die Felder 'Vorschau' und 'Generiertes XML'"/>
		&nbsp;
		<input class="actionBtn" type="button" onclick="generateHTML(); showErrorMsg();" value="Vorschau" title="Erzeugt anhand der eingegebenen Daten eine Vorschau"/>
		&nbsp;
		<input class="actionBtn" type="button" onclick="generateXML(); showErrorMsg();" value="XML generieren" title="Erzeugt den XML Code für den Web Content"/>
		&nbsp;
		<input class="actionBtn" type="button" onclick="reportResults();" value="Ergebnisse melden" title="Versendet die eingegebenen Daten an den Webseiten Administrator. Nach einer Prüfung der Ergebnismeldung werden diese veröffentlicht."/>
	</fieldset>
	<!-- Last send -->
	<fieldset style="float: left; width: 23%;">
	<legend>Zuletzt gemeldet</legend>
		<div id="lastSend">
		<a href="https://trello.com/b/cG42EkMW/ergebnisse-berichte" target="_blank">Zum Trello Board</a>
		<ul>
<?php foreach ($json_output->cards as $card ) : ?>
			<li><a href="https://trello.com/c/<?php echo $card->id; ?>" target="_blank"><?php echo $card->name; ?></a></li>
<?php endforeach; ?>
		</ul>
		</div>
	</fieldset>
	<!-- Help -->
	<fieldset style="float: left; width: 23%;">
	<legend>Hilfe</legend>
		<div id="help">
		<u>Inhalt</u>
		<ul>
			<li><a href="#send_results">Ergebnisse melden</a></li>
			<li><a href="#send_results_video">Ergebnisse melden (Video)</a></li>
			<li><a href="#dnf">DNF eintragen</a></li>
			<li><a href="#publication">Veröffentlichung von Ergebnissen</a></li>
			<li><a href="#placing_agegroup">Altersklassenwertung</a></li>
			<li><a href="#relays">Meldung von Staffeln</a></li>
		</ul>
		<u id="send_results">Ergebnisse melden</u>
		<p>Um die Ergebnisse eines Wettkampfs zu melden geht man wie folgt vor:</p>
			<ol>
				<li>Datum (Tag, Monat Jahr) und Name der Veranstaltung im Bereich "Datum / Wettkampf" eintragen</li>
				<li>Dann den ersten Wettbewerb benennen (Aus der Selectbox hinter dem Namesfeld kann eine Vorlage gewählt werden. Diese wird dann ins Namensfeld übernommen, wo sie noch angepasst werden kann.)</li>
				<li>Als nächstes alle Starter des Teams mit ihren Zeiten (Stunden, Minuten, Sekunden) und Platzierungen (Platzierung im Gesamtklassement pro Geschlecht, Gesamtzahl Teilnehmer im Gesamtklassement pro Geschlecht, Platzierung in der Altersklasse, Gesamtzahl Teilnehmer in der Altersklasse) für diesen Wettbewerb eintragen.</li>
				<li>Das Ergebnis erscheint in der Vorschau-Box nach dem Klicken auf den Button "Vorschau". Falls Angaben fehlerhaft oder unvollständig sind wird ein Meldung angezeigt.</li>
				<li>Falls es bei der Veranstaltung mehr als einen Wettbewerb gab, kann mit dem "+" hinter "Wettbewerbe" ein weiterer Eingabebereich für einen Wettbewerb angelegt werden. Danach Punkt 2-4 wiederholen.</li>
				<li>Durch die Pfeiltasten an den Wettbewerben können diese in der Reihenfolgen verändert werden. Am Besten befinden sich oben die kurzen Distanzen und nach unten werden sie immer länger.</li>
				<li>Durch die Pfeiltasten Startern kann auch hier die Reihenfolge geändert werden. Sie soll immer von oben nach unten der Reihenfolgen im Gesmatklassement entsprechen.</li>
				<li>Wenn alles eingetragen ist, können die Ergebnisse per Klick auf "Ergebnisse melden" an den Webseiten Administrator gesendet werden. Falls noch Fehöler existieren wird eine Meldung angezeigt.</li>
			</ol>
		<p>Alle Eingabefelder, Checkboxen, SelectBoxen und Buttons haben ToolTips die hilfreiche Hinweise zu ihrer jeweiligen Funktion geben.</p>
		<u id="send_results_video">Ergebnisse melden (Video)</u>
		<p>Das folgende Video zeigt alle Funktionen: <a href="Ergebnis_melden.avi" target="_blank">Ergebnis_melden.avi</a></p>
		<u id="dnf">DNF eintragen</u>
		<p>Um für einen Starter "DNF" (Did not finish) einzutragen, müssen die Zeiten (Stunden, Minuten und Sekunden) auf "0" gesetzt werden. Dann wird automatisch der Eintrag "DNF (Did not finish)" erzeugt. Die Angabe der Platzierung ist dann nicht mehr notwendig.</p>
		<u id="publication">Veröffentlichung von Ergebnissen</u>
		<p>Die Ergebnismeldung wird nicht automatisch auf der Triathlon Team Seite veröffentlich, sondern vorher geprüft. Es kann also durchaus ein paar Tage dauern, bis Ergebnisse online stehen.</p>
		<u id="placing_agegroup">Altersklassenwertung</u>
		<p>Es kann vorkommen, dass ein Veranstalter keine Alterklassewertung anbietet. In diesem Fall muss nur die Checkbox neben "Platz Alterklasse" deselektiert werden. Dann wird die Spalte nicht mehr ausgewertet und auch nciht auf Fehler geprüft.</p>
		<u id="relays">Meldung von Staffeln</u>
		<p>Aktuell ist eine Meldung von Staffeln nicht möglich. Bitte dazu das Kommentarfeld im Sendedialog verwenden.</p>
		</div>
	</fieldset>
	<!-- Help -->
	<fieldset style="float: right; width: 23%;">
	<legend>ToDo</legend>
		<div id="todo">
		<u>Folgenden Dinge sollen noch kommen:</u>
		<p>- freie Eingabefelder für z.B. Staffel</p>
		<u>Wünsche / Vorschläge / Hinweise:</u>
		<p>- bitte per <a href="mailto:mail@tri-team-lueneburg.de?subject=Wünsche / Vorschläge / Hinweise zum Ergebnislistengenerator">Mail</a> senden</p>
		</div>
	</fieldset>
	<!-- History -->
	<fieldset style="margin: auto;">
	<legend>Historie</legend>
		<div id="history">
			<u>v0.9.9</u>
			<p>Feldgrößen für Platzierungen angepasst</p>
			<p>Vorlagen für Wettkampfnamen</p>
			<p>Anpassung im Sende Dialog</p>

			<u>v0.9.8</u>
			<p>Fehlerprüfung erweitert (keine Meldung ohne Wettbewerb, keine Meldung mit Wettbewerben ohne Teilnehmer)</p>
			<p>Dialog zum Senden der Ergebnisse mit Select für Name sowie Veranstaltungsart, Textfeld für Kommentar und Checkbox zur Bestätigung der Vollständigkeit</p>

			<u>v0.9.7</u>
			<p>Layout angepasst</p>
			<p>Mail angepasst</p>
			<p>Code aufgeräumt</p>

			<u>v0.9.6</u>
			<p>Platzierungsicons angepasst und mit Tooltip versehen</p>

			<u>v0.9.5</u>
			<p>Anzeige von DNF wenn alle Zeiten "0"</p>
			<p>Boxen für Hilfe, Historie und ToDo eingefügt</p>
			<p>Eingabefelder, Checkboxen, SelectBoxen und Buttons mit ToolTips versehen</p>
			
			<u>v0.9.4</u>
			<p>Vorlagen für Wettbewerbe</p>
			<p>Initial wird 1 Wettbewerb angezeigt</p>

			<u>v0.9.3</u>
			<p>Parsing Bug von Int Werten behoben >>> parseInt("08") lieferte 0</p>

			<u>v0.9.2</u>
			<p>Bug mit maxLength behoben >>> führte im IE zum Absturz</p>
			<p>Browser-Kompatibilität mit IE 7 hergestellt</p>

			<u>v0.9.1</u>
			<p>Markierung der aktuellen Zeile über der sich die Maus befindet (MouseOver)</p>
			<p>Benutzerlisten aktualisiert</p>

			<u>v0.8</u>
			<p>Anzeige der fehlenden oder fehlerhaften Felder</p>

			<u>v0.7</u>
			<p>Vertauschen der Reihenfolge der Wettbewerbe</p>

			<u>v0.6</u>
			<p>Auswahl ob AK Wertung oder nicht</p>

			<u>v0.5</u>
			<p>Validierung von Zahl-Feldern (Anzeigen von Fehlern)</p>
			<p>Fokusierung der Select-Box beim Erzeugen neuer Zeilen</p>

			<u>v0.4</u>
			<p>Vertauschen der Reihenfolge der Teilnehmer</p>

			<u>v0.3</u>
			<p>Anpassung von Label und Layout</p>
			<p>Übertragen der Ergebnisse (per Mail)</p>

			<u>v0.2</u>
			<p>dynamisches Erzeugen von Wettbewerben</p>

			<u>v0.1</u>
			<p>Initiale Erstellung</p>
		</div>
	</fieldset>
	<div id="overlay"></div>
</body>
</html>
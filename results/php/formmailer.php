<?php
$sender = "mail@domain.de";
$mailMessage = "";
$trelloMessage = "";

$user = "";
$competition = "";
$eventType = "";
$xml = "";

while(list($name,$value)=each($_GET)) {
	if ($name == "1_Name") {
		$user = $value;
	}
	if ($name == "2_Wettkampfname") {
		$competition = $value;
	}
	if ($name == "3_Veranstaltungsart") {
		$eventType = $value;
	}
	if ($name != "5_XML") {
		$trelloMessage.="##" . substr($name, 2) . " \n\n $value \n\n";
	} else {
    $value = str_replace("##DATE##", date("d.m.Y"), $value);
  }
	$mailMessage.="$name: $value\n";
}

while(list($name,$value)=each($_POST)) {
	if ($name == "1_Name") {
		$user = $value;
	}
	if ($name == "2_Wettkampfname") {
		$competition = $value;
	}
	if ($name == "3_Veranstaltungsart") {
		$eventType = $value;
	}
	if ($name != "5_XML") {
		$trelloMessage.="##" . substr($name, 2) . " \n\n $value \n\n";
	} else {
    $value = str_replace("##DATE##", date("d.m.Y"), $value);
  }
	$mailMessage.="$name: $value\n";
}

if (strlen($mailMessage) > 0) {
	mail("mail@domain.de", "Ergebnismeldung von $user zum $eventType: $competition", $mailMessage, "From: $sender");
	mail("mail@domain.de", "Ergebnisse: $competition #Purple", $trelloMessage, "From: $sender");
}
?>SEND
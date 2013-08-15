<?php
$sender = "mail@domain.de";
$mailMessage = "";
$trelloMessage = "";

$user = "";
$competition = "";
$eventType = "";

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
	$mailMessage.="$name:\t\t$value\n";
	$trelloMessage.="##$name<br>    $value<br>";
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
	$mailMessage.="$name:\t\t$value\n";
	$trelloMessage.="##$name<br>    $value<br>";
}

if (strlen($mailMessage) > 0) {
	mail("mail@domain.de", "Ergebnismeldung von $user zum $eventType: $competition", $mailMessage, "From: $sender");
	mail("trellomail@domain.com", "Ergebnisse: $competition #Purple", $trelloMessage, "From: $sender");
}
?>SEND
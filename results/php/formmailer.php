<?php
$email = "mail@domain.com";
$admin = "mail@domain.com";
$subject = "Ergebnismeldung";
$message = "";

while(list($name,$value)=each($_GET)) {
	if ($name == "1_Name") {
		$subject .= " von " . $value;
	}
	if ($name == "2_Veranstaltungsart") {
		$subject .= " (" . $value . ")";
	}
	$message.="$name:\t\t$value\n";
}

while(list($name,$value)=each($_POST)) {
	if ($name == "1_Name") {
		$subject .= " von " . $value;
	}
	if ($name == "2_Veranstaltungsart") {
		$subject .= " (" . $value . ")";
	}
	$message.="$name:\t\t$value\n";
}

if (strlen($message) > 0) {
	mail($admin,$subject,$message,"From: $email");
}
?>SEND
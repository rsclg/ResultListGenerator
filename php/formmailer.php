<?php
$email = "mail@domain.com";
$admin = "mail@domain.com";
$subject = "Ergebnismeldung";
$message = "";

while(list($name,$value)=each($_GET)) {
	if ($name == "1_Name") {
		$subject .= " von " . $value;
	}
	$message.="$name:\t\t$value\n";
}

while(list($name,$value)=each($_POST)) {
	if ($name == "1_Name") {
		$subject .= " von " . $value;
	}
	$message.="$name:\t\t$value\n";
}

mail($admin,$subject,$message,"From: $email");
?>SEND
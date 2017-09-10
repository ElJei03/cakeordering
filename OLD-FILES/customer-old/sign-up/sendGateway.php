Hello po

<?php
include "smsGateway.php";
$smsGateway = new SmsGateway('exd.dev.sol@gmail.com', 'w3sTern03');

$deviceID = 52751;
$number = '+639368121870';
$message = 'Hello Po!';

/*$options = [
'send_at' => strtotime('+1 minutes'), // Send the message in 10 minutes
'expires_at' => strtotime('+1 hour') // Cancel the message in 1 hour if the message is not yet sent
];*/

//Please note options is no required and can be left out
$result = $smsGateway->sendMessageToNumber($number, $message, $deviceID);



?>
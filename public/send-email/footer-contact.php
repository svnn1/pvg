<?php
if ($_SERVER['REQUEST_METHOD'] !== "POST")
	die();
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_SPECIAL_CHARS);
$telephone = filter_input(INPUT_POST, 'telephone', FILTER_SANITIZE_SPECIAL_CHARS);
$cellphone = filter_input(INPUT_POST, 'cellphone', FILTER_SANITIZE_SPECIAL_CHARS);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);
if (empty($name) || empty($email) || empty($telephone) || empty($cellphone) || empty($message)) {
	echo json_encode(["message" => 0, "error" => "Preencha todos os campos!"]);
	die();
}
if (filter_var($email, FILTER_VALIDATE_EMAIL) === FALSE) {
	echo json_encode(["message" => 0, "error" => "Digite um email válido"]);
	die();
}
$emailMessage = "Contato PVG AUTO CENTRO\n\nNome: $name \nEmail: $email \nTelefone: $telephone \nCelular: $cellphone \nMensagem: $message";
$emailHeaders = 'To: modestopvg@gmail.com' . "\r\n" .
	'From: noreply@pvg-autocentro.com' . "\r\n" .
	'Reply-To: noreply@pvg-autocentro.com' . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
mail("modestopvg@gmail.com", "PVG AUTO CENTRO - Contato", $emailMessage, $emailHeaders);
echo json_encode(["message" => 1]);
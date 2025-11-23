<?php
require_once '../model/conexao.php'; // mesmo padrão do projeto

$nome = $_POST['nome'] ?? null;
$motivo = $_POST['motivo'] ?? null;
$opiniao = $_POST['opiniao'] ?? null;
$melhorias = $_POST['melhorias'] ?? null;

$sql = $pdo->prepare("
    INSERT INTO pesquisa_voluntarios (nome, motivo, opiniao, melhorias)
    VALUES (:nome, :motivo, :opiniao, :melhorias)
");

$sql->bindParam(':nome', $nome);
sql->bindParam(':motivo', $motivo);
$sql->bindParam(':opiniao', $opiniao);
$sql->bindParam(':melhorias', $melhorias);

$sql->execute();

header("Location: ../view/confirmacao.php");
exit;

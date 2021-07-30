<?php
	include 'connect.php';

	$data_inicial = $_POST["data_inicial"];
	$data_final = $_POST["data_final"];
	$grafico = $_POST["grafico"];
	$estado = isset($_POST['estado']) ? $_POST['estado'] : NULL;

	if(!$data_inicial && !$data_final)
	{
		$data_inicial = '2021-07-23';
		$data_final = $data_inicial;
	}

	if(!$data_inicial) {
		$data_inicial = $data_final;
	}

	if(!$data_final) {
		$data_final = $data_inicial;
	}

	if(!$estado) {

		switch ($grafico) {
			case '1':
				$sql = "SELECT date_format(data,'%d/%m/%Y') data, SUM(confirmados) confirmados, SUM(mortes) mortes
						  FROM casosestado
						   WHERE data BETWEEN '$data_inicial' AND '$data_final'
						 GROUP BY data";

				$result = $mysqli->query($sql)->fetch_all(MYSQLI_ASSOC);

				echo json_encode($result);
				break;
			
			case '2':
				$sql = "SELECT estado, date_format(DATA,'%d-%m-%Y') data, confirmados, mortes
						  FROM casosestado
						 WHERE data = '$data_final'
						ORDER BY estado";

				$result = $mysqli->query($sql)->fetch_all(MYSQLI_ASSOC);

				echo json_encode($result);
				break;
		}
	}
	else
	{
		$sql = "SELECT * FROM casoscidade 
				 WHERE data = '$data_final' AND estado = '$estado'";

			$result = $mysqli->query($sql)->fetch_all(MYSQLI_ASSOC);

			echo json_encode($result);
	}
?>


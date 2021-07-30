
// cria variaveis que armazenam os graficos
var graph_brasil_conf;
var graph_estado_conf;
var table_cidade_conf;
var graph_brasil_comp;

$(document).ready(function(){		// a página já carregou todos os componentes

	AmCharts.ready(function(){

		// gráfico confirmados brasil
		graph_brasil_conf = new AmCharts.AmSerialChart();
		graph_brasil_conf.categoryField = "data";
		graph_brasil_conf.dataProvider = [];	//carrega gráfico vazio
		graph_brasil_conf.thousandsSeparator = ".";
		graph_brasil_conf.decimalSeparator = ",";

		//linhas do gráfico - GRAPH
		graph = new AmCharts.AmGraph();
		graph.type = "line";
		graph.valueField = "confirmados";
		graph.title = "Confirmados";
		graph.lineThickness = 3;
		graph.bullet = "circle";
		graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
		graph_brasil_conf.addGraph(graph);

		//eixo x
		axis = graph_brasil_conf.categoryAxis;
		axis.title = "Datas";

		//eixo y
		axis = new AmCharts.ValueAxis();
		axis.title = "Casos confirmados";
		graph_brasil_conf.addValueAxis(axis);

		var chartCursor = new AmCharts.ChartCursor();
	    chartCursor.cursorAlpha = 0;
	    chartCursor.zoomable = true;
	    chartCursor.categoryBalloonEnabled = false;
	    graph_brasil_conf.addChartCursor(chartCursor);

	    var chartLegend = new AmCharts.AmLegend();
	    chartLegend.useGraphSettings = true;
	    chartLegend.valueText = "";
	    graph_brasil_conf.addLegend(chartLegend);

		graph_brasil_conf.write("id_grafico_linha_br_confirmado");

		// gráfico confirmados estado
		graph_estado_conf = new AmCharts.AmSerialChart();
		graph_estado_conf.categoryField = "estado";
		graph_estado_conf.dataProvider = [];
		graph_estado_conf.thousandsSeparator = ".";
		graph_estado_conf.decimalSeparator = ",";

		//linhas do gráfico - GRAPH
		graph = new AmCharts.AmGraph();
		graph.type = "column";
		graph.valueField = "confirmados";
		graph.title = "Confirmados";
		graph.fillAlphas = 1;
		// graph.bullet = "circle";
		graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
		graph_estado_conf.addGraph(graph);

		//eixo x
		axis = graph_estado_conf.categoryAxis;
		axis.title = "Estado";

		//eixo y
		axis = new AmCharts.ValueAxis();
		axis.title = "Casos confirmados";
		graph_estado_conf.addValueAxis(axis);

		var chartCursor = new AmCharts.ChartCursor();
	    chartCursor.cursorAlpha = 0;
	    chartCursor.zoomable = true;
	    chartCursor.categoryBalloonEnabled = false;
	    graph_estado_conf.addChartCursor(chartCursor);

	    var chartLegend = new AmCharts.AmLegend();
	    chartLegend.useGraphSettings = true;
	    chartLegend.valueText = "";
	    graph_estado_conf.addLegend(chartLegend);

	    // ao clicar na coluna
	    graph_estado_conf.addListener('clickGraphItem',function(e){

	    	$('#id_cidades_confirmados').css('display','block');

	    	// carrega tabela de cidades
	    	$.ajax({
				url: "application/dashboard.php",
				data: {
					data_inicial: $('#data_inicial').val(),
					data_final: $('#data_final').val(),
					grafico: 2,
					estado: e.item.dataContext.estado,
				},
				dataType: "json",
				type: "post",
				success: function(data){
					table_cidade_conf.clear()
					table_cidade_conf.rows.add(data);
					table_cidade_conf.draw();
				},
			});
	    });

		graph_estado_conf.write("id_grafico_coluna_estados_confirmado");

		table_cidade_conf = $('#id_tabela_cidades_confirmados').DataTable({

			responsive: true,
			data: [],
			columns: [
				{"data":"Cidade"},
				{"data":"HabitantesEstimado"},
				{"data":"Confirmados"},
				{
					"data":null,
					"render": function( data, type, row, meta ) {
						return ((data.Confirmados / data.HabitantesEstimado ) * 100).toFixed(4);
					}
				}
			],
			language: {
				url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json'
			},
		});


		// gráfico comparação brasil
		graph_brasil_comp = new AmCharts.AmSerialChart();
		graph_brasil_comp.categoryField = "data";
		graph_brasil_comp.dataProvider = [];
		graph_brasil_comp.thousandsSeparator = ".";
		graph_brasil_comp.decimalSeparator = ",";

		//linha confirmados do gráfico - GRAPH
		graph = new AmCharts.AmGraph();
		graph.type = "line";
		graph.valueField = "confirmados";
		graph.title = "Confirmados";
		graph.lineThickness = 3;
		graph.bullet = "circle";
		graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
		graph_brasil_comp.addGraph(graph);

		//linha mortes do gráfico - GRAPH
		graph = new AmCharts.AmGraph();
		graph.type = "line";
		graph.valueField = "mortes";
		graph.title = "Mortes";
		graph.lineThickness = 3;
		graph.bullet = "circle";
		graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
		// graph.fillAlphas = 1;
		// graph.lineAlpha = 0;
		graph_brasil_comp.addGraph(graph);

		//eixo x
		axis = graph_brasil_comp.categoryAxis;
		axis.title = "Datas";

		var chartCursor = new AmCharts.ChartCursor();
	    chartCursor.cursorAlpha = 0;
	    chartCursor.zoomable = true;
	    chartCursor.categoryBalloonEnabled = false;
	    graph_brasil_comp.addChartCursor(chartCursor);

	    var chartLegend = new AmCharts.AmLegend();
	    chartLegend.useGraphSettings = true;
	    chartLegend.valueText = "";
	    graph_brasil_comp.addLegend(chartLegend);

		graph_brasil_comp.write("id_grafico_linha_br_comp");

		// gráfico comparação estados
		graph_estados_comp = new AmCharts.AmSerialChart();
		graph_estados_comp.categoryField = "estado";
		graph_estados_comp.dataProvider = [];
		graph_estados_comp.thousandsSeparator = ".";
		graph_estados_comp.decimalSeparator = ",";

		//linha confirmados do gráfico - GRAPH
		graph = new AmCharts.AmGraph();
		graph.type = "line";
		graph.valueField = "confirmados";
		graph.title = "Confirmados";
		graph.lineThickness = 3;
		graph.bullet = "circle";
		graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
		graph.fillAlphas = 1;
		graph_estados_comp.addGraph(graph);

		//linha mortes do gráfico - GRAPH
		graph = new AmCharts.AmGraph();
		graph.type = "line";
		graph.valueField = "mortes";
		graph.title = "Mortes";
		graph.lineThickness = 3;
		graph.bullet = "circle";
		graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
		graph.fillAlphas = 1;
		// graph.lineAlpha = 0;
		graph_estados_comp.addGraph(graph);

		//eixo x
		axis = graph_estados_comp.categoryAxis;
		axis.title = "Estados";

		var chartCursor = new AmCharts.ChartCursor();
	    chartCursor.cursorAlpha = 0;
	    chartCursor.zoomable = true;
	    chartCursor.categoryBalloonEnabled = false;
	    graph_estados_comp.addChartCursor(chartCursor);

	    var chartLegend = new AmCharts.AmLegend();
	    chartLegend.useGraphSettings = true;
	    chartLegend.valueText = "";
	    graph_estados_comp.addLegend(chartLegend);

		graph_estados_comp.write("id_grafico_estados_comp");

		carregarGraficos();

	});


	function carregarGraficos()
	{
		$.ajax({
			url: "application/dashboard.php",
			data: {
				data_inicial: $('#data_inicial').val(),
				data_final: $('#data_final').val(),
				grafico: 1,
			},
			dataType: "json",
			type: "post",
			success: function(data){
				graph_brasil_conf.dataProvider = data;
				graph_brasil_conf.validateNow(true);

				graph_brasil_comp.dataProvider = data;
				graph_brasil_comp.validateNow(true);
			}
		});

		$.ajax({
			url: "application/dashboard.php",
			data: {
				data_inicial: $('#data_inicial').val(),
				data_final: $('#data_final').val(),
				grafico: 2,
			},
			dataType: "json",
			type: "post",
			success: function(data){
				graph_estado_conf.dataProvider = data;
				graph_estado_conf.validateNow(true);

				graph_estados_comp.dataProvider = data;
				graph_estados_comp.validateNow(true);

				$('#id_cidades_confirmados').css('display','none');
			}
		});

	}

	$('#id_btn_filtro').click(function(){

		carregarGraficos();
	})
});

// [
// 	{
// 		"data": "2021-07-21 00:00:00",
// 		"confirmados": 19484572,
// 		"mortes": 545932
// 	},
// 	{
// 		"data": "2021-07-22 00:00:00",
// 		"confirmados": 19533253,
// 		"mortes": 547362
// 	},
// 	{
// 		"data": "2021-07-23 00:00:00",
// 		"confirmados": 19640373,
// 		"mortes": 548654
// 	}
// ]
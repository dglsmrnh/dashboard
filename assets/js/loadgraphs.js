
$(document).ready(function(){

    var chartData = [
        {
            "country": "USA",
            "visits": 4025,
            "color": "#FF0F00"
        },
        {
            "country": "China",
            "visits": 1882,
            "color": "#FF6600"
        },
        {
            "country": "Japan",
            "visits": 1809,
            "color": "#FF9E01"
        },
        {
            "country": "Germany",
            "visits": 1322,
            "color": "#FCD202"
        },
        {
            "country": "UK",
            "visits": 1122,
            "color": "#F8FF01"
        },
        {
            "country": "France",
            "visits": 1114,
            "color": "#B0DE09"
        },
        {
            "country": "India",
            "visits": 984,
            "color": "#04D215"
        },
        {
            "country": "Spain",
            "visits": 711,
            "color": "#0D8ECF"
        },
        {
            "country": "Netherlands",
            "visits": 665,
            "color": "#0D52D1"
        },
        {
            "country": "Russia",
            "visits": 580,
            "color": "#2A0CD0"
        },
        {
            "country": "South Korea",
            "visits": 443,
            "color": "#8A0CCF"
        },
        {
            "country": "Canada",
            "visits": 441,
            "color": "#CD0D74"
        },
        {
            "country": "Brazil",
            "visits": 395,
            "color": "#754DEB"
        },
        {
            "country": "Italy",
            "visits": 386,
            "color": "#DDDDDD"
        },
        {
            "country": "Australia",
            "visits": 384,
            "color": "#999999"
        },
        {
            "country": "Taiwan",
            "visits": 338,
            "color": "#333333"
        },
        {
            "country": "Poland",
            "visits": 328,
            "color": "#000000"
        }
    ];

    var grafico_coluna;

    AmCharts.ready(function(){
    	//COLUMN CHART
    	grafico_coluna = new AmCharts.AmSerialChart();	//cria o gr??fico de coluna
    	// grafico_coluna.dataProvider = chartData;	// informa quais os dados do gr??fico
    	grafico_coluna.categoryField = 'country';	// qual a categoria, ou o eixo x do gr??fico
    	grafico_coluna.depth3D = 20;
    	grafico_coluna.angle = 30;
    	grafico_coluna['dataLoader'] = {	// extens??o para carregar arquivos via ajax
    		"url": "datagraph.json",
    		"format":"json",
    	},
    	grafico_coluna['export'] = {		// extens??o para exportar arquivos
    		"enabled":true,
    	}


    	console.log(AmCharts.export);

    	//GRAPH
    	graph = new AmCharts.AmGraph();	// cria o elemento graph, respons??vel por criar as colunas
    	graph.valueField = 'visits';	// qual o valor, ou o eixo y do grafico
    	graph.type = 'column';			// tipo do gr??fico - column, line etc.
    	graph.balloonText = '<span>[[value]] - [[category]]</span>';	// caixa de ajuda no topo do gr??fico
    	graph.lineAlpha = 1;	// opacidade da borda da coluna
    	graph.fillAlphas = 1;	// opacidade do preenchimento da coluna
    	grafico_coluna.addGraph(graph);	// adiciona as configura????es da coluna ao gr??fico


    	//CURSOR
    	cursor = new AmCharts.ChartCursor();	//cria o elemento que ajuda a definir as a????es dentro do gr??fico
    	cursor.cursorAlpha = 0;
    	grafico_coluna.addChartCursor(cursor);	// adiciona as configura????es de cursor ao gr??fico

    	//AXIS - EIXO X
    	axis = grafico_coluna.categoryAxis;
    	axis.title = "Pa??ses";

    	//EIXO Y
    	axis = new AmCharts.ValueAxis();
    	axis.title = "Visitas";
    	grafico_coluna.addValueAxis(axis);


    	//CHAMAR EVENTO
    	grafico_coluna.addListener('clickGraphItem',function(e){

    		if( e.item.dataContext.country == 'Brazil'){
    			// $('#tabela').css('display','block');
    			alert(e.item.dataContext.country)
    		}
    	})

    	//CONSTROI O GRAFICO
    	grafico_coluna.write("column_graph");	// constroi o grafico dentro do container de id='column_graph'

    	//------------------------------------------------------------------------------------------------

    	//PIE CHART
    	pie_graph = new AmCharts.AmPieChart(); //cria o gr??fico de pizza
    	pie_graph.dataProvider = chartData;
    	pie_graph.titleField = 'country';	//fatias do gr??fico de pizza
    	pie_graph.valueField = 'visits';	//valor (tamanho) de cada fatia
    	pie_graph.balloonText = '[[title]] <strong>[[value]] [[percents]]%</strong>';	// descri????o quando voc?? passa o mouse em cima
    	pie_graph.depth3D = 20;
    	pie_graph.angle = 30;
    	pie_graph.innerRadius = "50%";

    	//LEGENDA
    	legend = new AmCharts.AmLegend();	// cria legenda para gr??fico
    	legend.position = "right";
    	pie_graph.addLegend(legend);	// adiciona as configura????es de legenda ao gr??fico

    	//CONSTROI O GRAFICO
    	pie_graph.write("pizza");

    	//------------------------------------------------------------------------------------------------

    	//LINE CHART
    	line_graph = new AmCharts.AmSerialChart();
    	line_graph.dataProvider = chartData;
    	line_graph.categoryField = "country";

    	//GRAPH
    	graph = new AmCharts.AmGraph();
    	graph.type = "line";
    	graph.valueField = "visits";
    	graph.bullet = "diamond";
    	graph.balloonText = '<span>[[value]] - [[category]]</span>';	// caixa de ajuda no topo do gr??fico
    	graph.lineThickness = 3;
    	line_graph.addGraph(graph);

    	//AXIS - EIXO X
    	axis = line_graph.categoryAxis;
    	axis.title = "Pa??ses";

    	//EIXO Y
    	axis = new AmCharts.ValueAxis();
    	axis.title = "Visitas";
    	line_graph.addValueAxis(axis);

    	//TITULO
    	line_graph.addTitle("Gr??fico em linhas",14);
    	line_graph.addTitle("utilizando os mesmos dados",10);

    	//CONSTROI GRAFICO
    	line_graph.write("linha");

    });


    // AmCharts.ready(function () {
    //     // SERIAL CHART
    //     chart = new AmCharts.AmSerialChart();
    //     chart.dataProvider = chartData;
    //     chart.categoryField = "country";
    //     // the following two lines makes chart 3D
    //     chart.depth3D = 20;
    //     chart.angle = 30;

    //     // AXES
    //     // category
    //     var categoryAxis = chart.categoryAxis;
    //     categoryAxis.labelRotation = 90;
    //     categoryAxis.dashLength = 5;
    //     categoryAxis.gridPosition = "start";

    //     // value
    //     var valueAxis = new AmCharts.ValueAxis();
    //     valueAxis.title = "Visitors";
    //     valueAxis.dashLength = 5;
    //     chart.addValueAxis(valueAxis);

    //     // GRAPH
    //     var graph = new AmCharts.AmGraph();
    //     graph.valueField = "visits";
    //     graph.colorField = "color";
    //     graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
    //     graph.type = "column";
    //     graph.lineAlpha = 0;
    //     graph.fillAlphas = 1;
    //     chart.addGraph(graph);

    //     // CURSOR
    //     var chartCursor = new AmCharts.ChartCursor();
    //     chartCursor.cursorAlpha = 0;
    //     chartCursor.zoomable = true;
    //     chartCursor.categoryBalloonEnabled = false;
    //     chart.addChartCursor(chartCursor);

    //     chart.creditsPosition = "top-right";

    //     //LEGENDA
    //     var chartLegend = new AmCharts.AmLegend();
    //     chartLegend.markerType = "circle";
    //     chartLegend.align = "right";

    //     chart.addLegend(chartLegend);

    //     // WRITE
    //     chart.write("column_graph");

    //     chart.addListener('clickGraphItem',function(e){
    //     	console.log(e.item.dataContext.country)
    //     });
    // });

    // console.log("Teste");

	// var chart = AmCharts.makeChart("column_graph",{
	//   "type": "serial",
	//   "categoryField": "category",
	//   "categoryAxis": {
	//     "gridPosition": "start"
	//   },
	//   "graphs": [
	//     {
	//       "title": "Graph title",
	//       "valueField": "column-1"
	//     }
	//   ],
	//   "valueAxes": [
	//     {
	//       "title": "Axis title"
	//     }
	//   ],
	//   "legend": {
	//     "useGraphSettings": true
	//   },
	//   "titles": [
	//     {
	//       "size": 15,
	//       "text": "Chart Title"
	//     }
	//   ],
	//   "dataProvider": [
	//     {
	//       "category": "category 1",
	//       "column-1": 8
	//     },
	//     {
	//       "category": "category 2",
	//       "column-1": 10
	//     },
	//   ]
	// });

});
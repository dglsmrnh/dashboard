// carrega tabelas

var dt_table_exemplo;

var loadTables = function(){

	var loadTables = function(){
		dt_table_exemplo = $('#tabela1').DataTable({
			responsive: true
		});
	};

	return {
		init: function(){
			loadTables();
		},
		test(){
			alert("Teste");
		}
	}
}();

$(document).ready(function(){
	console.log(dt_table_exemplo);
	loadTables.init();
	console.log(dt_table_exemplo);
	
	$('#tabela1').on( 'draw', function () {
		console.log( 'Redraw occurred at: '+new Date().getTime() );
	} );

});



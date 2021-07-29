// variavel que guarda um JSON
var dados = [{
		"id": "1",
		"name": "Tiger Nixon",
		"position": "System Architect",
		"salary": "$320,800",
		"start_date": "2011/04/25",
		"office": "Edinburgh",
		"extn": "5421"
	},
	{
		"id": "1",
		"name": "Tiger Nixon",
		"position": "System Architect",
		"salary": "$320,800",
		"start_date": "2011/04/25",
		"office": "Edinburgh",
		"extn": "5421"
	},
	{
		"id": "1",
		"name": "Tiger Nixon",
		"position": "System Architect",
		"salary": "$320,800",
		"start_date": "2011/04/25",
		"office": "Edinburgh",
		"extn": "5421"
	},
	{
		"id": "1",
		"name": "Tiger Nixon",
		"position": "System Architect",
		"salary": "$320,800",
		"start_date": "2011/04/25",
		"office": "Edinburgh",
		"extn": "5421"
	},
	{
		"id": "1",
		"name": "Tiger Nixon",
		"position": "Student",
		"salary": "$320,800",
		"start_date": "2011/04/25",
		"office": "Edinburgh",
		"extn": "5421"
	},
	{
		"id": "1",
		"name": "Tiger Nixon",
		"position": "System Architect",
		"salary": "$320,800",
		"start_date": "2011/04/25",
		"office": "Edinburgh",
		"extn": "5421"
	},
	{
		"id": "1",
		"name": "Tiger Nixon",
		"position": "System Architect",
		"salary": "$320,800",
		"start_date": "2011/04/25",
		"office": "Edinburgh",
		"extn": "5421"
	}
];

// executa somente quando a pagina carrega
$(document).ready(function(){

	// carregaTabelas.init();

	// Carrega DataTable na tabela existente
	var tabela = $('#tabela').DataTable( {
		//opçoes do datatable
		responsive: true,
		paging: true,
		lengthChange: false,
		//ajax: "info.txt",	// busca arquivo ( só funciona se você estiver usando um servidor )
		data: dados,
		columns: [
			{"data":"id"},
			{"data":"name"},
			{"data":"position"},
			{"data":"salary"},
			{"data":"office"},
			{
				"data":null,
				"render": function( data, type, row, meta) {
					// console.log(data.office);

					return '<button class="btn btn-success">Detalhes</button>'
				}
			}
		],
		order: [
				[2,'asc'],
				[1,'desc'],
			   ],
		pageLength: 5,
		language: {
			url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json'
		},
		dom: 'Bfrtip',
		buttons:[
			'excel','pdf','csv'
		],
		rowGroup: {
			dataSrc: "position",
		},
		createdRow: function( linha, info, posicao ){

			if(posicao == 4) {
				$(linha).addClass( 'fw-bold text-danger' );
			}

			if(posicao == 6) {
				$(linha).addClass( 'fw-bold text-success' );
			}
		}

	});


	// eventos do DataTable
	tabela.on('draw', function(){
		console.log('Tabela concluída')
	})


	$('#tabela tbody').on('click', 'td > button', function () {
		// quando clicar em um btão dentro da tabela é aberta uma tabela filha
		console.log("FUNCIONOU")
        var tr = $(this).closest('tr');

        var row = tabela.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            var d = row.data();
            row.child( 
                     '<table id = "child_details" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<thead><tr><th>start_date</th><th>Extn</th></tr></thead><tbody>' +
              '<tr>'+
            '<td>'+d.start_date+':</td>'+
            '<td>'+d.name+'</td>'+
        '</tr>'+
    '</tbody></table>').show();
          
          $('#child_details').DataTable({
            destroy: true,
            scrollY: '100px',
            dom:'rt',
            ordering:false,
          });
            tr.addClass('shown');
        }
    } );
})
// Call the dataTables jQuery plugin
$(document).ready(function() {

  // Setup - add a text input to each footer cell
  $('#dataTable thead tr').clone(true).appendTo( '#dataTable thead' );
  $('#dataTable thead tr:eq(1) th').each( function (i) {
      var title = $(this).text();
      if (title != "Acciones") {
        $(this).html( '<input type="text" class="form-control filter-column-table" placeholder="Buscar '+title+'" />' );
        $(this).css('padding', '5px');
        $( 'input', this ).on( 'keyup change', function () {
          console.log("input: " + this.value)
          console.log(i, table_main.column(i))
            if ( table_main.column(i).search() !== this.value ) {
                table_main
                    .column(i)
                    .search( this.value )
                    .draw();
            }
        } );
      } else {
        $(this).html("");
      }
  } );

  const table_main = $('#dataTable').DataTable({
    bSort: true,
    bPaginate: true,
    bFilter: true,
    orderCellsTop: true,
    fixedHeader: true,
    lengthMenu: [ 5, 7, 10 ],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No hay datos para mostrar",
      info: "Página _PAGE_ de _PAGES_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros)",
      search: "Buscar:",
      paginate: {
        "previous": "Anterior",
        "next": "Siguiente"
      }
    }
  });

});

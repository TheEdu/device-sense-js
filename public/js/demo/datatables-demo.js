// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
    "language": {
      "lengthMenu": "Mostrar _MENU_ registros por página",
      "zeroRecords": "No hay datos para mostrar",
      "info": "Página _PAGE_ de _PAGES_",
      "infoEmpty": "No hay registros disponibles",
      "infoFiltered": "(filtrado de _MAX_ registros)",
      "search": "Buscar:",
      "paginate": {
        "previous": "Anterior",
        "next": "Siguiente"
      }
    }
  });
});

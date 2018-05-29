const swal = require('sweetalert2');

const customSwal = swal.mixin({
    cancelButtonText: 'Отмена',
    confirmButtonClass: 'mx-3 btn btn-lg btn-success float-right',
    cancelButtonClass: 'mx-3 btn btn-lg btn-danger float-left',
    showCancelButton: true,
    buttonsStyling: false,
    reverseButtons: true,
});

module.exports = customSwal;
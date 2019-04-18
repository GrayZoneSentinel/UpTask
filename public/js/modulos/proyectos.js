import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');
if(btnEliminar){
  btnEliminar.addEventListener('click', (e)=> {
    const urlProyecto = e.target.dataset.proyectoUrl;
    // console.log(urlProyecto);
    // return;
    // console.log('Click on remove proyect.')
    Swal.fire({
        title: 'Confirmación de borrado',
        text: "Una vez confirmada, la acción será irreversible!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No, conservar proyecto',
         confirmButtonText: 'Deseo eliminar el proyecto'
      }).then((result) => {
        if (result.value) {
          // Enviar petición a AXIOS
          const url = `${location.origin}/proyectos/${urlProyecto}`;
          axios
          .delete(url, {params: {urlProyecto}})
          .then(function(respuesta){

            Swal.fire(
              'Eliminado!',
              respuesta.data,
              'success'
            );
            setTimeout(()=>{
                window.location.href='/'
            },3000);
          })
          .catch(()=> {
            Swal.fire({
              type: 'error',
              title: 'Se ha producido un error',
              text: 'No se ha eliminado el proyecto'
            })
          });
        }
      })
  })
}

export default btnEliminar;

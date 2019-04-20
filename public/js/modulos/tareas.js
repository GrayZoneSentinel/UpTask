import axios from "axios";
import Swal from 'sweetalert2';
import { actualizarAvance } from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');
if(tareas){
    tareas.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')){
            // console.log('Actualizando...');
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea; 
            // console.log(idTarea);
            // Request hacia Tareas /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            // console.log(url);
            axios.patch(url, {idTarea})
            .then(function(respuesta) {
                // console.log(respuesta);
                if(respuesta.status === 200){
                    icono.classList.toggle('completo');
                    // Llamar a la función de actualización del progreso
                    actualizarAvance();
                }
            });
        };
        if(e.target.classList.contains('fa-trash')) {
            // console.log('Eliminando...');
            const tareaHTML = e.target.parentElement.parentElement,
                  idTarea = tareaHTML.dataset.tarea;
            // console.log(tareaHTML);
            // console.log(idTarea);
            Swal.fire({
                title: 'Confirmación de borrado',
                text: "Una vez confirmada, la tarea será irreversible!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, mantener tarea',
                 confirmButtonText: 'Deseo eliminar la tarea seleccionada'
              }).then((result) => {
                if (result.value) {
                    // Enviar petición a AXIOS
                    const url = `${location.origin}/tareas/${idTarea}`;
                    axios.delete(url, {params: {idTarea}}).then(function(respuesta) {
                        // console.log(respuesta);
                        if(respuesta.status === 200){
                            tareaHTML.parentElement.removeChild(tareaHTML);
                            Swal.fire(
                                'Tarea eliminada',
                                respuesta.data,
                                'success'
                            )
                            // Llamar a la función de actualización del progreso
                            actualizarAvance();
                        }
                    })
                }
              });
        }
    });
}
export default tareas;

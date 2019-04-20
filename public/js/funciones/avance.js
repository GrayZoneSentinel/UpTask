import Swal from 'sweetalert2';

export const actualizarAvance = () => {
    // Get tareas existentes del proyecto
    const tareas = document.querySelectorAll('li.tarea');
    if(tareas.length){
        // Get tareas completadas del proyecto
        const tareasCompletas = document.querySelectorAll('i.completo');
        // Cálculo de la progesión
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100);
        // console.log(avance);
        // Imprimir el estado de progresión del proyecto
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%';
        // console.log(porcentaje);
        // Completo
        if(avance === 100) {
            Swal.fire(
                'Proyecto completo',
                'Felicidades, has completado todas las tareas del proyecto!',
                'success'
            )
        }
    }   

}
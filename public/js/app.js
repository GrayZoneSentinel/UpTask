import proyectos from './modulos/proyectos';
import tareas from './modulos/tareas';
import { actualizarAvance } from './funciones/avance';
// Llamada  a la función de avance para que sea impresa en el HTML
document.addEventListener('DOMContentLoaded', () => {
    actualizarAvance();
    // console.log(actualizarAvance());
});
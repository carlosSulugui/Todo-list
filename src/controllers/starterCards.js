module.exports.starterCards = () => {
    const today = new Date() / 1000;

    const welcome = {
        title: 'Tarjeta de presentación',
        description: `
        Gracias por utilizar nuestra aplicación, esperamos que pueda serle de utilidad. 
        En la tarjeta titulada 'Empecemos' encontrará una breve descripción sobre el uso de esta aplicación
        `,
        date: today,
        completed: false,
    };

    const getStartedDescription =  `
    La aplicación se administra a través del menú de navegación, dicho menú consta de las siguientes opciones(de izquierda a derecha):
    
    Inicio:
    Se representa con el logo de la aplicación(HW App). Aquí, podemos realizar las operaciones CRUD de la aplicación: presionando
    el botón con el signo +, se nos mostrará un formulario para agregar una nueva tarea; cada tarea agregada se irá mostrando en la parte inferior
    del buscador(que podremos utilizar para buscar una tarea específica).

    Las tarjetas que se muestran constan de las siguientes partes:
    - Una cabecera que indica el estado de la tarea(completada, incompletada, pendiente).
    - Titulo de la tarea
    - Dos botones: uno para eliminar la tarea y otro para editarla(este botón muestra un formulario dónde visualizar
        el detalle de la tarea y opciones para actualizar sus atributos).

        
    Para Hoy:
    Está opción permite visualizar las tareas cuya fecha limite de realización coincida con la fecha del día en curso

    Incumplidas:
    Está opción permite visualizar aquellas tareas que no se completaron en el tiempo estipulado.

    Estadísticas:
    Está opción permite visualizar un dashboard donde podemos encontrar: el total de tareas, el total de tareas completadas,
    el total de tareas incompletadas, el total de tareas pendientes y una gráfica que muestra el porcentaje de 
    eficiencia(Este porcentaje de eficiencia se calcula obteniendo el porcentaje que representan la suma de las 
    tareas completadas más las tareas pendientes respecto del total de tareas ).

    Opciones de usuario:
    Por último encontramos un botón que está representado con nuestro nombre de usuario, este botón nos permite
    cerrar sesión en la aplicación.

    
    `
    const getStarted = {
        title: 'Empecemos',
        description: getStartedDescription,
        date: today,
        completed: false
    }

    return {welcome:welcome, getStarted:getStarted};
};
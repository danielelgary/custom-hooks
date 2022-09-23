

export const toDoReducer = ( initialState, action ) => {
    switch (action.type) {
        case 'AGREGAR_NUEVO_TODO':
            /*
                Se puede recurrir a esto, cuando se quiere implementar pero
                aun no se tiene el codigo o se esta trabajando en otro codigo
                pero se sabe que esto debe de quedar e ir aca...

            throw new Error('Action.type = ABC no esta implementada'); 
                
                Recordar que siempre, siempre lo que se debe regresar es un nuevo estado
                tambien recordar que NO SE DEBE mutar (cambiar) el estado, por esto lo que
                se hace es replegar lo que llega por el estado initialState y luego agregarle
                la carga que trae la accion
            */
            return [ ...initialState, action.payload ];
        case 'BORRAR_UN_TODO':
            /*
                Hay que ponerse de acuerdo como se quiere trabajar en el payload y que informacion
                se quiere transportar por este. 
                - Existe la opcion de mandar el objeto completo que se quiere eliminar.
                - Se puede transportar solo el id del objeto que se quiere eliminar.
                Es a gusto y discrecion, sin embargo si se aconseja que siempre siga esta misma logica
                en las demas acciones, para llevar una estructura similar en el manejo de las acciones.

                Tambien surge algo que hay que tener presente y es que si recordamos, la teoria menciona que
                NO SE PUEDE MUTAR el estado, tener cuidado al usar funciones de agregar, borrar, etc... y entender
                cual es la accion que estas funciones realizan antes de usarlas...

                En este caso usaremos el filter el cual si se lee la documentacion, menciona que genera un nuevo
                arreglo luego de filtrar, esto significa que NO MUTA el objeto, sino que CREA uno nuevo
            */

            return initialState.filter( toDo => toDo.id !== action.payload);
        case 'DONE_UN_TODO':
            return initialState.map( toDo => {

                if (toDo.id === action.payload) {
                    return {
                        ...toDo,
                        done: !toDo.done,
                    }
                }

                return toDo;

            });
    
        default:
            return initialState;
            
    }
}
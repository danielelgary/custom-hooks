import { toDoReducer } from './../08-useReducer/toDoReducer'
import { useReducer, useEffect } from 'react'

/*
    Para usar reducer como hemos visto siempre hay que pensar de manera ordenada:
    1. Como va a lucir mi estado inicial? ( initialState )
    2. Generar el reducer (un funcion en un archivo aislado con las caracteristicas)
    3. Importar el reducer y no ejecutarlo, pasarlo al Hook en este caso ya que este
       sera quien maneje el reducer.
    4.
*/

const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Recolectar la piedra del Alma',
    //     done: false,
    // },
    // {
    //     id: new Date().getTime() + 100,
    //     description: 'Recolectar la piedra del Poder',
    //     done: false,
    // }
]

const init = () => {
    return JSON.parse( localStorage.getItem('ToDo') ) || [];
}

export const useToDo = () => {

    const [toDoState, toDoDispatch] = useReducer(toDoReducer, initialState, init)

    //console.log(toDoState)
    /*
        Para guardar data en el local.storage y persistir los datos podemos analizarlo:
        Cuando necesitaria guardar informacion?
        Que informacion necesitaria guardar?
        Quien tiene esta informacion?
        En que momento guardarla y que podriamos usar para esto?
        
        Si miramos, lo que podriamos guardar es la informacion que vamos agregando a la lista de tareas
        a traves del componente <ToDoAdd />
        Ahora, este que informacion trae? -> un toDo con la estructura que necesito
        Como se cuando y quien me ayuda para guardar estos valores?
        Tenemos que pensar que el componente lo que hace es replegar la tarea hasta este componente padre
        quien a traves del manejador, lo añade a los toDo, ahora, el estado del toDoState cambia y esto
        significa que hay un efecto secundario que se esta presentando en ese momento, el cual
        nosotros podriamos utilizar para beneficio y al cambiar, capturar ese efecto secundario y realizar
        el guardado por ejemplo de esa informacion. ( useEffect )
    */

    useEffect(() => {
        /*
            En el local storage no se pueden guardar objetos como tal, pues este funciona como un diccionario
            por esto se serializa en un string  y se guarda de esta manera.

            Tambien hay que entender algo que puede pasar y es que si al reducer no se le pasa la funcion INIT
            que es el tercer parametro que recibe, el useEffect lo que hace es que cuando se recarga el explorador
            detecta un cambio de estado y como el toDoState le entra un initialValue vacio, lo que hace es 
            eliminar los datos guardados previamente, siendo un error bastante comun.

            Lo que entonces se hace es inicializar el reducer usando la funcion de INIT con los datos que 
            previamente existian en el local storage.
        */
      localStorage.setItem('ToDo', JSON.stringify(toDoState));
    }, [toDoState])
    

    const handleNewToDo = ( toDo ) => {
        /*
            Aqui que es donde manejamos lo que devuelve el agregar un nuevo elemento
            es donde deberiamos cargar el payload de una accion que utilice el reducer para
            poder actualizar el estado de la lista
        */
        const action = {
            type: 'AGREGAR_NUEVO_TODO',
            payload: toDo,
        }

        //El dispatch es la funcion que se usa para enviar la accion al reducer
        // se podria entender como que este despacha o dispara la accion hacia el reducer
        toDoDispatch( action );
    }

    const handleDeleteToDo = ( id ) => {
        const action = {
            type: 'BORRAR_UN_TODO',
            payload: id,
        }

        toDoDispatch( action );
    }

    const handleToggleToDo = ( id ) => {
        const action = {
            type: 'DONE_UN_TODO',
            payload: id,
        }

        toDoDispatch( action );
    }


  return {
    toDoState,
    handleNewToDo,
    handleToggleToDo,
    handleDeleteToDo,
    toDoCount : toDoState.length,
    pendingToDo : toDoState.filter( toDo => !toDo.done ).length,
  }
}

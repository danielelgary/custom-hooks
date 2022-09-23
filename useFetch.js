import { useEffect, useState } from "react"


export const useFetch = ( url ) => {

    //Este nos puede ayudar a saber el estado de las cosas que necesito saber
    //de la peticion, como si ya tiene data, si esta cargando, si hubo errores...
    const [state, setState] = useState(
        {
            data: null,
            isLoading: true,
            hasError: null,
        }
    )

    const getFetch = async () => {

        setState(
            {
                ...state,
                isLoading: true,
            }
        );

        const response = await fetch(url);
        const data = await response.json();

        /*
            Recordar que si se modifica el estado y este hace referencia a un objeto
            habra que mandar todas las propiedades, sino, este redibujara el objeto
            quitandole atributos.
        */
        setState(
            {
                data: data,//podria ponerse solo data, ya que el nombre es igual
                isLoading: false,
                hasError: null,
            }
        );
    } 

    useEffect(() => {
      
        getFetch();
    
      return () => {
        
      }
    }, [url])
    

  return {
    data:       state.data,
    isLoading:  state.isLoading,
    hasError:   state.hasError,
  };
}

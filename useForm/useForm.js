import { useState } from "react";

/*
    Para que el formulario no siempre contenga la misma estructura,
    se suele enviar como parametro, un valor inicial como objeto el cual
    contendria en sus atributos todo lo que yo quisiera en el formulario
    y asi se haria muy dinamico el hook, de acuerdo a cada formulario
    dando la posibilidad de usarlo en variedad de aplicaciones, usos, etc...
*/

export const useForm = ( initialForm = {} ) => {

    //Con el initialValue, aseguramos que el estado del formulario
    //sea exactamente igual a lo que se mande en este parametro
    const [formState, setFormState] = useState(
        initialForm
    );

    const onInputChange = ({target}) => {
        const { name, value } = target;

        setFormState(
            {
                ...formState,
                [ name ]: value, 
            }
        );
    }

    const onResetForm = () => {
        setFormState(
            initialForm
        )
    }
    
    return {
        /*
            Recordar que en un custom hook la pregunta es, que necesito exponer
            al mundo exterior, que necesito manipular desde afuera
        */
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        
    }
}

import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = ( initialValue: number ) => {

        const counter = useSignal(initialValue); 

        const increaseCounter = $(()=>{
            counter.value++
        });

        const decreaseCounter = $(()=>{
            counter.value--
        })

        return {
            counter: useComputed$(()=> counter.value), //para que sea de solo lectura y no se pueda modificar en ningun lado
            increaseCounter: increaseCounter,
            decreaseCounter: decreaseCounter,
        }
        
}; 

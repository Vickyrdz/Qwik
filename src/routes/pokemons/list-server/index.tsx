import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <>
        <span>hola</span>
        </>
    )
  
});

//El nombre que aparece en la ventana 
export const head: DocumentHead= {
    title: "List Server",
  };
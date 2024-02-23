import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return(
    <>
    <span>hola client</span>
    </>
  )
});

//El nombre que aparece en la ventana 
export const head: DocumentHead= {
  title: "List Client",
};
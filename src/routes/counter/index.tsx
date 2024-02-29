import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks/useCounter';

export default component$(() => {

  const {counter, decreaseCounter, increaseCounter} = useCounter(1); 

  return(
    <>
        <span>Counter</span>
        <span>{counter}</span>
        <div>
          <button onClick$={()=> decreaseCounter()} class='btn btn-secondary mr-2'>-1</button>
          <button onClick$={()=> increaseCounter()} class='btn btn-secondary'>+1</button>
        </div>
    </>
  )
});
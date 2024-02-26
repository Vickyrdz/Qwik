import { component$, Slot, useContextProvider, useStore, useStyles$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import Navbar from "../components/shared/navbar/navbar";
// import Footer from "../components/shared/footer/footer";

import styles from "./styles.css?inline";
import { PokemonGameContext, PokemonGameState } from "~/context/context";

 
export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
     pokemonId: 1,
     showBackImage: false,
     isVisible: false
  }); 

  //elegimos eso como estado inicial como segunda variable
  useContextProvider( PokemonGameContext, pokemonGame); 
 
  return (
    <>
      <Navbar />
      <main class='flex flex-col items-center justify-center'>
        <Slot />
      </main>
      {/* <Footer /> */}
    </>
  );
});

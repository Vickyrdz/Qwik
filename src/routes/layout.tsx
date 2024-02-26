import { component$, Slot, useContextProvider, useStore, useStyles$ } from "@builder.io/qwik";
import Navbar from "../components/shared/navbar/navbar";
import styles from "./styles.css?inline";
import { PokemonGameContext, PokemonGameState, PokemonListContext, PokemonListState } from "~/context/context";

 
export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
     pokemonId: 1,
     showBackImage: false,
     isVisible: false
  }); 

  //elegimos eso como estado inicial como segundo valor
  useContextProvider( PokemonGameContext, pokemonGame);  


  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: []
  });

  useContextProvider( PokemonListContext, pokemonList);  



 
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

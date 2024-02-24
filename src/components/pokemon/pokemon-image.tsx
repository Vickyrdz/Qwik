import { component$ } from "@builder.io/qwik";

interface Props {
    id: number | string,
    size?: number,
    backImage?: boolean,
    isVisible?: boolean, 
};

export const PokemonImage = component$(({
    id,
    size,
    backImage=false,
    isVisible=false
}: Props) => {



    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    if (backImage) {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
    }; 

    return(
        <div class='flex items-center justify-center'
            style={{ width: size, height: size }}>
         <img width="96" height="96" 
            src={imageUrl}
            style={{ width: size}}
            class={[{ 
            'brightness-0': isVisible
           }, 'transition-all']}>
         </img>
        </div>
    )
}) 
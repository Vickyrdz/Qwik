import { component$ } from "@builder.io/qwik";

interface Props {
    id: number,
    size?: number,
    backImage: boolean
};


export const PokemonImage = component$(({id, size, backImage= false} : Props) => {

    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    if (backImage) {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
    }; 

    return(
        <>
         <img width="96" height="96" src={imageUrl}
           style={{ width: size}}>
         </img>
        </>
    )
}) 
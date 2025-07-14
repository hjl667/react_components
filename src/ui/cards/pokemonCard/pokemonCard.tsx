import React from "react";
import "./styles.css";
interface PokemanCard {
  url: string;
  name: string;
}

interface PokemonCardProps {
  isLoading: boolean;
  data: PokemanCard;
  error: string | undefined | null;
}

const PokemonCard: React.FC<PokemonCardProps> = ({isLoading, data, error}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(error){
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pokemonCard">
      <div className="pokemonCard-image">
        <img src={data.url}></img>
      </div>
      <div className="pokemonCard-name">{data.name}</div>
    </div>
  ) ;
};

export default PokemonCard;

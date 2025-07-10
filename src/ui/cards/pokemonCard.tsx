const PokemonCard = ({isLoading, data, error}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{data.name}</div>;
};

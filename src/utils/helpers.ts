export const getCharacterId = (url: string) => {
  const characterId = url
    .replaceAll("https://swapi.dev/api/people/", "")
    .slice(0, -1);
  return Number(characterId);
};

import { People } from "../types/people";

export const getCharacterId = (url: string) => {
  const characterId = url
    .replaceAll("https://swapi.dev/api/people/", "")
    .slice(0, -1);
  return Number(characterId);
};

export const isMemberAdded = (person: People, AllMembers: People[]) => {
  return AllMembers.find((member) => member.name === person.name)
    ? true
    : false;
};

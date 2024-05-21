export const useQuery = async () => {
  const characters = [];
  for (let i = 1; i <= 42; i++) {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${i}`,
    );
    const data = await response.json();
    characters.push(...data.results);
  }

  // Map to store the character with the most episodes 
  const characterMap = new Map<string, any>();

  characters.forEach((character) => {
    const existingCharacter = characterMap.get(character.name);
    if (
      !existingCharacter ||
      character.episode.length > existingCharacter.episode.length
    ) {
      characterMap.set(character.name, character);
    }
  });

  // Convert the map values to an array
  const filteredCharacters = Array.from(characterMap.values());

  return filteredCharacters;
};

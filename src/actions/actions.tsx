"use server";

export const useQuery = async () => {
    const characters = [];
    for (let i = 1; i <= 42; i++) {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
      const data = await response.json();
      characters.push(...data.results);
      }
    return characters;
  };

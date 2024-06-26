export type Character = {
  id: number;
  name: string;
  image: string;
  episode: string[];
};

export type HomeProps = {
  characters: Character[];
};

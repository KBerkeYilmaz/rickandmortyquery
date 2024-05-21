import type { NextPage } from "next";
import { useQuery } from "@/actions/actions";
import Image from "next/image";

type Character = {
  id: number;
  name: string;
  image: string;
  episode: string[];
};

type HomeProps = {
  characters: Character[];
};

const Home: NextPage<HomeProps> = async () => {
  const characters = await useQuery();

  return (
    <div className="flex h-screen animate-fadeIn flex-col pl-20">
      <h1>Rick and Morty Api</h1>
      <input type="text" className="rounded-lg border-slate-500 border w-80 h-12 px-2" />
      <ul className="border border-slate-500 h-[27rem] w-80 overflow-auto rounded-lg">
        {characters.map((character) => (
          <li key={character.id} className="flex border-b border-slate-500 ">

            <div className="flex items-center justify-center p-2">
              <Image
                src={character.image}
                alt={character.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            <div className="flex h-fit flex-col items-start justify-center py-2">
              <h2 className="text-slate-700">{character.name}</h2>
              <span className="text-xs text-slate-500">
                {character.episode.length} Episodes
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

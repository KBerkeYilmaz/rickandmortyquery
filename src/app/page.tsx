import type { NextPage } from "next";
import { useQuery } from "@/actions/actions";
import { type HomeProps } from "@/lib/types";
import Search from "./_components/Search";

const Home: NextPage<HomeProps> = async () => {
  const characters = await useQuery();

  return (
    <div className="flex h-screen animate-fadeIn flex-col pl-20">
      <h1>Rick and Morty Api</h1>
      <Search characters={characters} />
    </div>
  );
};

export default Home;

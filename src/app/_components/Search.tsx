"use client";
import Image from "next/image";
import { type Character } from "@/lib/types";
import { useState, useEffect, useRef } from "react";
import { getHighlightedText } from "@/lib/helpers/getHighlightedText";

type SearchProps = {
  characters: Character[];
};

const Search = ({ characters }: SearchProps) => {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setFocusedIndex(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (focusedIndex !== null) {
        const selectedCharacter = filteredCharacters[focusedIndex];
        handleCharacterSelect(selectedCharacter.name);
        setSearchTerm("");
      }
    } else if (event.key === "Escape") {
      setSearchTerm("");
      inputRef.current?.blur(); // Remove focus from input
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === filteredCharacters.length - 1
          ? 0
          : prevIndex + 1,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? filteredCharacters.length - 1
          : prevIndex - 1,
      );
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      listRef.current &&
      !listRef.current.contains(event.target as Node)
    ) {
      setSearchTerm("");
      setFocusedIndex(null);
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (focusedIndex !== null && listRef.current) {
      const listItem = listRef.current.children[focusedIndex] as HTMLElement;
      if (listItem) {
        listItem.scrollIntoView({ block: "nearest" });
        listItem.focus();
      }
    }
  }, [focusedIndex]);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCharacterSelect = (characterName: string) => {
    setSelectedCharacters((prev) => {
      if (prev.includes(characterName)) {
        return prev.filter((name) => name !== characterName);
      } else {
        return [...prev, characterName];
      }
    });
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleListItemClick = (characterName: string) => {
    handleCharacterSelect(characterName);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleRemoveCharacter = (characterName: string) => {
    setSelectedCharacters((prev) =>
      prev.filter((name) => name !== characterName),
    );
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        placeholder="Search for a character..."
        className="mb-1 h-12 w-80 rounded-lg border border-slate-500 px-2 shadow-lg shadow-slate-300 focus:outline-offset-0"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        id="search-input"
      />
      <div className="mb-2 flex flex-wrap">
        {selectedCharacters.map((name) => (
          <span
            key={name}
            className="mb-2 mr-2 inline-flex items-center rounded-lg bg-gray-300 py-1 pl-1"
          >
            {name}
            <button
              className="ml-2 mr-1 rounded-lg bg-slate-400 px-2 text-slate-100"
              onClick={() => handleRemoveCharacter(name)}
            >
              X
            </button>
          </span>
        ))}
      </div>
      {searchTerm && (
        <ul
          className={`absolute left-0 top-full h-fit max-h-[27rem] w-80 overflow-auto rounded-lg border border-slate-500 bg-white transition-opacity duration-300 ease-out ${
            searchTerm ? "opacity-1 block" : "hidden opacity-0"
          }`}
          ref={listRef}
          tabIndex={0}
        >
          {filteredCharacters.length === 0 ? (
            <li className="p-2 text-center text-gray-500">
              No character found with this name
            </li>
          ) : (
            filteredCharacters.map((character, index) => (
              <li
                key={character.id}
                className={`flex cursor-pointer border-b border-slate-500 hover:bg-slate-200 ${
                  focusedIndex === index
                    ? "bg-slate-200 focus:outline-none"
                    : ""
                }`}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onClick={() => handleListItemClick(character.name)}
              >
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={selectedCharacters.includes(character.name)}
                  readOnly
                />
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
                  <h2 className="text-slate-700">
                    {getHighlightedText(character.name, searchTerm)}
                  </h2>
                  <span className="text-xs text-slate-500">
                    {character.episode.length} Episodes
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;

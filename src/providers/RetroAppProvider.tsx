/* eslint-disable react-refresh/only-export-components */
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { addPlayerToDB } from "../api/PlayerRequests";
import { getAllPlayersFromDB } from "../api/PlayerRequests";
import { Player } from "../types/interfaces";

interface RetroAppContextType {
  finalScore: number;
  setFinalScore: React.Dispatch<React.SetStateAction<number>>;
  allPlayers: Player[];
  currentScreen: string;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  addPlayerToLeaderBoard: (score: number, name: string) => void;
}

const RetroAppContext = createContext<RetroAppContextType>(
  {} as RetroAppContextType
);

export const RetroAppProvider = ({ children }: { children: ReactNode }) => {
  const [finalScore, setFinalScore] = useState(0);
  const [allPlayers, setAllPlayers] = useState([] as Player[]);
  const [currentScreen, setCurrentScreen] = useState("");

  const refetchAllPlayers = async () => {
    console.log("in the refetch");
    const playersFromDB = await getAllPlayersFromDB();
    setAllPlayers(playersFromDB);
  };

  const addPlayerToLeaderBoard = async (score: number, name: string) => {
    await addPlayerToDB(name, score);
    refetchAllPlayers();
  };

  useEffect(() => {
    refetchAllPlayers();
  }, []);

  return (
    <RetroAppContext.Provider
      value={{
        finalScore,
        setFinalScore,
        allPlayers,
        currentScreen,
        setCurrentScreen,
        addPlayerToLeaderBoard,
      }}
    >
      {children}
    </RetroAppContext.Provider>
  );
};

export const useRetroAppContext = () => useContext(RetroAppContext);

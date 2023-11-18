/* eslint-disable react-refresh/only-export-components */
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
// import { getAllPlayersFromDB } from "../api/PlayerRequests";
import { Player } from "../types/interfaces";

interface RetroAppContextType {
  user: Player | null;
  setUser: React.Dispatch<React.SetStateAction<Player | null>>;
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
  const [user, setUser] = useState<Player | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [allPlayers, setAllPlayers] = useState([] as Player[]);
  const [currentScreen, setCurrentScreen] = useState("");

  const refetchAllPlayers = async () => {
    // const playersFromDB = //await getAllPlayersFromDB();
    // setAllPlayers(playersFromDB);
    setAllPlayers([] as Player[]);
  };

  const addPlayerToLeaderBoard = (score: number, name: string) => {
    console.log(score, name);
  };

  useEffect(() => {
    refetchAllPlayers();
  }, []);

  return (
    <RetroAppContext.Provider
      value={{
        user,
        setUser,
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

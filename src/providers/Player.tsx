/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { getAllPlayersFromDB } from "../api/PlayerRequests";
import { Player } from "../types/interfaces";

interface PlayerContextType {
  user: Player | null;
  setUser: React.Dispatch<React.SetStateAction<Player | null>>;
  finalScore: number;
  setFinalScore: React.Dispatch<React.SetStateAction<number>>;
  allPlayers: Player[];
}

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Player | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [allPlayers, setAllPlayers] = useState([] as Player[]);

  const refetchAllPlayers = async () => {
    const playersFromDB = await getAllPlayersFromDB();
    setAllPlayers(playersFromDB);
  }

  useEffect(() => {
    refetchAllPlayers();
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        user,
        setUser,
        finalScore,
        setFinalScore,
        allPlayers,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);

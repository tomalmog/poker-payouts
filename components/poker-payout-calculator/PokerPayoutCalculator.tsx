"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayerForm } from "@/components/poker-payout-calculator/PlayerForm";
import { ChipDenominations } from "@/components/poker-payout-calculator/ChipDenominations";
import { Leaderboard } from "@/components/poker-payout-calculator/Leaderboard";
import { json2csv } from "json-2-csv";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export type ChipDenomination = {
  color: string;
  value: number;
};

export type Player = {
  id: number;
  name: string;
  buyIns: string;
  chips: { [key: string]: string };
  payout: number | null;
};

export function PokerPayoutCalculator() {
  const [buyInPrice, setBuyInPrice] = useState("10");
  const [totalChips, setTotalChips] = useState("250");
  const [chipDenominations, setChipDenominations] = useState<
    ChipDenomination[]
  >([
    { color: "green", value: 1 },
    { color: "blue", value: 5 },
    { color: "red", value: 25 },
    { color: "white", value: 50 },
  ]);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "", buyIns: "", chips: {}, payout: null },
  ]);
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [isBuyInSectionOpen, setIsBuyInSectionOpen] = useState(false);

  // Save game state to localStorage
  const saveGameState = () => {
    const gameState = {
      buyInPrice,
      totalChips,
      chipDenominations,
      players,
    };
    localStorage.setItem("pokerGameState", JSON.stringify(gameState));
    alert("Game saved successfully!");
  };

  // Load game state from localStorage
  const loadGameState = () => {
    const savedState = localStorage.getItem("pokerGameState");
    if (savedState) {
      const { buyInPrice, totalChips, chipDenominations, players } =
        JSON.parse(savedState);
      setBuyInPrice(buyInPrice);
      setTotalChips(totalChips);
      setChipDenominations(chipDenominations);
      setPlayers(players);
      alert("Game loaded successfully!");
    } else {
      alert("No saved game found!");
    }
  };

  // Calculate payouts without updating state
  const calculatePayouts = useCallback(() => {
    const chipValue = parseFloat(buyInPrice) / parseFloat(totalChips);

    const updatedPlayers = players.map((player) => {
      const totalPot = parseInt(player.buyIns) * parseFloat(buyInPrice);
      let totalChipValue = 0;

      chipDenominations.forEach((chip) => {
        const chipCount = parseFloat(player.chips[chip.color] || "0");
        totalChipValue += chipCount * chip.value;
      });

      const payout = totalChipValue * chipValue - totalPot;

      return { ...player, payout: isNaN(payout) ? 0 : payout };
    });

    return updatedPlayers;
  }, [buyInPrice, totalChips, chipDenominations, players]);

  // Update leaderboard without triggering infinite loops
  useEffect(() => {
    const updatedPlayers = calculatePayouts();
    setLeaderboard(
      [...updatedPlayers].sort((a, b) => (b.payout || 0) - (a.payout || 0))
    );
  }, [calculatePayouts]);

  const addPlayer = () => {
    const newPlayer: Player = {
      id: players.length + 1,
      name: "",
      buyIns: "",
      chips: {},
      payout: null,
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const exportToCSV = () => {
    const csv = json2csv(leaderboard);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "poker_leaderboard.csv";
    link.click();
  };

  return (
    <div>
      <Card className="w-full max-w-md mx-auto bg-white text-black">
        <CardHeader>
          <CardTitle>Poker Payout Calculator</CardTitle>
          <CardDescription>
            Calculate payouts for multiple players based on buy-ins and chips
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center"
              onClick={() => setIsBuyInSectionOpen(!isBuyInSectionOpen)}
            >
              <span>Buy-in Settings</span>
              {isBuyInSectionOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </Button>
            <AnimatePresence>
              {isBuyInSectionOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <ChipDenominations
                    chipDenominations={chipDenominations}
                    setChipDenominations={setChipDenominations}
                    isBuyInSectionOpen={isBuyInSectionOpen}
                    setIsBuyInSectionOpen={setIsBuyInSectionOpen}
                    buyInPrice={buyInPrice}
                    setBuyInPrice={setBuyInPrice}
                    totalChips={totalChips}
                    setTotalChips={setTotalChips}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {players.map((player) => (
            <PlayerForm
              key={player.id}
              player={player}
              setPlayers={setPlayers}
              chipDenominations={chipDenominations}
              removePlayer={removePlayer}
            />
          ))}
          <div className="flex gap-2 flex-wrap flex items-center justify-center">
            <Button size="sm" onClick={addPlayer}>
              Add Player
            </Button>
            <Button size="sm" onClick={exportToCSV}>
              Export to CSV
            </Button>
            <Button size="sm" onClick={saveGameState}>
              Save Game
            </Button>
            <Button size="sm" onClick={loadGameState}>
              Load Game
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <Button
            className="w-full"
            onClick={() =>
              setLeaderboard(
                [...calculatePayouts()].sort(
                  (a, b) => (b.payout || 0) - (a.payout || 0)
                )
              )
            }
          >
            Calculate Payouts
          </Button>
          <Leaderboard leaderboard={leaderboard} />
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react"; // Icons for expand/collapse

type ChipDenomination = {
  color: string;
  value: number;
};

type Player = {
  id: number;
  name: string;
  buyIns: string; // Unique buy-ins for each player
  chips: { [key: string]: string }; // Dynamic chip counts based on chip colors
  payout: number | null;
};

export function PokerPayoutCalculator() {
  const [buyInPrice, setBuyInPrice] = useState("10"); // Default buy-in price
  const [totalChips, setTotalChips] = useState("250"); // Default total chips
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
  const [isBuyInSectionOpen, setIsBuyInSectionOpen] = useState(false); // State for expand/collapse

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

  const addChip = () => {
    const newChip: ChipDenomination = { color: "", value: 0 };
    setChipDenominations([...chipDenominations, newChip]);
  };

  const removeChip = (index: number) => {
    setChipDenominations(chipDenominations.filter((_, i) => i !== index));
  };

  const calculatePayouts = () => {
    const chipValue = parseFloat(buyInPrice) / parseFloat(totalChips);

    const updatedPlayers = players.map((player) => {
      const totalPot = parseInt(player.buyIns) * parseFloat(buyInPrice);
      let totalChipValue = 0;

      // Calculate total chip value for the player
      chipDenominations.forEach((chip) => {
        const chipCount = parseFloat(player.chips[chip.color] || "0");
        totalChipValue += chipCount * chip.value;
      });

      const payout = totalChipValue * chipValue - totalPot;

      return { ...player, payout };
    });

    setPlayers(updatedPlayers);
    setLeaderboard(
      [...updatedPlayers].sort((a, b) => (b.payout || 0) - (a.payout || 0))
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
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
          {isBuyInSectionOpen && (
            <>
              <div className="space-y-2 ">
                <Label htmlFor="buyInPrice">Buy-in Price ($)</Label>
                <Input
                  id="buyInPrice"
                  type="number"
                  placeholder="Enter buy-in price"
                  value={buyInPrice}
                  onChange={(e) => setBuyInPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalChips">Total Chips</Label>
                <Input
                  id="totalChips"
                  type="number"
                  placeholder="Enter total chips"
                  value={totalChips}
                  onChange={(e) => setTotalChips(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Chip Denominations</Label>
                {chipDenominations.map((chip, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Chip color"
                      value={chip.color}
                      onChange={(e) =>
                        setChipDenominations((prev) =>
                          prev.map((c, i) =>
                            i === index ? { ...c, color: e.target.value } : c
                          )
                        )
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Chip value"
                      value={chip.value}
                      onChange={(e) =>
                        setChipDenominations((prev) =>
                          prev.map((c, i) =>
                            i === index
                              ? { ...c, value: parseFloat(e.target.value) }
                              : c
                          )
                        )
                      }
                    />
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => removeChip(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button onClick={addChip}>Add Chip</Button>
              </div>
            </>
          )}
        </div>
        {players.map((player) => (
          <div key={player.id} className="space-y-2 border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <Label htmlFor={`player-${player.id}`}>Player {player.id}</Label>
              <Button
                variant="default"
                size="sm"
                onClick={() => removePlayer(player.id)}
              >
                Remove
              </Button>
            </div>
            <Input
              id={`name-${player.id}`}
              type="text"
              placeholder="Player name"
              value={player.name}
              onChange={(e) =>
                setPlayers((prev) =>
                  prev.map((p) =>
                    p.id === player.id ? { ...p, name: e.target.value } : p
                  )
                )
              }
            />
            <Input
              id={`buyIns-${player.id}`}
              type="number"
              placeholder="Number of buy-ins"
              value={player.buyIns}
              onChange={(e) =>
                setPlayers((prev) =>
                  prev.map((p) =>
                    p.id === player.id ? { ...p, buyIns: e.target.value } : p
                  )
                )
              }
            />
            {chipDenominations.map((chip) => (
              <Input
                key={chip.color}
                id={`${chip.color}-${player.id}`}
                type="number"
                placeholder={`${chip.color} chips (${chip.value})`}
                value={player.chips[chip.color] || ""}
                onChange={(e) =>
                  setPlayers((prev) =>
                    prev.map((p) =>
                      p.id === player.id
                        ? {
                            ...p,
                            chips: { ...p.chips, [chip.color]: e.target.value },
                          }
                        : p
                    )
                  )
                }
              />
            ))}
          </div>
        ))}
        <Button onClick={addPlayer}>Add Player</Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button className="w-full" onClick={calculatePayouts}>
          Calculate Payouts
        </Button>
        {leaderboard.length > 0 && (
          <div className="mt-4 w-full">
            <h3 className="text-lg font-semibold">Leaderboard</h3>
            <ul className="space-y-2">
              {leaderboard.map((player) => (
                <li key={player.id} className="flex justify-between">
                  <span>{player.name || `Player ${player.id}`}</span>
                  <span>${player.payout?.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

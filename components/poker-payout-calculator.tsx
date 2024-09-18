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

export function PokerPayoutCalculator() {
  const [buyIns, setBuyIns] = useState("");
  const [buyInValue, setBuyInValue] = useState("");
  const [whites, setWhites] = useState("");
  const [reds, setReds] = useState("");
  const [blues, setBlues] = useState("");
  const [greens, setGreens] = useState("");
  const [payout, setPayout] = useState<number | null>(null);

  const calculatePayout = () => {
    const totalPot = parseInt(buyIns) * parseFloat(buyInValue);
    const chipValue = parseInt(buyInValue) / 250;
    const userPayout =
      (parseInt(whites) * 50 +
        parseInt(reds) * 25 +
        parseInt(blues) * 5 +
        parseInt(greens)) *
        1 *
        chipValue -
      totalPot;

    setPayout(userPayout);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Poker Payout Calculator</CardTitle>
        <CardDescription>
          Calculate your payout based on buy-ins and chips
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="buyIns">Number of Buy-ins</Label>
          <Input
            id="buyIns"
            type="number"
            placeholder="Enter number of buy-ins"
            value={buyIns}
            onChange={(e) => setBuyIns(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buyInValue">Value of Each Buy-in ($)</Label>
          <Input
            id="buyInValue"
            type="number"
            placeholder="Enter buy-in value"
            value={buyInValue}
            onChange={(e) => setBuyInValue(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="chips">Your Chip Counts</Label>
          <Input
            id="whites"
            type="number"
            placeholder="Enter number of white chips"
            value={whites}
            onChange={(e) => setWhites(e.target.value)}
          />
          <Input
            id="reds"
            type="number"
            placeholder="Enter number of red chips"
            value={reds}
            onChange={(e) => setReds(e.target.value)}
          />
          <Input
            id="blues"
            type="number"
            placeholder="Enter number of blue chips"
            value={blues}
            onChange={(e) => setBlues(e.target.value)}
          />
          <Input
            id="greens"
            type="number"
            placeholder="Enter number of greens chips"
            value={greens}
            onChange={(e) => setGreens(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button className="w-full" onClick={calculatePayout}>
          Calculate Payout
        </Button>
        {payout !== null && (
          <div className="mt-4 text-lg font-semibold">
            Your Payout: ${payout.toFixed(2)}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

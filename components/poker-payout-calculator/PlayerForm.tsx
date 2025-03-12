import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Player, ChipDenomination } from "./PokerPayoutCalculator";

type PlayerFormProps = {
  player: Player;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  chipDenominations: ChipDenomination[];
  removePlayer: (id: number) => void;
};

export function PlayerForm({
  player,
  setPlayers,
  chipDenominations,
  removePlayer,
}: PlayerFormProps) {
  // Handle changes to the player's name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.id === player.id ? { ...p, name: e.target.value } : p
      )
    );
  };

  // Handle changes to the player's buy-ins
  const handleBuyInsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.id === player.id ? { ...p, buyIns: e.target.value } : p
      )
    );
  };

  // Handle changes to the player's chips
  const handleChipChange = (color: string, value: string) => {
    console.log(player.chips);
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.id === player.id
          ? {
              ...p,
              chips: {
                ...p.chips,
                [color]: value,
              },
            }
          : p
      )
    );
  };

  return (
    <div className="space-y-2 border p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <Label htmlFor={`player-${player.id}`}>Player {player.id}</Label>
        <Button
          variant="destructive"
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
        onChange={handleNameChange}
      />
      <Input
        id={`buyIns-${player.id}`}
        type="number"
        placeholder="Number of buy-ins"
        value={player.buyIns}
        onChange={handleBuyInsChange}
      />
      {chipDenominations.map((chip) => (
        <Input
          key={chip.color}
          id={`${chip.color}-${player.id}`}
          type="number"
          placeholder={`${chip.color} chips (${chip.value})`}
          value={player.chips[chip.color] || ""}
          onChange={(e) => handleChipChange(chip.color, e.target.value)}
        />
      ))}
    </div>
  );
}

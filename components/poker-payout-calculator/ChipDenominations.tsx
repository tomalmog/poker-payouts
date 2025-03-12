import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChipDenomination } from "./PokerPayoutCalculator";

type ChipDenominationsProps = {
  chipDenominations: ChipDenomination[];
  setChipDenominations: React.Dispatch<
    React.SetStateAction<ChipDenomination[]>
  >;
  isBuyInSectionOpen: boolean;
  setIsBuyInSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buyInPrice: string;
  setBuyInPrice: React.Dispatch<React.SetStateAction<string>>;
  totalChips: string;
  setTotalChips: React.Dispatch<React.SetStateAction<string>>;
};

export function ChipDenominations({
  chipDenominations,
  setChipDenominations,
  isBuyInSectionOpen,
  setIsBuyInSectionOpen,
  buyInPrice,
  setBuyInPrice,
  totalChips,
  setTotalChips,
}: ChipDenominationsProps) {
  const addChip = () => {
    const newChip: ChipDenomination = { color: "", value: 0 };
    setChipDenominations([...chipDenominations, newChip]);
  };

  const removeChip = (index: number) => {
    setChipDenominations(chipDenominations.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="space-y-2">
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
              variant="destructive"
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
  );
}

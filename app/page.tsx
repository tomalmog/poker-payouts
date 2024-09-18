import { PokerPayoutCalculator } from "@/components/poker-payout-calculator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="m-8">
      <PokerPayoutCalculator />
    </div>
  );
}

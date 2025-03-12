import { PokerPayoutCalculator } from "../components/poker-payout-calculator/PokerPayoutCalculator";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <PokerPayoutCalculator />
    </div>
  );
}

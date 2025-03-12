import { Player } from "./PokerPayoutCalculator";

type LeaderboardProps = {
  leaderboard: Player[];
};

export function Leaderboard({ leaderboard }: LeaderboardProps) {
  return (
    <div className="mt-4 w-full">
      <h3 className="text-lg font-semibold">Leaderboard</h3>
      <ul className="space-y-2">
        {leaderboard.map((player) => (
          <li key={player.id} className="flex justify-between">
            <span>{player.name || `Player ${player.id}`}</span>
            <span>${(player.payout ?? 0).toFixed(2)}</span>{" "}
            {/* Display $0.00 for NaN */}
          </li>
        ))}
      </ul>
    </div>
  );
}

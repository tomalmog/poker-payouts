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
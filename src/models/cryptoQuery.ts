/* eslint-disable no-use-before-define */
export interface ISerachQuery {
  coins: ICoin[];
  exchanges: Exchange[];
  categories: Category[];
  nfts: Nft[];
}

export interface Category {
  id: number;
  name: string;
}

export interface ICoin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  large: string;
}

export interface Exchange {
  id: string;
  name: string;
  market_type: string;
  thumb: string;
  large: string;
}

export interface Nft {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

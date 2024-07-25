import React from "react";

// OBJECTS

export interface CryptoItem {
  id: string;
  name: string;
  index: number;
}

export interface CryptoItemWithPrice extends CryptoItem {
  price: number;
}

// PROPS

export interface CryptoCardProps {
  cryptoItem: CryptoItem;
  cryptoListToSuggest: CryptoItem[];
  cryptoListPinned: CryptoItemWithPrice[];
  modalVisibility: boolean;
  setCryptoListToSuggest: React.Dispatch<React.SetStateAction<CryptoItem[]>>;
  setCryptoListPinned: React.Dispatch<
    React.SetStateAction<CryptoItemWithPrice[]>
  >;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  wrapperPrimaryRef: React.RefObject<HTMLDivElement>;
  priceModalRef: React.RefObject<HTMLDivElement>;
}

export interface CryptoCardPinnedProps extends CryptoCardProps {
  cryptoItem: CryptoItemWithPrice;
}

export interface InputCryptoCodeProps {
  cryptoCode: string;
  cryptoList: CryptoItem[];
  cryptoListPinned: CryptoItemWithPrice[];
  modalVisibility: boolean;
  setCryptoCode: React.Dispatch<React.SetStateAction<string>>;
  setCryptoListToSuggest: React.Dispatch<React.SetStateAction<CryptoItem[]>>;
}

export interface PriceModalProps {
  cryptoItem: CryptoItemWithPrice | null;
  setCryptoItemWithPrice: React.Dispatch<
    React.SetStateAction<CryptoItemWithPrice | null>
  >;
}

export interface MainProps {
  wrapperPrimaryRef: React.RefObject<HTMLDivElement>;
}

import React from "react";
import axios from "axios";
import { CryptoItem } from "../data/interfaces";

export const fetchCryptoItems = (
  setCryptoList: React.Dispatch<React.SetStateAction<CryptoItem[]>>,
  setCryptoListToSuggest: React.Dispatch<React.SetStateAction<CryptoItem[]>>
) => {
  axios
    .get(import.meta.env.VITE_API_CRYPTO_LIST)
    .then((fetchedCryptoList) => {
      const initialCryptoList: CryptoItem[] = fetchedCryptoList.data.map(
        (item: any, index: number) => ({
          id: item.id,
          name: item.name,
          index: index,
        })
      );
      setCryptoList(initialCryptoList);
      setCryptoListToSuggest([...initialCryptoList]);
    })
    .catch((error: any) => {
      console.error("Error in fetching crypto items", error);
    });
};

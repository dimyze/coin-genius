import styles from "./CryptoSuggestCard.module.css";
import axios from "axios";

import {
  CryptoItem,
  CryptoCardProps,
  CryptoItemWithPrice,
} from "../../data/interfaces";
import PriceModal from "../priceModal/PriceModal";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

function CryptoSuggestCard({
  cryptoItem,
  cryptoListToSuggest,
  cryptoListPinned,
  modalVisibility,
  setCryptoListToSuggest,
  setCryptoListPinned,
  setModalVisibility,
  wrapperPrimaryRef,
}: CryptoCardProps) {
  // STATES
  const [cryptoItemWithPrice, setCryptoItemWithPrice] =
    useState<CryptoItemWithPrice | null>(null);

  // EFFECTS
  useEffect(() => {
    // toggle modal visibility and background blur behind the modal
    if (cryptoItemWithPrice !== null) {
      setModalVisibility(true);
      wrapperPrimaryRef.current?.classList.add("blur");
    } else {
      setModalVisibility(false);
      wrapperPrimaryRef.current?.classList.remove("blur");
    }
  }, [cryptoItemWithPrice]);

  // EVENT HANDLERS
  const handleAddToPinned = useCallback(async () => {
    const newCryptoListToSuggest = cryptoListToSuggest.filter(
      (oldCryptoItem: CryptoItem) => oldCryptoItem.id !== cryptoItem.id
    );
    const newCryptoListPinned = [...cryptoListPinned];
    const result: any = await axios.get(
      `${import.meta.env.VITE_API_CRYPTO_PRICE}${cryptoItem.id}-usd/spot`
    );
    newCryptoListPinned.push({
      ...cryptoItem,
      price: result.data.data.amount,
    });
    setCryptoListToSuggest(newCryptoListToSuggest);
    setCryptoListPinned(newCryptoListPinned);
    window.localStorage.setItem(
      "cryptoListPinned",
      JSON.stringify(newCryptoListPinned)
    );
  }, [cryptoListToSuggest, cryptoListPinned]);

  const handleViewPrice = useCallback(() => {
    wrapperPrimaryRef.current?.classList.add("blur");
    axios
      .get(`${import.meta.env.VITE_API_CRYPTO_PRICE}${cryptoItem.id}-usd/spot`)
      .then((response: any) => {
        setCryptoItemWithPrice({
          ...cryptoItem,
          price: response.data.data.amount,
        });
      })
      .catch((error: any) => {
        console.error(`Error in fetching price of ${cryptoItem.id}`, error);
      });
  }, []);

  return (
    <div key={cryptoItem.id} className={styles.wrapper}>
      <span className={styles.cryptoId}>{cryptoItem.id}</span>{" "}
      <span className={styles.cryptoName}>{cryptoItem.name}</span>
      <div className={styles.wrapperActions}>
        {!modalVisibility && (
          <>
            <button className={styles.cryptoPin} onClick={handleViewPrice}>
              Current Price
            </button>
            <button className={styles.cryptoPin} onClick={handleAddToPinned}>
              Pin to Dashboard
            </button>
          </>
        )}
      </div>
      {/* USED REACT PORTAL TO RENDER THE MODAL IN document.body */}
      {cryptoItemWithPrice !== null &&
        createPortal(
          <PriceModal
            cryptoItem={cryptoItemWithPrice}
            setCryptoItemWithPrice={setCryptoItemWithPrice}
          />,
          document.body
        )}
    </div>
  );
}

export default CryptoSuggestCard;

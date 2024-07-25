import styles from "./CryptoPinnedCard.module.css";

import { CryptoItem, CryptoCardPinnedProps } from "../../data/interfaces";

function CryptoPinnedCard({
  cryptoItem,
  cryptoListToSuggest,
  cryptoListPinned,
  modalVisibility,
  setCryptoListToSuggest,
  setCryptoListPinned,
}: CryptoCardPinnedProps) {
  // EVENT HANDLERS
  const handleRemoveFromPinned = () => {
    const newCryptoListToSuggest = [...cryptoListToSuggest];
    newCryptoListToSuggest.push(cryptoItem);
    newCryptoListToSuggest.sort((a, b) => a.index - b.index);
    const newCryptoListPinned = cryptoListPinned.filter(
      (oldCryptoitem: CryptoItem) => oldCryptoitem.id !== cryptoItem.id
    );
    setCryptoListToSuggest(newCryptoListToSuggest);
    setCryptoListPinned(newCryptoListPinned);
    window.localStorage.setItem(
      "cryptoListPinned",
      JSON.stringify(newCryptoListPinned)
    );
  };

  return (
    <div key={cryptoItem.id} className={styles.wrapper}>
      <span className={styles.cryptoId}>{cryptoItem.id}</span>{" "}
      <div>
        <p className={styles.cryptoName}>{cryptoItem.name}</p>
        <p className={styles.cryptoPrice}>${cryptoItem.price}</p>
      </div>
      <div className={styles.wrapperActions}>
        {!modalVisibility && (
          <button className={styles.cryptoPin} onClick={handleRemoveFromPinned}>
            Unpin from Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default CryptoPinnedCard;

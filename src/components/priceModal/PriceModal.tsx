import styles from "./PriceModal.module.css";
import { PriceModalProps } from "../../data/interfaces";
import { useRef } from "react";

function PriceModal({ cryptoItem, setCryptoItemWithPrice }: PriceModalProps) {
  // EVENT HANDLERS
  const handleClose = () => {
    setCryptoItemWithPrice(null);
  };

  // REFS
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.wrapper} ref={modalRef}>
      <div className={styles.details}>
        <span className={styles.cryptoId}>{cryptoItem?.id}</span>
        <div className={styles.wrapperCryptoDetails}>
          <h3 className={styles.cryptoPrice}>${cryptoItem?.price}</h3>
          <p className={styles.cryptoName}>{cryptoItem?.name}</p>
        </div>
      </div>
      <button className={styles.closeModal} onClick={handleClose}>
        Close
      </button>
    </div>
  );
}

export default PriceModal;

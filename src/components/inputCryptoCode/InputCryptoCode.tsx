import {
  InputCryptoCodeProps,
  CryptoItemWithPrice,
  CryptoItem,
} from "../../data/interfaces";
import styles from "./InputCryptoCode.module.css";

function InputCryptoCode({
  cryptoCode,
  cryptoList,
  cryptoListPinned,
  modalVisibility,
  setCryptoCode,
  setCryptoListToSuggest,
}: InputCryptoCodeProps) {
  return (
    <input
      autoFocus
      className={styles.input}
      placeholder="Crypto code [example: BTC]..."
      value={cryptoCode}
      onChange={(event) => {
        const newCryptoCode: string = event.target.value;
        const newCryptoListToSuggest = cryptoList.filter(
          (item: CryptoItem) =>
            item.id.toLowerCase().includes(newCryptoCode.toLowerCase()) &&
            !cryptoListPinned.find(
              (pinnedItem: CryptoItemWithPrice) => pinnedItem.id === item.id
            )
        );
        setCryptoCode(newCryptoCode);
        setCryptoListToSuggest(newCryptoListToSuggest);
      }}
      disabled={modalVisibility}
    />
  );
}

export default InputCryptoCode;

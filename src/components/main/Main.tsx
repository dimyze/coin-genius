import styles from "./Main.module.css";

import axios from "axios";

import {
  MainProps,
  CryptoItem,
  CryptoItemWithPrice,
} from "../../data/interfaces";

import { useState, useRef, useEffect } from "react";

import InputCryptoCode from "../inputCryptoCode/InputCryptoCode";
import CryptoPinnedCard from "../cryptoPinnedCard/CryptoPinnedCard";
import CryptoSuggestCard from "../cryptoSuggestCard/CryptoSuggestCard";

function Main({ wrapperPrimaryRef }: MainProps) {
  // STATES
  const [cryptoCode, setCryptoCode] = useState<string>("");
  const [cryptoList, setCryptoList] = useState<CryptoItem[]>([]);
  const [cryptoListToSuggest, setCryptoListToSuggest] = useState<CryptoItem[]>(
    []
  );
  const [cryptoListPinned, setCryptoListPinned] = useState<
    CryptoItemWithPrice[]
  >([]);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  // REFS
  const priceModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // FUNCTION TO UPDDATE PINNED PRICES
    const updatePinnedPrices = async (
      pinnedCryptoList: CryptoItemWithPrice[]
    ) => {
      const result: Promise<CryptoItemWithPrice>[] = [...pinnedCryptoList].map(
        async (item: CryptoItemWithPrice, index: number) => {
          const response: any = await axios.get(
            `${import.meta.env.VITE_API_CRYPTO_PRICE}${item.id}-usd/spot`
          );
          return {
            ...pinnedCryptoList[index],
            price: response.data.data.amount,
          };
        }
      );
      return await Promise.all(result);
    };

    // CHECK IF THERE ARE PINNED CRYPTOCURRENCIES IN LOCALSTORAGE
    const retrievedPinnedCryptoList: string | null =
      window.localStorage.getItem("cryptoListPinned");
    if (retrievedPinnedCryptoList !== null) {
      const parsedCryptoList: CryptoItemWithPrice[] = JSON.parse(
        retrievedPinnedCryptoList
      );
      updatePinnedPrices(parsedCryptoList).then(
        (result: CryptoItemWithPrice[]) => {
          setCryptoListPinned(result);
        }
      );
    }
    // API CALL TO FETCH ALL THE AVAILABLE CRYPTOCURRENCIES (NAMES AND CODES)
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
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // THE TITLE AND SEARCH BAR SHOULD REMAIN CENTERED WHEN NOTHING IS SEARCHED
    if (cryptoCode.length === 0) {
      wrapperPrimaryRef.current?.classList.add("justifyCenter");
    } else {
      wrapperPrimaryRef.current?.classList.remove("justifyCenter");
    }
  }, [cryptoCode]);

  return (
    <main className={styles.main}>
      {/* SEARCH */}
      <InputCryptoCode
        cryptoCode={cryptoCode}
        cryptoList={cryptoList}
        cryptoListPinned={cryptoListPinned}
        modalVisibility={modalVisibility}
        setCryptoCode={setCryptoCode}
        setCryptoListToSuggest={setCryptoListToSuggest}
      />
      {/* PINNED CRYPTOCURRENCIES */}
      {cryptoListPinned.length > 0 && (
        <div className={styles.wrapperCryptoPinned}>
          <h2 className={styles.heading}>Pinned</h2>
          {cryptoListPinned.map((item: CryptoItemWithPrice) => (
            <CryptoPinnedCard
              key={item.id}
              cryptoItem={item}
              cryptoListToSuggest={cryptoListToSuggest}
              cryptoListPinned={cryptoListPinned}
              modalVisibility={modalVisibility}
              setCryptoListToSuggest={setCryptoListToSuggest}
              setCryptoListPinned={setCryptoListPinned}
              setModalVisibility={setModalVisibility}
              wrapperPrimaryRef={wrapperPrimaryRef}
              priceModalRef={priceModalRef}
            />
          ))}
        </div>
      )}
      {/* SUGGESTED CRYPTOCURRENCIES */}
      {cryptoListToSuggest.length !== 0 && cryptoCode.length !== 0 && (
        <div className={styles.wrapperCryptoSuggestions}>
          <h2 className={styles.heading}>Suggestions</h2>
          {cryptoListToSuggest.map((item: CryptoItem) => (
            <CryptoSuggestCard
              key={item.id}
              cryptoItem={item}
              cryptoListToSuggest={cryptoListToSuggest}
              cryptoListPinned={cryptoListPinned}
              modalVisibility={modalVisibility}
              setCryptoListToSuggest={setCryptoListToSuggest}
              setCryptoListPinned={setCryptoListPinned}
              setModalVisibility={setModalVisibility}
              wrapperPrimaryRef={wrapperPrimaryRef}
              priceModalRef={priceModalRef}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Main;

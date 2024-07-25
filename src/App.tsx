import "./App.css";

import { useRef } from "react";

import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  // REFS
  const wrapperPrimaryRef = useRef<HTMLDivElement>(null);

  return (
    <div className="wrapper" ref={wrapperPrimaryRef}>
      <Header />
      <Main wrapperPrimaryRef={wrapperPrimaryRef} />
    </div>
  );
}

export default App;

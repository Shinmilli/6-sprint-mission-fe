import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./App.css";
import { Outlet } from "react-router-dom";
// import styled from "styled-components";

function App() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.wrap}>
          <Nav className={styles.nav} />
          <Outlet />
          <Footer className={styles.footer} />
        </div>
      </div>
    </>
  );
}

export default App;

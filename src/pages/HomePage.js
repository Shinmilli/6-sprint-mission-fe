import styles from "./HomePage.module.css";
import MainImage from "../assets/main.png";
import Ad1 from "../assets/광고1.png";
import Ad2 from "../assets/광고2.png";
import Ad3 from "../assets/광고3.png";
import BottomImage from "../assets/bottom.png";
// import Main from "../Main";

function HomePage() {
  return (
    <>
      <iframe
        title="googletagmanager"
        height="0"
        src="https://www.googletagmanager.com/ns.html?id=GTM-MPS97T3C"
        style={{
          display: "none",
          visibility: "hidden",
        }}
        width="0"
      />
      <section className={styles.banner}>
        <div className={styles.banner_wrap}>
          <div className={styles.inner}>
            <h1 className={styles.big}>
              일상의 모든 물건을
              <br /> 거래해 보세요
            </h1>
            <a href="/items" className={styles.btn}>
              구경하러 가기
            </a>
            <img src={MainImage} alt="mainImage" />
          </div>
        </div>
      </section>

      <main className={styles.container}>
        <div className={styles.container_wrap}>
          <div className={styles.content}>
            <img src={Ad1} alt="ad1" />
            <div className={styles.side}>
              <h2 className={styles.blue}>Hot Item</h2>
              <p className={styles.big}>
                인기 상품을
                <br />
                확인해 보세요
              </p>
              <p className={styles.small}>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>

          <div className={`${styles.content} ${styles.second_content}`}>
            <div className={`${styles.side} ${styles.second}`}>
              <h2 className={styles.blue}>Search</h2>
              <p className={styles.big}>구매를 원하는 상품을 검색하세요</p>
              <p className={styles.small}>
                구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
              </p>
            </div>
            <img src={Ad2} alt="ad2" />
          </div>

          <div className={styles.content}>
            <img src={Ad3} alt="ad3" />
            <div className={styles.side}>
              <h2 className={styles.blue}>Register</h2>
              <p className={styles.big}>
                판매를 원하는
                <br />
                상품을 등록하세요
              </p>
              <p className={styles.small}>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </main>

      <section className={`${styles.banner} ${styles.bottom}`}>
        <div className={styles.banner_wrap}>
          <div className={styles.inner}>
            <h1 className={styles.big}>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h1>
            <img id={styles.BottomImage} src={BottomImage} alt="bannerImg" />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;

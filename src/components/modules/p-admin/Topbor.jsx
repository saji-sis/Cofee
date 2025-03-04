import styles from "./topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
const Topbar = () => {
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div>
            <p>سجاد سیستانی</p>
            <span>ادمین</span>
          </div>
          <img src="/images/sajad.jpg" alt="" />
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <div className={styles.notification}>
            <IoIosNotifications />
            <span>2</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Topbar;

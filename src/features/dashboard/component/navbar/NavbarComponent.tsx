"use client";

import { useState } from "react";
import {
  FaExclamationCircle,
  FaUpload,
  FaFileAlt,
  FaSearch,
} from "react-icons/fa";
import styles from "./navbar-component.module.css";

export default function DocumentNav() {
  const [active, setActive] = useState("signature");

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <button
          className={`${styles.navItem} ${
            active === "signature" ? styles.active : ""
          }`}
          onClick={() => setActive("signature")}
        >
          <FaExclamationCircle />
          <span>Requires My Signature</span>

          <div className={styles.badge}>3</div>
        </button>
        <button
          className={`${styles.navItem} ${
            active === "documents" ? styles.active : ""
          }`}
          onClick={() => setActive("documents")}
        >
          <FaUpload />
          <span>My Documents</span>
        </button>
        <button
          className={`${styles.navItem} ${
            active === "history" ? styles.active : ""
          }`}
          onClick={() => setActive("history")}
        >
          <FaFileAlt />
          <span>History</span>
        </button>
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.iconSearch}>
          <FaSearch />
        </div>
        <div className={styles.input}>
          <input type="text" placeholder="Search document..." />
        </div>
      </div>
    </div>
  );
}

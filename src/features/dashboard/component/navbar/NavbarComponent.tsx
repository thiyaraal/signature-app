"use client";

import { useState } from "react";
import {
  FaExclamationCircle,
  FaUpload,
  FaFileAlt,
  FaSearch,
} from "react-icons/fa";
import styles from "./navbar-component.module.css";

interface DocumentNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DocumentNav({ activeTab, setActiveTab }: DocumentNavProps) {

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <button
          className={`${styles.navItem} ${
            activeTab === "signature" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("signature")}
        >
          <FaExclamationCircle />
          <span>Requires My Signature</span>

          <div className={styles.badge}>3</div>
        </button>
        <button
          className={`${styles.navItem} ${
            activeTab === "documents" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("documents")}
        >
          <FaUpload />
          <span>My Documents</span>
        </button>
        <button
          className={`${styles.navItem} ${
            activeTab === "history" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("history")}
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

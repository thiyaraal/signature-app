"use client";

import { FaPencil, FaPlus, FaUser } from "react-icons/fa6";
import styles from "./pages.module.css";
import { ButtonWidget } from "@/src/shared/widget/button/ButtonWidget";

export default function UserManagementPage() {
  const tableData = [
    {
      id: "1",
      user: {
        name: "Ahmad Rizki Hidayat",
        avatar: "",
      },
      email: "admin@company.com",
      role: "Administrator",
      organization: "PT Technology Indonesia",
    },
    {
      id: "2",
      user: {
        name: "Ahmad Wijaya",
        avatar: "",
      },
      email: "ahmad@company.com",
      role: "User",
      organization: "PT Technology Indonesia",
    },
  ];
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.contentLeft}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <FaPencil />
            </div>
            <p className={styles.logoText}>ELERA</p>
          </div>
        </div>

        <div className={styles.contentCenter}>
          <p className={styles.title}>User Management</p>
          <p className={styles.subtitle}>Manage and sign your organization</p>
        </div>
        <div className={styles.contentRight}>
          <ButtonWidget
            variant="gradasi-blue"
            label="Add New User"
            icon={<FaPlus />}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>USER</span>
          <span>EMAIL</span>
          <span>ROLE</span>
          <span>ORGANIZATION</span>
          <span>ACTIONS</span>
        </div>

        {tableData.map((item) => (
          <div key={item.id} className={styles.tableRow}>
            <div className={styles.user}>
              <div className={styles.avatar}>{<FaUser />}</div>
              <span>{item.user.name}</span>
            </div>

            <div className={styles.email}>{item.email}</div>

            <div
              className={`${styles.role} ${
                item.role === "Administrator" ? styles.admin : styles.userRole
              }`}
            >
              {item.role}
            </div>

            <div className={styles.org}>{item.organization}</div>

            <div className={styles.actions}>✏️ 🗑️</div>
          </div>
        ))}
      </div>
    </>
  );
}

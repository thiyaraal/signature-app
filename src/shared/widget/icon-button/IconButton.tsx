import styles from "./icon-button.module.css";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  bgColor?: string;
  iconColor?: string;
  size?: number;
}

export function IconButton({
  icon,
  onClick,
  bgColor = "#2B57FA",
  iconColor = "#ffffff",
  size = 40,
}: IconButtonProps) {
  return (
    <button
      className={styles.iconBtn}
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        width: size,
        height: size,
        color: iconColor,
      }}
    >
      {icon}
    </button>
  );
}

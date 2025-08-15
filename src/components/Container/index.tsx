import type React from "react";
import styles from "./styles.module.css";

type ContainerProps = {
  children: React.ReactNode;
};

export function Container(props: ContainerProps) {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

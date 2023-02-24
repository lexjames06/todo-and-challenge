import styles from "./Theme.module.css";

type ThemeContainerProps = {
  isDark: boolean;
  children: React.ReactElement;
};

export const ThemeContainer = ({ isDark = true, children }: ThemeContainerProps) => {
  return (
    <div className={styles.container} data-darkmode={isDark}>
      {children}
    </div>
  )
};

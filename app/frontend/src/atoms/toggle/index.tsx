import styles from "./Toggle.module.css";

type ToggleProps = {
  flag: boolean;
  onToggle: (flag: boolean) => void;
};

export const Toggle = ({ flag, onToggle }: ToggleProps) => {
  return (
    <label className={styles.toggle}>
      <input type="checkbox" checked={flag} onChange={() => onToggle(!flag)} />
      <span />
    </label>
  )
};

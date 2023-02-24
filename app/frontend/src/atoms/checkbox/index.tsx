import styles from "./Checkbox.module.css";

type CheckboxProps = {
  disabled: boolean;
  checked: boolean;
  onClick: () => void;
}

export const Checkbox = ({ disabled = false, checked, onClick }: CheckboxProps) => {
  return (
    <label className={styles.container}>
      <input type="checkbox" disabled={disabled} checked={checked} onChange={onClick}/>
      <span className={styles.checkbox} />
    </label>
  )
};

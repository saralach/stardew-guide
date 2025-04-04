import styles from "@/styles/ToggleSwitch.module.css";

interface ToggleSwitchProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ToggleSwitch({ label, onChange }: ToggleSwitchProps) {
  return (
    <label className={styles.togglelabel}>
      <input type="checkbox"
        className={styles.togglecheckbox}
        name={`${label}Toggle`}
        id={`${label}Toggle`}
        onChange={onChange}
      />
      <span className={styles.toggleslider}></span>
      {label}
    </label>
  );
}

export default ToggleSwitch;
/**
 * MODULE:  components/ToggleSwitch
 * 
 * SUMMARY:
 *   NOT YET IN USE! It is intended to be used for toggling settings on and off.
 *
 * DEPENDENCIES:
 *   - styles/ToggleSwitch: styling
 * 
 * USED BY:
 *   not in use
 */

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
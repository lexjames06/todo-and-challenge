import React from "react"
import { SpinnerSVG } from "../../assets";
import styles from "./SpinnerContainer.module.css";

type SpinnerContainerProps = {
  isLoading: boolean;
  children: React.ReactElement;
};

export const SpinnerContainer = ({ isLoading = false, children }: SpinnerContainerProps) => {
  return isLoading ? (
    <div className={styles.container}>
      <SpinnerSVG />
    </div>
  ) : children;
};

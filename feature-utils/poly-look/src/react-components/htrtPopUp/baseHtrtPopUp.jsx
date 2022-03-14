import React from "react";

import "./baseHtrtPopUp.css";

/**
 *
 * Generic container for HTRT pop ups with close button.
 * @param {Object} props
 * @param {node} [props.children] - Pop up content.
 * @param {string} [props.okLabel] - Label used for the close button.
 * @param {callback} [props.onOk] - onclick event handler for the close button.
 * @param {string} [props.classes = ""] - a string containing additional class
 * names for the container. Defaults to empty string.
 * @returns A `div` with the content and the close button.
 */
const BaseHtrtPopUp = ({ children, okLabel, onOk, classes = "" }) => {
  return (
    <div className={`htrt-container ${classes}`.trim()}>
      {children}
      <button className="poly-button" onClick={onOk}>
        {okLabel}
      </button>
    </div>
  );
};

export default BaseHtrtPopUp;

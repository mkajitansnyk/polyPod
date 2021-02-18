import React from "react";

const CompanyInfo = ({ company, onShowScreenChange }) => {
    return (
        <div className="explorer-container">
            <button onClick={() => onShowScreenChange("start", undefined)}>
                X
            </button>
            <h2>{company.name}</h2>
        </div>
    );
};

export default CompanyInfo;

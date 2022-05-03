import React, { useContext } from "react";
import { ImporterContext } from "../../../context/importer-context.jsx";

import "./infoButton.css";

const InfoButton = ({ infoScreen }) => {
    const { createPopUp, setPopUpOpen } = useContext(ImporterContext);

    const handleClick = () => {
        createPopUp(infoScreen);
        setPopUpOpen(true);
    };
    return (
        <button className="info-button" onClick={handleClick}>
            <img src="./images/question.svg"></img>
        </button>
    );
};

export default InfoButton;

import React, { useContext } from "react";
import { GoogleContext } from "../../context/google-context.jsx";

const Overview = () => {
    const { handleSelectFile, files, handleRemoveFile, googleAccount } =
        useContext(GoogleContext);

    const importFile = async () => {
        if (files?.[0]?.id) handleRemoveFile(files[0].id);
        await handleSelectFile();
    };

    return (
        <div className="overview poly-theme-light">
            <button className="btn secondary" onClick={() => importFile()}>
                Import File
            </button>
            <div>
                <h1>Activities</h1>
                {googleAccount?.activities.map((activity, i) => (
                    <div key={i}>{activity.timestamp.toUTCString()}</div>
                ))}
            </div>
            <div>
                <h1>Place Visits</h1>
                {googleAccount?.placeVisits.map((placeVisit, i) => (
                    <div key={i}>{placeVisit.timestamp.toUTCString()}</div>
                ))}
            </div>
            <div>
                <h1>Activity segments</h1>
                {googleAccount?.activitySegments.map((activitySegment, i) => (
                    <div key={i}>{activitySegment.timestamp.toUTCString()}</div>
                ))}
            </div>
            <div>
                <h1>Path names</h1>
                {googleAccount?.pathNames.map((entry, i) => (
                    <div key={i}>{entry.path}</div>
                )) || null}
            </div>
        </div>
    );
};

export default Overview;

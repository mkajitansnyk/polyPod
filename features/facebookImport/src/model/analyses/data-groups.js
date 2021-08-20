import React from "react";
import ConnectedAdvertisersAnalysis from "./connected-advertisers.js";
import InteractedWithAdvertisersAnalysis from "./interacted-advertisers.js";
import AdInterestsAnalysis from "./ad-interests.js";
import OffFacebookEventsAnalysis from "./off-facebook-events.js";
import MessagesAnalysis from "./messages.js";

class DataGroupsAnalysis {
    get title() {
        return "Data Groups";
    }

    get id() {
        return "data-groups";
    }

    async parse({ id, zipFile }) {
        this._advertisersCount = {};
        this.active = false;
        if (!zipFile) return;

        const analysisClasses = [
            ConnectedAdvertisersAnalysis,
            InteractedWithAdvertisersAnalysis,
            AdInterestsAnalysis,
            OffFacebookEventsAnalysis,
            MessagesAnalysis,
        ];

        const parsedAnalyses = await Promise.all(
            analysisClasses.map(async (subAnalysisClass) => {
                const subAnalysis = new subAnalysisClass();
                await subAnalysis.parse({ id, zipFile });
                const title = subAnalysis.constructor.name.replace(
                    "Analysis",
                    ""
                );
                return {
                    analysis: subAnalysis,
                    title,
                };
            })
        );

        this._bubblesData = parsedAnalyses
            .map(({ analysis, title }) => {
                return {
                    count: analysis.dataEntitiesCount,
                    title: title,
                };
            })
            .filter(({ count }) => count > 0);

        this.active = true;
    }

    render() {
        if (!this.active) {
            return "No Data!";
        }

        return (
            <ul>
                {this._bubblesData.map(({ count, title }, index) => (
                    <li key={index}>
                        {title}: {count}
                    </li>
                ))}
            </ul>
        );
    }
}

export default DataGroupsAnalysis;

import React, { useState } from "react";

import i18n from "../../i18n.js";
import { emptyFilters, removeFilter } from "../../companyFilter.js";
import "./polyExplorer.css";
import MainScreen from "../screens/mainScreen/mainScreen.jsx";
import SharedDataTypeScreen from "../screens/sharedDataTypeScreen/sharedDataTypeScreen.jsx";
import SharedPurposeScreen from "../screens/sharedPurposeScreen/sharedPurposeScreen.jsx";
import SharedWithCompaniesScreen from "../screens/sharedWithCompanyScreen/sharedWithCompanyScreen.jsx";
import SharedJurisdictionsScreen from "../screens/sharedJurisdictionsScreen/sharedJurisdictionsScreen.jsx";
import CompanyFilterScreen from "../screens/companyFilterScreen/companyFilterScreen.jsx";
import CompanySearchScreen from "../screens/companySearchScreen/companySearchScreen.jsx";
import InfoScreen from "../screens/infoScreen/infoScreen.jsx";
import CompanyInfoScreen from "../screens/companyInfoScreen/companyInfoScreen.jsx";
import OnboardingPopup from "../onboardingPopup/onboardingPopup.jsx";

import { default as polyPediaCompanies } from "../../data/companies.json";
//To go soon
import makeExampleData from "../dataViz/makeExampleData.jsx";

const PolyExplorer = () => {
    const [showScreen, setShowScreen] = useState("main");
    const [showFeatured, setShowFeatured] = useState(true);
    const [companyData] = useState(polyPediaCompanies);
    const [selectedCompany, setSelectedCompany] = useState(undefined);
    const [featuredCompanyData] = useState(
        makeExampleData().filter((e) => e.featured)
    );
    const [
        featuredCompanyTabInitialSlide,
        setFeaturedCompanyTabInitialSlide,
    ] = useState(0);
    const [activeFilters, setActiveFilters] = useState(emptyFilters());

    //Move this up to polyPod level (props)
    const [firstTime, setFirstTime] = useState(true);

    const handleShowScreenChange = (showScreen, companyName) => {
        setShowScreen(showScreen);
        setSelectedCompany(
            companyData.filter((company) => companyName === company.name)[0]
        );
    };

    const handleRemoveFilter = (field, value) => {
        removeFilter(activeFilters, field, value);
        setActiveFilters({ ...activeFilters });
    };

    const handleFilterApply = (newActiveFilters) => {
        setActiveFilters(newActiveFilters);
        handleShowScreenChange("main");
    };

    function updatePodNavigation() {
        const title = i18n.t(`common:screenTitles.${showScreen}`);
        const actions = {
            info: () => handleShowScreenChange("info"),
            search: () => handleShowScreenChange("companySearch"),
            back: () => handleShowScreenChange("main"),
        };

        if (window.podNav) {
            window.podNav.actions = actions;
            window.podNav.setTitle(title);
            window.podNav.setActiveActions(
                showScreen === "main" ? ["info", "search"] : ["back"]
            );
        } else {
            // Fallback navigation for testing the feature outside the pod
            document.title = title;
            window.addEventListener("keyup", function ({ key }) {
                if (key === "Escape") actions.back();
                else if (key === "s") actions.search();
                else if (key === "i") actions.info();
            });
        }
    }

    const screens = {
        main: (
            <MainScreen
                showFeatured={showFeatured}
                featuredCompanyData={featuredCompanyData}
                companyData={companyData}
                onShowScreenChange={handleShowScreenChange}
                onShowFeaturedChange={setShowFeatured}
                featuredCompanyTabInitialSlide={featuredCompanyTabInitialSlide}
                onFeaturedCompanyTabInitialSlideChange={
                    setFeaturedCompanyTabInitialSlide
                }
                activeFilters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
            />
        ),
        dataTypes: <SharedDataTypeScreen company={selectedCompany} />,
        purposes: <SharedPurposeScreen company={selectedCompany} />,
        companies: <SharedWithCompaniesScreen company={selectedCompany} />,
        jurisdictions: <SharedJurisdictionsScreen company={selectedCompany} />,
        companyInfo: <CompanyInfoScreen company={selectedCompany} />,
        companyFilter: (
            <CompanyFilterScreen
                companies={companyData}
                activeFilters={activeFilters}
                onApply={handleFilterApply}
            />
        ),
        companySearch: (
            <CompanySearchScreen
                companies={companyData}
                onShowScreenChange={handleShowScreenChange}
            />
        ),
        info: <InfoScreen />,
    };

    updatePodNavigation();
    return (
        <div className="poly-explorer">
            {screens[showScreen]}{" "}
            {firstTime ? (
                <OnboardingPopup
                    onCloseOnboardingPopup={() => setFirstTime(false)}
                />
            ) : null}
        </div>
    );
};

export default PolyExplorer;

const pixelViewport = {
    name: "polyPhone",
    styles: {
        width: "360px",
        height: "640px",
    },
};

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    viewport: {
        viewports: { pixelViewport },
    },
};

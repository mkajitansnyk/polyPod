export default {
    polyPediaReport: {
        url: process.env.POLYPOD_POLYPEDIA_REPORT_URL,
        auth: process.env.POLYPOD_POLYPEDIA_REPORT_AUTHORIZATION || "",
    },
    polyApiErrorReport: {
        url: process.env.POLYPOD_ERROR_REPORT_URL,
        auth: process.env.POLYPOD_ERROR_REPORT_AUTHORIZATION || "",
    },
    demoTest: {
        url: "",
        allowInsecure: true,
    },
};

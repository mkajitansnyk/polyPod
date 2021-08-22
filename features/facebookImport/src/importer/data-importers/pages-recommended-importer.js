import { readJSONDataArray } from "../importer-util.js";

export default class RecommendedPagesImporter {
    async import({ zipFile }, facebookAccount) {
        facebookAccount.recommendedPages = await readJSONDataArray(
            "pages/pages_you've_recommended.json",
            "recommended_pages_v2",
            zipFile
        );
    }
}

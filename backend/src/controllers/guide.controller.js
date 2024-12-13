const bannerService = require("../service/banner.service");
const linkService = require("../service/link.service");
const popupService = require("../service/popup.service");

class GuideController {
    async getGuidesByUrl(req, res) {
        try {
            const { url } = req.body;

            if (!url || typeof url !== 'string') {
                return res.status(400).json({ errors: [{ msg: "URL is missing or invalid" }] });
            }
            const [banner, popup, link] = await Promise.all([
                bannerService.getBannerByUrl(url),
                popupService.getPopupByUrl(url),
                linkService.getLinkByUrl(url),
            ]);
            res.status(200).json({ banner, popup, link });
        } catch (error) {
            internalServerError(
                "GET_GUIDES_BY_URL_ERROR",
                error.message,
            );
        }
    }
}

module.exports = new GuideController();
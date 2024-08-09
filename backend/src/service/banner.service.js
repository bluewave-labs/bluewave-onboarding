const db = require("../models");
const Banner = db.Banner;

class BannerService {
  async getAllBanners() {
    return await Banner.findAll({
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async createBanner(data) {
    return await Banner.create(data);
  }

  async deleteBanner(id) {
    const rowsAffected = await Banner.destroy({ where: { id } });

    if (rowsAffected === 0) {
      return false;
    }

    return true;
  }

  async updateBanner(id, data) {
    const [affectedRows, updatedBanners] = await Banner.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedRows === 0) {
      return null;
    }

    return updatedBanners[0];
  }
}

module.exports = new BannerService();

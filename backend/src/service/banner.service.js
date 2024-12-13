const db = require("../models");
const Banner = db.Banner;

class BannerService {
  async getAllBanners() {
    return await Banner.findAll({
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async getBanners(userId) {
    return await Banner.findAll({
      where: {
        createdBy: userId,
      },
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async createBanner(data) {
    const transaction = await sequelize.transaction();
    try {
      const banner = await Banner.create(data, { transaction });
      await transaction.commit();
      return banner;
    } catch (err) {
      await transaction.rollback();
      throw new Error(`Failed to create banner ~ ${err.message}`);
    }
  }

  async deleteBanner(id) {
    const rowsAffected = await Banner.destroy({ where: { id } });

    if (rowsAffected === 0) {
      return false;
    }

    return true;
  }

  async updateBanner(id, data) {
    const transaction = await sequelize.transaction();
    try {
      const [affectedRows, updatedBanners] = await Banner.update(data, {
        where: { id },
        returning: true,
        transaction,
      });
      if (affectedRows === 0) {
        return null;
      }
      await transaction.commit();
      return updatedBanners[0];
    } catch (err) {
      await transaction.rollback();
      throw new Error(`Failed to update banner ~ ${err.message}`);
    }
  }

  async getBannerById(bannerId) {
    try {
      return await Banner.findOne({
        where: { id: bannerId },
      });
    } catch (error) {
      throw new Error("Error retrieving banner by ID");
    }
  }

  async getBannerByUrl(url) {
    try {
      return await Banner.findAll({ where: { url } });
    } catch (error) {
      throw new Error("Error retrieving banner by URL");
    }
  };
}

module.exports = new BannerService();

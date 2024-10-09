const db = require("../models");
const Hint = db.Hint;

class HintService {
    async getAllHints() {
        return await Hint.findAll({
        include: [{ model: db.User, as: "creator" }],
        });
    }
    
    async getHints(userId) {
        return await Hint.findAll({
        where: {
            createdBy: userId
        },
        include: [{ model: db.User, as: "creator" }],
        });
    }
    
    async createHint(data) {
        return await Hint.create(data);
    }
    
    async deleteHint(id) {
        const rowsAffected = await Hint.destroy({ where: { id } });
    
        if (rowsAffected === 0) {
        return false;
        }
    
        return true;
    }
    
    async updateHint(id, data) {
        const [affectedRows, updatedHints] = await Hint.update(data, {
        where: { id },
        returning: true,
        });
    
        if (affectedRows === 0) {
        return null;
        }
    
        return updatedHints[0];
    }
    
    async getHintById(hintId) {
        try {
        return await Hint.findOne({
            where: { id: hintId },
            include: [{ model: db.User, as: "creator" }],
        });
        } catch (error) {
        throw new Error("Error retrieving hint by ID");
        }
    }
    }

module.exports = new HintService();
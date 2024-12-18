'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.renameTable('popup_logs', 'guide_logs', { transaction });
      await queryInterface.renameColumn('guide_logs', 'popupType', 'guideType', { transaction });

      await queryInterface.sequelize.query(`
        ALTER TABLE "guide_logs" 
        ALTER COLUMN "guideType" TYPE INTEGER 
        USING 
          CASE 
            WHEN "guideType" = 'guide' THEN 1
            WHEN "guideType" = 'tooltip' THEN 2
            WHEN "guideType" = 'hotspot' THEN 3
            WHEN "guideType" = 'checklist' THEN 4
            ELSE 9
          END
      `, { transaction });

      await queryInterface.changeColumn('guide_logs', 'guideType', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, { transaction });

      await queryInterface.addColumn('guide_logs', 'guideId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }, { transaction });

      await queryInterface.addIndex('guide_logs', ['userId'], {
        name: 'idx_guide_logs_userId',
        transaction,
      });
      await queryInterface.addIndex('guide_logs', ['guideId'], {
        name: 'idx_guide_logs_guideId',
        transaction,
      });
      await queryInterface.addIndex('guide_logs', ['guideType'], {
        name: 'idx_guide_logs_guideType',
        transaction,
      });
      await queryInterface.addIndex('guide_logs', ['userId', 'guideId', 'guideType'], {
        name: 'idx_guide_logs_userId_guideId_guideType',
        unique: false,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.renameTable('guide_logs', 'popup_logs', { transaction });
      await queryInterface.renameColumn('popup_logs', 'guideType', 'popupType', { transaction });

      await queryInterface.sequelize.query(`
        ALTER TABLE "popup_logs" 
        ALTER COLUMN "popupType" TYPE VARCHAR(255) 
        USING 
          CASE 
            WHEN "popupType" = 1 THEN 'guide'
            WHEN "popupType" = 2 THEN 'tooltip'
            WHEN "popupType" = 3 THEN 'hotspot'
            WHEN "popupType" = 4 THEN 'checklist'
            ELSE 'guide'
          END
      `, { transaction });

      await queryInterface.changeColumn('popup_logs', 'popupType', {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['guide', 'tooltip', 'hotspot', 'checklist']],
        }
      }, { transaction });

      await queryInterface.removeColumn('popup_logs', 'guideId', { transaction });

      await queryInterface.removeIndex('popup_logs', 'idx_guide_logs_userId', { transaction });
      await queryInterface.removeIndex('popup_logs', 'idx_guide_logs_guideId', { transaction });
      await queryInterface.removeIndex('popup_logs', 'idx_guide_logs_guideType', { transaction });
      await queryInterface.removeIndex('popup_logs', 'idx_guide_logs_userId_guideId_guideType', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

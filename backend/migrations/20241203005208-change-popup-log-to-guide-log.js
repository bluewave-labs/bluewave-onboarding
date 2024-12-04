'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.renameTable('popup_logs', 'guide_logs', { transaction });
      
      await queryInterface.sequelize.query(`
        ALTER TABLE "guide_logs" 
        ALTER COLUMN "popupType" TYPE INTEGER 
        USING 
          CASE 
            WHEN "popupType" = 'guide' THEN 1
            WHEN "popupType" = 'tooltip' THEN 2
            WHEN "popupType" = 'hotspot' THEN 3
            WHEN "popupType" = 'checklist' THEN 4
            ELSE 1  -- Default to 'guide' type for invalid values
          END
      `, { transaction });

      await queryInterface.changeColumn('guide_logs', 'popupType', {
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
      await queryInterface.addIndex('guide_logs', ['popupType'], {
        name: 'idx_guide_logs_popupType',
        transaction,
      });
      await queryInterface.addIndex('guide_logs', ['userId', 'guideId', 'popupType'], {
        name: 'idx_guide_logs_userId_guideId_popupType',
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

      await queryInterface.sequelize.query(`
        ALTER TABLE "popup_logs" 
        ALTER COLUMN "popupType" TYPE ENUM('guide', 'tooltip', 'hotspot', 'checklist') 
        USING 
          CASE 
            WHEN "popupType" = 1 THEN 'guide'
            WHEN "popupType" = 2 THEN 'tooltip'
            WHEN "popupType" = 3 THEN 'hotspot'
            WHEN "popupType" = 4 THEN 'checklist'
            ELSE NULL
          END
      `, { transaction });

      await queryInterface.changeColumn('popup_logs', 'popupType', {
        type: Sequelize.ENUM('guide', 'tooltip', 'hotspot', 'checklist'),
        allowNull: false,
      }, { transaction });

      await queryInterface.removeColumn('popup_logs', 'guideId', { transaction });

      await queryInterface.removeIndex('popup_logs', 'idx_guide_logs_userId', { transaction });
      await queryInterface.removeIndex('popup_logs', 'idx_guide_logs_guideId', { transaction });
      await queryInterface.removeIndex('popup_logs', 'idx_guide_logs_popupType', { transaction });
      await queryInterface.removeIndex('popup_logs', 'idx_guide_logs_userId_guideId_popupType', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

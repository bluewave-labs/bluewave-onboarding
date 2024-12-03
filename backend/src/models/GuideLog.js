const { GuideType } = require('../utils/guidelog.helper');

module.exports = (sequelize, DataTypes) => {
    const GuideLog = sequelize.define('GuideLog', {
        popupType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: {
                    args: [
                        Object.values(GuideType),
                    ],
                    msg: 'popupType must be a valid value.',
                },
            },
        },
        guideId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        showingTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: false,
        tableName: 'guide_logs',
        indexes: [
            {
                name: 'idx_userId', 
                fields: ['userId'],
            },
            {
                name: 'idx_guideId', 
                fields: ['guideId'],
            },
            {
                name: 'idx_popupType',
                fields: ['popupType'],
            },
            {
                name: 'idx_userId_guideId_popupType', 
                fields: ['userId', 'guideId', 'popupType'],
                unique: false,
            },
        ],
    });

    return GuideLog;
};

module.exports = (sequelize, DataTypes) => {
    const PopupLog = sequelize.define('PopupLog', {
        popupType: {
            type: DataTypes.ENUM('guide', 'tooltip', 'hotspot', 'checklist'),
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
        }
    }, {
        timestamps: false,
        tableName: 'popup_logs'
    });
    return PopupLog;
};

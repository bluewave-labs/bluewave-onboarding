module.exports = (sequelize, DataTypes) => {
    const ProfilePicture = sequelize.define(
        "ProfilePicture",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "profilePictures",
            timestamps: false
        },
    );

    return ProfilePicture;
};

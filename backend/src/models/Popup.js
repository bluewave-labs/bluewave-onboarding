Popup.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    header: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.ENUM('top', 'bottom'),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    actionButtonText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appearance: {
      type: DataTypes.JSONB,
      allowNull: false,
      // This will include headerBgColor, fontColor, buttonColor
    },
    settings: {
      type: DataTypes.JSONB,
      allowNull: false,
      // This will include the repeating checkbox option
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, { sequelize, modelName: 'Popup' });
  
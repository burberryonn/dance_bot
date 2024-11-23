module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    username: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.EventResponse, { foreignKey: "Username" });
  };

  return User;
};

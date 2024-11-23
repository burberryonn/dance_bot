module.exports = (sequelize, DataTypes) => {
  const EventResponse = sequelize.define("EventResponse", {
    response: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  EventResponse.associate = (models) => {
    EventResponse.belongsTo(models.User, { foreignKey: "UserId" });
    EventResponse.belongsTo(models.Event, { foreignKey: "EventId" });
  };

  return EventResponse;
};

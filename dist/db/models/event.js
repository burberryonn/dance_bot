module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    event_time: DataTypes.DATE,
    invitation_message: DataTypes.TEXT,
    image: DataTypes.STRING,
  });

  Event.associate = (models) => {
    Event.hasMany(models.EventResponse, { foreignKey: "EventId" });
  };

  return Event;
};

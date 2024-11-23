module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("Events", "address", { type: DataTypes.STRING });
    await queryInterface.addColumn("Events", "event_time", { type: DataTypes.DATE });
    await queryInterface.addColumn("Events", "invitation_message", { type: DataTypes.TEXT });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn("Events", "address");
    await queryInterface.removeColumn("Events", "event_time");
    await queryInterface.removeColumn("Events", "invitation_message");
  },
};
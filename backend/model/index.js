import User from "./userModel.js";
import Bike from "./bikeModel.js";

User.hasMany(Bike, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "bikes"
});

Bike.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});
import Intention from "./intention";
import User from "./user";

User.hasMany(Intention, {
  foreignKey: "processedByAdminId",
  as: "processedIntentions",
});

Intention.belongsTo(User, {
  foreignKey: "processedByAdminId",
  as: "processingAdmin",
});

export { User, Intention };

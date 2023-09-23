import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
  // static associations(models) {
  //   this.belongsTo(models.Customer, { foreignKey: "customer_id" });
  // }
}
export default User;

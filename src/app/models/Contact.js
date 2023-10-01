import Sequelize, { Model } from "sequelize";

class Contact extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        status: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
        CustomerId: {
          field: "customer_id",
          type: Sequelize.INTEGER,
        },
        createdAt: {
          field: "created_at",
          type: Sequelize.DATE,
        },
        updatedAt: {
          field: "updated_at",
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        tableName: "contacts",
        modelName: "Contact",
        name: {
          singular: "contact",
          plural: "contacts",
        },
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: "customer_id" });
  }

  // static associations(models) {
  //   this.belongsTo(models.Customer, { foreignKey: "customer_id" });
  // }
}
export default Contact;

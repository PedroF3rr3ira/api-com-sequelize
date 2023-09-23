import { Model, DataTypes } from "sequelize";

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        status: DataTypes.ENUM("ACTIVE", "ARCHIVED"),
        createdAt: {
          field: "created_at",
          type: DataTypes.DATE,
        },
        updatedAt: {
          field: "updated_at",
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        tableName: "customers",
        modelName: "Customer",
      }
    );
  }

  static associations(models) {
    this.hasMany(models.Contact);
  }
}
export default Customer;

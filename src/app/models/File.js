import Sequelize, { Model } from "sequelize";

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
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
        name: {
          singular: "file",
          plural: "files",
        },
        tableName: "files",
        modelName: "File",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User);
  }
}

export default File;

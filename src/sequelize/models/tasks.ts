import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Tasks extends Model {
  public id!: number;
  public title!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public user!: string;
}

Tasks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("check", "uncheck"),
      defaultValue: "uncheck",
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Tasks",
    tableName: "tasks",
    timestamps: true,
  }
);

export default Tasks;

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

const UserRole = DataTypes.ENUM("MEMBER", "ADMIN");
const UserStatus = DataTypes.ENUM("ACTIVE", "INACTIVE");

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public passwordHash!: string;
  public company?: string;
  public role!: "MEMBER" | "ADMIN";
  public status!: "ACTIVE" | "INACTIVE";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password_hash",
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: UserRole,
      allowNull: false,
      defaultValue: "MEMBER",
    },
    status: {
      type: UserStatus,
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;

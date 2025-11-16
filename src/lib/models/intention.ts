import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

const IntentionStatus = DataTypes.ENUM("PENDING", "APPROVED", "REJECTED");

class Intention extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public company?: string;
  public reason?: string;
  public status!: "PENDING" | "APPROVED" | "REJECTED";
  public registrationToken?: string;
  public tokenExpiresAt?: Date;
  public processedByAdminId?: string;

  public readonly createdAt!: Date;
}

Intention.init(
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
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: IntentionStatus,
      allowNull: false,
      defaultValue: "PENDING",
    },
    registrationToken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      field: "registration_token",
    },
    tokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "token_expires_at",
    },
    processedByAdminId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      field: "processed_by_admin_id",
    },
  },
  {
    sequelize,
    tableName: "intentions",
    timestamps: true,
    updatedAt: false,
    createdAt: "created_at",
  }
);

export default Intention;

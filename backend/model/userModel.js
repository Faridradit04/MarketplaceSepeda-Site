import { Sequelize, DataTypes } from "sequelize";
import db from "../config/config.js"

const User= db.define (
   "users", {
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    name : {
        type:DataTypes.STRING,
        allowNull:true,
    },
    email : {
        type:DataTypes.STRING,
        allowNull:true,
    },
    refresh_token : {
        type:DataTypes.TEXT,
        allowNull:true,
    },
    password : {
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    }
   } 
)
export default User;
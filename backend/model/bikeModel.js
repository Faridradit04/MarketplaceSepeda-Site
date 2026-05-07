import {Sequelize} from 'sequelize';
import db from '../config/config.js';
const { DataTypes } = Sequelize;
const Bike = db.define (
    "bikes", {
        id : {
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        name:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull:true,
        
        },
        type: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull:true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull:true,
        },
    }
)
export default Bike;
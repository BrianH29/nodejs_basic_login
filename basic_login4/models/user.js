const Sequelize = require('sequelize'); 

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            id : {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement : true, 
            },
            email : {
                type: Sequelize.STRING(40),
                allowNull : true,
                unique : true,
            },
            nick : {
                type : Sequelize.STRING(40),
                allowNull: false,
            },
            password : {
                type : Sequelize.STRING(150),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName : 'User',
            tableName : 'users',
            paranoid : true,
            charset: 'utf8',
            collate:'utf8_general_ci', 
        });
    }
}
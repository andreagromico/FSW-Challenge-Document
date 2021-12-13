'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Profile, {foreignKey: 'userId'})
      this.hasMany(models.Historical, {foreignKey: 'userId'})
    }

    static #encrypt = (password) => bcrypt.hashSync (password, 10)
    
    static register = ({ username, password, role}) => {
      const encryptedPassword = this.#encrypt(password)
      return this.create({ username, password : encryptedPassword, email, role: "player", access: true})
    }
    // !!-- LOGIN METHOD --!!
    checkPassword = password => bcrypt.compareSync(password, this.password)
    
    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username }})
        if (!user) return Promise.reject("Username not found!")
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) return Promise.reject("Wrong Password!")
        return Promise.resolve(user)
      }
      catch(err) {
        return Promise.reject(err)
      }
    }
    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }
      // Secret Key untuk verifikasi
      const secret_key = 'binarchallenge'
      const token = jwt.sign(payload, secret_key)
      return token
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
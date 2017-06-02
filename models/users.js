module.exports = (sequelize, DataType) => {
	const Users = sequelize.define("Users", {
			id: {
				type: DataType.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name :{
				type: DataType.STRING,
				allowNull : false,
				validate:{
					noteEmpty : true
				}
			},
			password : {
				type : DataType.STRING,
				allowNull : false,
				validate:{
					noteEmpty : true
				}
			},
			email : {
				type : DataType.STRING,
				uniqe : true,
				allowNull : false,
				validate:{
					noteEmpty : true
				}
			}
			
		},{
		hooks: {
			beforeCreate: user => {
				const salt = bcrypt.genSaltSync();
				user.password = bcrypt.hashSync(user.password, salt);
			}
		},
		classMethods: {
			associate: (models) => {
				Users.hasMany(models.Tasks);
			},
			isPassword: (encodedPassword, password) => {
				return bcrypt.compareSync(password, encodedPassword);
			}
		}
	});
	return Users;
};
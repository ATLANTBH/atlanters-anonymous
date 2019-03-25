const Sequelize = require('sequelize');

const localConnection = {
	connectionString: process.env.LOCAL_DATABASE_URL,
	ssl: false,
	dialect: 'postgres'
}

const pgConnection = {
	connectionString: process.env.PG_DATABASE_URL,
	ssl: true,
	dialect: 'postgres'
}

const sequelize = new Sequelize(localConnection);

const models = {
	User: sequelize.import('./user'),
	Question: sequelize.import('./question'),
	PollTemplate: sequelize.import('./poll_template'),
	Answer: sequelize.import('./answer'),
	Poll: sequelize.import('./poll'),
	PollAnswer: sequelize.import('./poll_answer')
};

Object.keys(models).forEach(key => {
	if('associate' in models[key]){
			models[key].associate(models);
	}
})

module.exports = { models, sequelize };
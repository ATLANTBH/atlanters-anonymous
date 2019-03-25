const express = require('express')
const { models, sequelize } = require('./server/models/index');
const app = express();
const auth = require('./server/routes/auth');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('dotenv').config();
const eraseDatabaseOnSync = true;

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_S));

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {

	if (eraseDatabaseOnSync) {
		//createUsersWithMessages();
	}
	
	app.use('/auth', auth);

	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		let error = req.app.get('env') === 'development' ? err : {}
		console.log(error);
		res.json({
				message: err.message,
				error: {}
		})
	})

	app.get('/user', (req, res) => {
		models.User.findAll()
				.then(user => {
						console.log(user)
						res.sendStatus(200);
				})
				.catch(err => console.log(err))
	});

	app.listen(process.env.PORT, () => {
			console.log(`Listening on port ${process.env.PORT}`)
	})
})

// const createUsersWithMessages = async () => {
//     await models.User.create ({

//     })

// }


// await models.User.create(
//     {
//       username: 'rwieruch',
//       messages: [
//         {
//           text: 'Published the Road to learn React',
//         },
//       ],
//     },
//     {
//       include: [models.Message],
//     },
//   );
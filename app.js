// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config')

// ℹ️ Connects to the database
const dbConnect = require('./db/index')
dbConnect()

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')
const cors = require('cors')
const app = express()
const moviesRouter = require('./routes/index')
// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app)


// default value for title local
const projectName = 'lab-express-cinema'
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase()

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`

app.use(cors())


// 👇 Start handling routes here
app.use('/movies',moviesRouter)

// const index = require('./routes/index')
// app.use('/', index)




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app

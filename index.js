const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const reservationRoute = require('./routes/reservations')
const shipRoute = require('./routes/ships')
const cors = require('cors')
const cron = require('node-cron')
const deleteOld = require('./utility/deleteOld')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./openapi.yaml')
dotenv.config()

const app = express()

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log('connected to db!')
)

// Middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('tu smo')
})

// Routes Middleware
app.use('/api/user', authRoute)
app.use('/api/reservation', reservationRoute)
app.use('/api/ship', shipRoute)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))

// Cron Job to delete old reservations every day at midnight
cron.schedule('0 0 * * *', function() {
  deleteOld()
})

// Listening on port
app.listen(process.env.PORT, () => console.log(`Server up and running on port ${process.env.PORT.toString()}`))

const express = require('express')

const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

const artistdetailsRouter = require('./router/artistdetails');
app.use('/', artistdetailsRouter);

const trackdetailsRouter = require('./router/trackdetails');
app.use('/', trackdetailsRouter);

const genresRouter = require('./router/genres');
app.use('/', genresRouter);

const favouritelistRouter = require('./router/favouritelist');
app.use('/', favouritelistRouter);


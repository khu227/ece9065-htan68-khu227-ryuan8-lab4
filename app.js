const express = require('express')

const app = express()
// const expressJWT = require('express-jwt')
// const config = require('./config')
const jwt = require('jsonwebtoken')

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
app.set('trust proxy', true)

const expressJWT = require('express-jwt')
const config = require('./config')

// expressJWT use for analysis token
//unless: api/open is not need to analysis token
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\/open/] }))




const configa = {
  authRequired: false,
  auth0Logout: true,
  secret: 'b972e0d1a850461887ec3fbb74784e9a555e5072c57772d1fe9e66e97b5d2d0e',
  baseURL: 'http://localhost:3009',
  clientID: '3PIU7knUIYtF9MQ9EzEEcJisAmYodHSb',
  issuerBaseURL: 'https://dev-pqf225nhdpnt5aqf.us.auth0.com'
};
//express-openid-connect is a middleware that allows you to easily add authentication to your application. It uses the OpenID Connect protocol to authenticate users and get their profile information.
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
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

const userRouter = require('./router/user');
app.use('/api/open', userRouter);

const adminRouter = require('./router/admin');
app.use('/api/admin', adminRouter);


app.listen(3009, function () {
  console.log('api server running at http://127.0.0.1:3009')
})
//---------- modules
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
//---------- modules sécurité
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
require('dotenv').config()
//---------- modules routes
const userRoutes = require("./routes/user");

//---------- Configuration

const app = express()

app
    .use(cors())
    // .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))//URL en console
    .use(express.json())
//---------- Connexion MongoDB
mongoose
  .connect(process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
  
//---------- Sécurité
const limiter = rateLimit({
windowMs: 15 *60 * 1000,
max: 100
})

app
.use(limiter)
.use(helmet())
.use(mongoSanitize())

//---------- Gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));

//---------- Routes
app.use("/api/auth", userRoutes);

module.exports = app;
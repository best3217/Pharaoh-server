import 'dotenv/config'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import compression from 'compression'
import { createStream } from 'rotating-file-stream'
import routes from './routes'
import socket from "./socket"

const app = express()

const accessLogStream = createStream('access.log', { interval: '1d', path: path.join(__dirname, 'log') })
app.use(compression())
app.use(cors({ origin: '*' }))
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))

app.use(express.static(__dirname + '/upload'))
app.use(express.static(__dirname + '/build'))

app.use('/arabian', express.static(path.join(__dirname, 'games/arabian/')))
app.use('/backgammon', express.static(path.join(__dirname, 'games/backgammon/')))
app.use('/chess', express.static(path.join(__dirname, 'games/chess/')))
app.use('/fruits', express.static(path.join(__dirname, 'games/fruits/')))
app.use('/horse', express.static(path.join(__dirname, 'games/horse/')))
app.use('/soccer', express.static(path.join(__dirname, 'games/soccer/')))

app.get('/arabian', (req, res) => res.sendFile(path.join(__dirname, 'games/arabian/index.html')))
app.get('/backgammon', (req, res) => res.sendFile(path.join(__dirname, 'games/backgammon/index.html')))
app.get('/chess', (req, res) => res.sendFile(path.join(__dirname, 'games/chess/index.html')))
app.get('/fruits', (req, res) => res.sendFile(path.join(__dirname, 'games/fruits/index.html')))
app.get('/horse', (req, res) => res.sendFile(path.join(__dirname, 'games/horse/index.html')))
app.get('/soccer', (req, res) => res.sendFile(path.join(__dirname, 'games/soccer/index.html')))

app.use('/api', routes)
app.get('*', (req, res) => res.sendFile(__dirname + 'client/build/index.html'))

mongoose.connect(process.env.DATABASES, {useUnifiedTopology:true, useNewUrlParser:true, useFindAndModify:false, useCreateIndex:true})
const http = require('http').createServer(app)
const io = require('socket.io')(http)
socket(io)
app.set('io', io)
const port = process.env.PORT || 1998
http.listen(port)
console.log('server listening on:', port)
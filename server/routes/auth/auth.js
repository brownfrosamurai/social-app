import express from 'express';
import { login } from '../../models/index.js'

const Router = express.Router()

Router.post('/login', login)

export default Router;
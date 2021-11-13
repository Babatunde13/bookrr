import mongoose from 'mongoose'
import envs from '../envs.js'

mongoose.connect(envs.dbUrl)

export default mongoose.connection

import mongoose from 'mongoose'
import envs from '../envs'

mongoose.connect(envs.dbUrl)

export default mongoose.connection

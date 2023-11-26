import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import config from './app/config'
import { studentRoutes } from './app/modules/student/student.route'
import { teacherRouters } from './app/modules/teacher/teacher.route'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

// application routes

// api/v1/teachers/create-teacher
app.use('/api/v1/teachers', teacherRouters)

app.use('/api/v1/students', studentRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send(config.database_url)
})

export default app

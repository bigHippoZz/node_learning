const express = require('express')
// formData Tyepe
const multipart = require('connect-multiparty');
// helmet  // 加强http 头部安全性
const helmet = require('helmet')
const morgan = require('morgan') // 记录请求日志
const config = require('config')
const logger = require('./middleware/logger')
const user = require('./routes/user')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connect mongodb...')).catch(err => console.log(err))
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
})
const Course = mongoose.model('Course', courseSchema)
const createCourse = async () => {
    const course = new Course({
        name: 'node',
        author: 'hippo',
        tags: ['node', 'express'],
        isPublished: true
    })
    const result = await course.save()
    console.log(result)
}
createCourse()

// 创建app
const app = express()
// 中间件
app.use(express.json()) // JSON => req.body 
app.use(multipart()) // FormData =>req.boy
app.use(express.static('public')) // public => file
app.use(helmet()) // 加强http 头部安全性
app.use(logger) // 自定义中间件
// Router
app.use('/user', user)
// app.use(morgan('tiny')) // 记录请求日志
// 环境变量
console.log(`NODE_ENV:${process.env.NODE_ENV}`)
console.log(`app:${app.get('env')}`)
console.log(`App Name:${config.get('name')}`)
// 端口
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
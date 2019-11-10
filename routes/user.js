const express = require('express')
// data验证
const Joi = require('joi')
const router = express.Router()
router.get('/', (req, res) => res.send('Hello World!'))
router.post('/', function (req, res) {
    // 特征 schema
    const schema = {
        name: Joi.string().min(2).max(10).required()
    }
    // 验证
    const result = Joi.validate(req.body, schema)
    if (result.error) return res.status(400).send(result.error.details[0].message)
    console.log(result)
    res.send({
        require: req.body,
        result
    })
})

module.exports = router
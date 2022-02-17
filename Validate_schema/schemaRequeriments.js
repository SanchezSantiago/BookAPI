const Joi = require('joi');

const bookRequeriments = Joi.object({
    title: Joi.string().required(), //Without .alphanmum() because there are books titles with special characters
    author: Joi.string().min(3).max(30).regex(/^\w+(?:\s+\w+)*$/).required(), //.regex(/^\w+(?:\s+\w+)*$/) this allows spaces and others characters
    genre: Joi.string().required(),
    read: Joi.boolean().required()
});
const userRequeriments = Joi.object({
    firstName:Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[A-Za-z\u00f1\u00d10-9]{8,}$')).required(), //\u00f1 = ñ  \u00d1 = Ñ so the pattern allow this letters
    address: Joi.string().allow(null, ''), //the user decides whether to enter his address or not, .allow(null, '') allows leave it empty
    phone: Joi.number().required()
})


module.exports = {bookRequeriments, userRequeriments};

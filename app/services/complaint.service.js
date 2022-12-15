const ComplaintModel = require("../models/complaint.model")
const token = require("../security/jwt.security")


const create = async (body) => {

    console.log(body)

const tokenDecrypt =token.decode(body.token)

console.log(tokenDecrypt)
    const callComplaint= new ComplaintModel({ 
        title: body.title,
        description: body.description,
        user: tokenDecrypt._id}
       )
    await callComplaint.save()
 }

module.exports = {create}
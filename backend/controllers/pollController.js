import catchAsync from './../utils/catchAsync.js'
import Poll from './../models/pollModel.js'

const createPoll= catchAsync(async(req,res,next)=>{

    const { question , options }= req.body

    const poll=await Poll.create({
        question,
        options    
    })

    res.status(201).json(poll)
})

export{
    createPoll
}
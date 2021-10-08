import catchAsync from './../utils/catchAsync.js'
import Poll from './../models/pollModel.js'
import mongoose from 'mongoose'

const createPoll= catchAsync(async(req,res,next)=>{

    const { question , options }= req.body

    const poll=await Poll.create({
        question,
        options    
    })

    res.status(201).json(poll)
})

const getPoll= catchAsync(async(req,res,next)=>{

    const pollId= mongoose.Types.ObjectId(req.params.id)

    const poll=await Poll.findOne({ _id:  pollId})

    res.status(200).json(poll)
})

const increaseCount= catchAsync(async(req,res,next)=>{

    // console.log('backend')
      let { pollId, optionId }= req.body

      pollId= mongoose.Types.ObjectId(pollId)
      let poll=await Poll.findOne({ _id:  pollId})

    //   console.log(poll)
      if(poll)
      {
        const index= poll.options.findIndex((element)=> element._id.equals(optionId) )
        poll.options[index].count++;
      
        poll= await poll.save()
      }

      res.status(200).json(poll);
})

export{
    createPoll,
    getPoll,
    increaseCount
}
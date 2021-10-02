import mongoose from 'mongoose'


const pollSchema = mongoose.Schema(
  {
    question:{
        type: String,
        required: true        
    },
    options:[{value:{
        type: String,
        required: true
    }}]
  }
)

const Poll = mongoose.model('Poll', pollSchema)

export default Poll

import mongoose from 'mongoose'


const pollSchema = mongoose.Schema(
  {
    question:{
        type: String,
        required: true        
    },
    options:[{value:{
        type: String,
        required: true},
        count: {
          type: Number,
          default: 0
        }
    }]
  }
)

const Poll = mongoose.model('Poll', pollSchema)

export default Poll

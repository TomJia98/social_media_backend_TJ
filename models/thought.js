const { Schema, Types, model } = require('mongoose');

function formatDate (date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
 return date.toLocaleDateString("en-US", options)
}

const reactionSchema = new Schema({
reactionId: {
    type: Types.ObjectId,
    default: new Types.ObjectId
},
 reactionBody: { type: String,
required: true,
maxlength:280
},
username: {
    type: String,
    required: true
},
createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate   
},
})

const thoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
            
        },
        username: {
            type: String,
            Required: true
        },
        reactions: [reactionSchema]

    })
    
thoughtSchema.virtual('reactionCount').get( function(){
        return this.reactions.length
    })

    const Thought = model('Thought', thoughtSchema);

    module.exports= Thought;
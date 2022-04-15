const { Schema, Types, model } = require('mongoose');

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: { 
            type: String,
            required: true,
            unique: true, 
            required: 'Email address is required',
            validate: [validateEmail, 'Please provide a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
          ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
          ],
         toJSON: {
             virtuals: true
            }

    }
)

userSchema.virtual('friendCount').get( function(){
    return this.friends.length
})

const User = model('User', userSchema);

module.exports = User;
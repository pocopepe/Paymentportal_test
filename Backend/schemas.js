const connectDB=require('./db');
connectDB();

const userSchema=mongoose.Schema({ email: String, password: String, firstname: String, lastname: String})
const User = mongoose.model('User', userSchema);

const accountSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balence: {
        type: Number, 
        required: true,
    }
})
const Account= mongoose.model('Accounts', accountSchema)




module.exports = {User, Account};

const connectDB=require('./db');
connectDB();

const User = mongoose.model('User', { email: String, password: String, firstname: String, lastname: String});




module.exports = {User};

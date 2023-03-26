const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;


// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//     email: {type: String, unique: true, required: true},
//     password: {type: String, required: true}
// });

// userSchema.pre('save', function(next){
//     const user = this;

//     if(!user.isModified('password')) return next();
//     bcrypt.hash(user.password, 10, function(error, hashedPassword) {
//         if(error) return next(error);
//         user.password = hashedPassword;
//         next();
//     });
// });

// userSchema.method.checkPassword = function (password, callback){
//     bcrypt.compare(password, this.password, function(error, isMatch){
//         if(error) return callback(error);
//         callback(null, isMatch);
//     });
// };

// module.exports = mongoose.model('User', userSchema);

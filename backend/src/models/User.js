const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['student', 'tutor'], default: 'student'},
    campus: {type: String, enum: ['JHB', 'CPT']}
});

const User = mongoose.model('User', UserSchema);

export default User;
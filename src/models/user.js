import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number!');
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password can`t contain substring "password"');
			}
		}
	},
	tokens: [{
		token: {
			type: String,
			required: true,
		}
	}]
});

userSchema.methods.generateAuthToken = async function() {
	const user = this;

	const token = jwt.sign({ _id: user._id.toString() }, 'thisistaskapp');
	user.tokens = user.tokens.concat({ token });
	user.save();

	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login');
	}

	return user;
};

// hash password
// this === saved document!!!!
userSchema.pre('save', async function(next) {
	const user = this;
	
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = mongoose.model('User', userSchema);

export { User };
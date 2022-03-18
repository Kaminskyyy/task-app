import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

async function auth(req, res, next) {
	
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, 'thisistaskapp');
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

		if (!user) {
			throw new Error();
		}

		req.token = token;
		req.user = user;
		next();
	} catch {
		res.status(401).send({ error: 'Please authenticate.' });
	}
}

export { auth };
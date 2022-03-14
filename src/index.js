import express from 'express';
import './db/mongoose.js';
import { Task } from './models/task.js';
import { User } from './models/user.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
	const user = new User(req.body);

	try { 
		await user.save();
		res.status(201).send(user);
	} catch (err) {
		res.status(400).send(err);
	}
});

app.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (err) {
		res.status(500).send();
	}
});

app.get('/users/:id', (req, res) => {
	const id = req.params.id;
	
	try {
		const user = User.findById(id);
		
		if (!user) {
			return res.satus(404).send();
		}

		res.send(user);
	} catch (err) {
		res.status(500).send();
	}
});

app.post('/tasks', async (req, res) => {
	const task = new Task(req.body);

	try {
		await task.save();
		res.status(500).send(task);
	} catch (err) {
		res.status(400).send(err);
	}
});

app.get('/tasks', async (req, res) => {
	try {
 		const tasks = await Task.find({});
		res.send(tasks);
	} catch (err) {
		res.status(500).send();
	}
});

app.get('/tasks/:id', async (req, res) => {
	const id = req.params.id;
	
	try {
		const task = await Task.findById(id);

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch(err) {
		res.status(500).send();
	}
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
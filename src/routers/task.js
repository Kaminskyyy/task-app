import { Router } from 'express';
import { Task } from '../models/task.js';
import { auth } from '../middleware/auth.js';

const router = new Router();

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (err) {
		res.status(400).send(err);
	}
});

// ?completed=true/false
// ?limit=20&skip=10
// ?sortBy='criteria':'order'
router.get('/tasks', auth, async (req, res) => {
	const match = {};
	const sort = {};
	
	if (req.query.completed) {
		match.completed = req.query.completed === 'true';
	}

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'asc' ? 1 : -1;
	}
	
	try {
 		await req.user.populate({
			path: 'tasks',
			match,
			options: {
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort,
			},
		});

		res.send(req.user.tasks);
	} catch (err) {
		res.status(500).send();
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	const id = req.params.id;
	
	try {
		const task = await Task.findOne({ id, owner: req.user._id });

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch(err) {
		res.status(500).send();
	}
});

router.patch('/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

		if (!task) {
			res.status(404).send();
		}

		updates.forEach((update) => task[update] = req.body[update]);
		task.save();
		
		res.send(task);
	} catch (err) {
		res.status(400).send();
	}
});

router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (err) {
		res.status(500).send(err);
	}
});

export { router };
import express from 'express';
import './db/mongoose.js';
import { router as userRouter } from './routers/user.js';
import { router as taskRouter } from './routers/task.js';

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
// 	if (req.method === 'GET') {
// 		res.send('GET request are disabled');
// 	} else {
// 		next();
// 	}
// });

// app.use((req, res) => {
// 	res.status(503).send('Server is under maintenance!');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
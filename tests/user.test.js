import request from 'supertest';
import app from '../src/app.js';
import { User } from '../src/models/user.js';

const userOne = {
	name: 'Stanislav',
	email: 'thehustaan@gmaillllllll.com',
	password: 'qwerty123',
};

beforeEach(async () => {
	await User.deleteMany({});
	await new User(userOne).save();
});

test('Should signup a new user', async () => {
	await request(app).post('/users').send({
		name: 'Andrew',
		email: 'thehustaan@gmail.com',
		password: 'qwerty123'
	}).expect(201);
});

test('Should login existing user', async () => {
	await request(app).post('/users/login').send({
		email: userOne.email,
		password: userOne.password,
	}).expect(200);	
});

test('Should not login nonexistent user', async () => {
	await request(app).post('/users/login').send({
		email: 'nonExistentUserEmail@email.com',
		password: 'nonExistent',
	}).expect(400);
});
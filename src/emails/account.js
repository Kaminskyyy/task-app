import sgMail from '@sendgrid/mail';

const sendgridAPIKey = process.env.SENDGRID_TOKEN;

sgMail.setApiKey(sendgridAPIKey);

function sendWelcomeEmail(email, name) {
	sgMail.send({
		to: email,
		from: 'thehustaan@gmail.com',
		subject: 'Thanks for joinig in!',
		text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
	});
}

function sendCancelationEmail(email, name) {
	sgMail.send({
		to: email,
		from: 'thehustaan@gmail.com',
		subject: 'We will miss you...',
		text: `${name}, please tell us why you decided to leave Task App?`
	});
}

export { sendWelcomeEmail, sendCancelationEmail };
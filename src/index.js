import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import busyboy from 'connect-busboy';
import * as util from 'util';
import * as _ from "./Utils";
import Guid from 'guid';
import path from 'path';
import multer from 'multer';

// Files uploaded will be stored on disk
const upload = multer({
	storage: multer.diskStorage({
		destination: "uploads/",
		filename: function (req, file, cb) {
			cb(null, "F_" + Date.now() + "_" + file.originalname.replace(/\s+/g, "_"))
		}
	})
});

// In case you need to store them in memory as buffers, use the following:
//const storage = multer.memoryStorage()
//const upload = multer({ storage }) 

let app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, '../public')));
app.use(busyboy());
app.use(bodyParser.json({ limit: '5mb' })); //Parses raw body as JSON
app.use(bodyParser.urlencoded({
	limit: '5mb',
	extended: true
}));  //Parses x-www-form-urlencoded body type of HTTP requests.

app.get('/sayHello', function (req, res) {

	var q = util._extend({}, req.query);
	let { to } = q;
	to = (to) ? to : "World";

	res.send(`Hello, ${to} !`);
});

// Actions that handles "x-www-form-urlencoded" body, look like this
app.post('/testing', function (req, res) {

	var q = util._extend({}, req.body);
	let { something } = q;
	let success = (something) ? true : false;

	res.json({ success, testing: something });
});


// Actions that handles "multipart/form-data" body, look like this
app.post('/testing-parts', upload.array(), function (req, res) {

	var q = util._extend({}, req.body);
	let { something } = q;
	let success = (something) ? true : false;

	res.json({ success, testing: something });
});


// In case you're expecting file uploads, use the following command
// to state that:
//      upload.any()                 --> Expecting files in any field
//      upload.single('avatar')      --> Expecting file in field 'avatar'
//      upload.array('photos', 12)   --> Expecting array of files for field 'photos'

app.post('/upload', upload.any(), function (req, res) {

	// Access files 
	console.log(req.files);

	res.json({ success: true });
});

app.listen(app.get('port'), function () {
	console.log('Actions handlers on port', app.get('port'))
});

export default app;




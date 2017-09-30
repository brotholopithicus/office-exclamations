const express = require('express');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT || '3000';

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(PORT, () => {
	console.log('listening on ' + PORT);
});

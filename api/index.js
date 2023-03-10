const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const multer = require('multer');
const path = require('path');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');

dotenv.config();

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology:true},
    ()=>{
    console.log('connected to mongodb');
});



// upload images
app.use('/images',express.static(path.join(__dirname, "public/images")));



// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));


// upload files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req,file,cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
    }
})
const upload = multer({storage: storage});
app.post('/api/upload', upload.single('file'), (req,res)=>{
    try {
        return res.status(200).json('file uploaded');
    } catch (err) {
        console.log();
    }
});



// routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations',conversationRoute);
app.use('/api/messages', messageRoute);


app.get('/', (req, res)=>{
    res.send('welcome to home page')
})

app.get('/users', (req, res)=>{
    res.send('welcome to user page')
})

app.listen(8800, ()=>{
    console.log('backend server is running');
});
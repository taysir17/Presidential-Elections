const express = require('express');
const cors = require('cors')
require('./config/connect');

const swaggerDocs = require("./swagger");
//swaggerDocs(app);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


// Import des routes
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const commentRoutes = require('./routes/commentRoutes');
const electionRoutes = require('./routes/electionRoutes');
const voteRoutes = require('./routes/voteRoutes');

// Utilisation des routes
app.use('/users', userRoutes);       
app.use('/candidates', candidateRoutes); 
app.use('/comments', commentRoutes);    
app.use('/elections', electionRoutes);  
app.use('/votes', voteRoutes);          




app.listen( 3005 , ()=>{console.log('server work on http://loclahost:3005/');

})
import express from 'express';
import bodyparser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/clientsRoutes';


const app = express();
const PORT = 4000;

// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// CORS setup
app.use(cors());

// helmet setup
app.use(helmet());

routes(app);

app.get('/', (req, res) => 
    res.send(`Our application is running on port ${PORT}`)
);

app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);


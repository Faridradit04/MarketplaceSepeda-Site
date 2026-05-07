import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/config.js';
import authRoute from './routes/authRoute.js';
import bikeRoute from './routes/bikeRoutes.js';
import './model/index.js';
dotenv.config();
async function testConnection(){
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect');
    }
}
testConnection();
db.sync()
  .then(() => {
    console.log("✅ Semua tabel berhasil dibuat");
  })
  .catch((err) => {
    console.error("❌ Gagal sync:", err);
  });
const app = Express();
const port = process.env.PORT || 3040;
app.use(cors());
app.use(Express.json());
app.use('/api/auth', authRoute);
app.use('/api/bikes', bikeRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
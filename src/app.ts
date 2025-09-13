import express from 'express';
import cors from 'cors';
import userRoutes from './modules/user/user.routes';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { connectDB } from "./config/database";
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';
import hotelRoutes from './modules/hotels/hotel.routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['*']
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);


app.use(errorHandler);


(async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log('Server is running on port 3000');
    })
})();

export default app;

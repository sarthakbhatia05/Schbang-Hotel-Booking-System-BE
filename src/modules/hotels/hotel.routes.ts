import { Router } from "express"
import { create, getHotel, searchHotels, updateSpecialPrice } from "./hotel.controller";
import { validateDtoMiddleware } from './../../middlewares/validateReq.middleware';
import { RegisterHotelDto } from "./dto/hotel.dto";
import { UpdateSpecialPriceDto } from './dto/updateSpecialPrice.dto';
import { verifyJwtMiddleware, isAdminMiddleware } from '../../middlewares/auth.middleware';

const router = Router()

/**
 * @swagger
 * /api/hotels:
 *   post:
 *     summary: Create a new hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hotel Paradise
 *               location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                     example: 28.6139
 *                   long:
 *                     type: number
 *                     example: 77.2090
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/hotel1.jpg", "https://example.com/hotel2.jpg"]
 *               defaultPrice:
 *                 type: number
 *                 example: 1000
 *     responses:
 *       201:
 *         description: Hotel created
 *       400:
 *         description: Invalid input
 */
router.post("/", verifyJwtMiddleware, isAdminMiddleware, validateDtoMiddleware(RegisterHotelDto), create);

/**
 * @swagger
 * /api/hotels/search:
 *   get:
 *     summary: Find hotels by location and get price for a date range
 *     tags: [Hotels]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitude
 *       - in: query
 *         name: long
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitude
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of hotels with price per day for the date range
 *       400:
 *         description: Invalid input
 */
router.get("/search", searchHotels);


/**
 * @swagger
 * /api/hotels/{id}:
 *   get:
 *     summary: Get hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hotel found
 *       404:
 *         description: Hotel not found
 */
router.get("/:id", getHotel);

/**
 * @swagger
 * /api/hotels/special-price:
 *   post:
 *     summary: Set or update special price for a hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "64e8b7f2c8e4b2a1f8d2c3e4"
 *               price:
 *                 type: number
 *                 example: 1200
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-07-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-07-10"
 *     responses:
 *       200:
 *         description: Special price updated
 *       400:
 *         description: Invalid input
 */
router.post("/special-price", verifyJwtMiddleware, isAdminMiddleware, validateDtoMiddleware(UpdateSpecialPriceDto), updateSpecialPrice);



export default router;


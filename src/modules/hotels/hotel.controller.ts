import { plainToInstance } from "class-transformer";
import { HotelService } from "./hotel.service";
import { Request, Response, NextFunction } from 'express';
import { validate } from "class-validator";
import { SearchHotelsDto } from "./dto/search-hotels.dto";


export const hotelService = new HotelService();
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await hotelService.createHotel(req.body);
        res.status(201).json(`Hotel ${result.name} created successfully with id ${result._id}`);
    } catch (err) {
        next(err);
    }
}

export const getHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotel = await hotelService.getHotelById(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json(hotel);
    } catch (err) {
        next(err);
    }
}

export const updateSpecialPrice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, price, startDate, endDate } = req.body;
        const result = await hotelService.updateSpecialPrice(id, price, new Date(startDate), endDate ? new Date(endDate) : undefined);
        res.json({ message: 'Price updated successfully', result });
    } catch (err) {
        next(err);
    }
}

export const searchHotels = async (req: Request, res: Response, next: NextFunction) => {

    const dto = plainToInstance(SearchHotelsDto, req.query);

    try {
        const errors = await validate(dto);
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed", errors });
        }
        const { lat, long, startDate, endDate } = req.query;
        const hotels = await hotelService.findHotelsWithPricesByLocation(
            parseFloat(lat as string),
            parseFloat(long as string),
            new Date(startDate as string),
            new Date(endDate as string)
        );
        res.json(hotels);
    } catch (err) {
        next(err);
    }
}
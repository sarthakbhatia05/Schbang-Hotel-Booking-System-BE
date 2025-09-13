
import { RegisterHotelDto } from "./dto/hotel.dto";
import { HotelModel } from "./models/hotel.model";
import { SpecialPriceModel } from "./models/specialPrice.model";
import createError from "http-errors";

export class HotelService {

    async createHotel(registerHotelDto: RegisterHotelDto) {
        const newHotelData = {
            ...registerHotelDto,
            location: { type: 'Point', coordinates: [registerHotelDto.location.long, registerHotelDto.location.lat] }
        }
        const newHotel = new HotelModel(newHotelData);
        await newHotel.save();
        return newHotel;
    }

    async getHotelById(id: string) {
        return HotelModel.findById(id);
    }

    async updateSpecialPrice(id: string, price: number, startDate: Date, endDate?: Date) {
        const hotel = await HotelModel.findById(id);
        if (!hotel) throw new createError.NotFound('Hotel not found');

        const filter = {
            hotelId: hotel._id,
            startDate: startDate,
            endDate: endDate || startDate
        };

        const update = {
            price,
            hotelId: hotel._id,
            startDate,
            endDate: endDate || startDate
        };

        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await SpecialPriceModel.findOneAndUpdate(filter, update, options);
        if (!result) throw new createError.InternalServerError('Failed to update special price');
        return result;

    }

    async findHotelsWithPricesByLocation(lat: number, long: number, startDate: Date, endDate: Date) {
        const hotels = await HotelModel.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [lat, long] },
                    $maxDistance: 2000
                }
            }
        });
        if (hotels.length === 0) {
            throw new createError.NotFound('No hotels found within 2 km radius');
        }

        const days: Date[] = [];
        let d = new Date(startDate);
        while (d <= endDate) {
            days.push(new Date(d));
            d.setDate(d.getDate() + 1);
        }

        const results = await Promise.all(hotels.map(async hotel => {
            const specials = await SpecialPriceModel.find({
                hotelId: hotel._id,
                $or: [
                    { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
                ]
            });

            const prices = days.map(day => {
                const special = specials.find(s =>
                    s.startDate <= day && s.endDate >= day
                );
                return {
                    date: day.toISOString().slice(0, 10),
                    price: special ? special.price : hotel.defaultPrice
                };
            });
            return {
                hotel,
                prices,
                totalPrice: prices.reduce((sum, prices) => sum + prices.price, 0)
            };
        }));
        return results;
    }


}
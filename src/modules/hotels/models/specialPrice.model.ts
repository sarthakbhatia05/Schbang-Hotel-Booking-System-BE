import { prop, getModelForClass, modelOptions, Ref, index } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@index({ hotel: 1, startDate: 1, endDate: 1 }, { unique: true })
@modelOptions({ schemaOptions: { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' }, versionKey: false } })

export class SpecialPrice {
    @prop({ required: true, ref: 'Hotel' })
    hotelId!: Ref<Types.ObjectId>;

    @prop({ required: true })
    startDate!: Date;

    @prop({ required: true })
    endDate!: Date;

    @prop({ required: true })
    price!: number;

    @prop()
    createdOn?: Date;

    @prop()
    updatedOn?: Date;

}

export const SpecialPriceModel = getModelForClass(SpecialPrice);

import { prop, getModelForClass, modelOptions, index } from '@typegoose/typegoose';

class Location {
    @prop({ required: true, enum: ["Point"], default: "Point" })
    type!: string;

    @prop({ required: true, type: () => [Number] })
    coordinates!: [number, number];
}

@index({ location: '2dsphere' })
@modelOptions({ schemaOptions: { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" }, versionKey: false } })
export class Hotel {
    @prop({ required: true })
    name!: string;

    @prop({
        required: true,
        type: () => Object,
        _id: false,
    })

    @prop({ required: true, _id: false })
    location!: Location;

    @prop({ type: () => [String], default: [] })
    photos!: string[];

    @prop({ required: true })
    defaultPrice!: number;

    @prop()
    createdOn?: Date;

    @prop()
    updatedOn?: Date;

}

export const HotelModel = getModelForClass(Hotel);

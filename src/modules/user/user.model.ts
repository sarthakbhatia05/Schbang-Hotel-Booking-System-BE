import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { UserRole } from './dto/create-user.dto';

@modelOptions({ schemaOptions: { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } } })
export class User {


    @prop({ required: true })
    name!: string;

    @prop({ required: true, unique: true })
    email!: string;

    @prop({ required: true })
    password!: string;

    @prop({ enum: UserRole, required: true })
    role!: UserRole;

    @prop()
    createdOn?: Date;

    @prop()
    updatedOn?: Date;

}

export const UserModel = getModelForClass(User);

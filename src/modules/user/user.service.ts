import { User, UserModel } from './user.model';
import { UpdateUserDto } from './dto/update-user.dto';


export class UserService {

    async update(id: string, updateDto: UpdateUserDto): Promise<User | null> {
        return UserModel.findByIdAndUpdate(
            id,
            { ...updateDto, updatedOn: new Date() },
            { new: true }
        );
    }

    async findById(id: string): Promise<User | null> {
        return UserModel.findById(id);
    }

}

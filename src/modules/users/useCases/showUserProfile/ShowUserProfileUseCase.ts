import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User {
    console.log(`searching ${user_id}`);
    const user = this.usersRepository.findById(user_id);
    if (!user) {
      throw new Error("User not found!");
    }
    return user;
  }
}

export { ShowUserProfileUseCase };

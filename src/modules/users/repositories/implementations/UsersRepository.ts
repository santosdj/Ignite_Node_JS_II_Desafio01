import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user: User = new User();
    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });
    console.log(`created user ==${user}`);

    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const user: User = this.users.find((user) => user.id === id);
    console.log(`${user} found by id = ${id}`);
    return user;
  }

  findByEmail(email: string): User | undefined {
    const user: User = this.users.find((user) => {
      console.log(email);
      return user.email === email;
    });

    return user;
  }

  turnAdmin(receivedUser: User): User {
    Object.assign(receivedUser, { admin: true, updated_at: new Date() });
    const index = this.users.findIndex((user) => user.id === receivedUser.id);
    this.users[index] = receivedUser;
    return receivedUser;
  }

  list(): User[] {
    const { users } = this;
    return users;
  }
}

export { UsersRepository };

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public login(email: string, password: string, id: string) {
    //Check if user exixts database
    const user = this.usersService.findOneById(id);

    //login
    if (user) {
      return 'SAMPLE_TOKEN';
    }
    //token
  }

  public isAuthenticated() {
    return true;
  }
}

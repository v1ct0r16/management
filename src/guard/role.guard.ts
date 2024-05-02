
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { request } from 'https';
// import { forBiddenRoleException } from 'src/exception/role.exception';
// import { UserService } from 'src/user/user.service';
// import { Roles } from './role';
// import { userRole} from 'src/enum/role.enum';


// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector, private userService: UserService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const  role = this.reflector.get<string[]>('roles', context.getHandler());

//     const request = context.switchToHttp().getRequest();
//     if(request?.user){
//         const headers:Headers=request.headers;
//         let user = this.userService.user(headers);

//         if(!role.includes((await user).role)) {
//             throw new forBiddenRoleException(Roles.join(' or '));

//         } return true;
//     } return false;



// }

// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { request } from 'https';
import { forBiddenRoleException } from 'src/exception/role.exception';
import { UserService } from 'src/user/user.service';
import { Roles } from './role';
import { userRole } from 'src/enum/role.enum';

type ExtendedUserRole = userRole | 'user' | 'admin';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<ExtendedUserRole[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      const headers: Headers = request.headers;
      let user = this.userService.user(headers);

      if (!role.includes((await user).role)) {
        throw new forBiddenRoleException(
          `${role.join(' or ')}`,
        );
      }
      return true;
    }
    return false;
  }
}
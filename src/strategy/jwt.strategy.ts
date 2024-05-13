import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/entity/user.entity";
import { UserService } from "src/user/user.service";



@Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userService:UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: { email }):Promise<User> {
        const {email} = payload;
        const user = await this.userService.findEmail(email);
        if (!user) {
            throw new UnauthorizedException('log in first')
        }
        return user
    }
}

import { ForbiddenException } from "@nestjs/common";

export class forBiddenRoleException extends ForbiddenException{
    constructor(role: string){
        super(`You are not allowed to perform this action as you are a ${role}`);
    }

    }

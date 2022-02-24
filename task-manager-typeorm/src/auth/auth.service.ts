import { JwtPayload } from './jwt-payload.interface';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }
    
    async signUp(authCredentialsDto:AuthCredentialsDto) {
        return this.userRepository.signUp( authCredentialsDto );
    }

    async signIn( authCredentialsDto: AuthCredentialsDto ):Promise<{accessToken:string}> {
        const username = await this.userRepository.validateUserPassword( authCredentialsDto );

        if ( !username ) {
            throw new UnauthorizedException("Invalid Credentials");
        }

        // generate payload for jwt token
        const payload:JwtPayload = { username }; // dont add sensitive data
        const accessToken = await this.jwtService.sign( payload );
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`)
        return {accessToken}; // returning object
    }
}

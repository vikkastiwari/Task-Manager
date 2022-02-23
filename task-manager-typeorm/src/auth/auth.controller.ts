import { User } from './user.entity';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('/signup')
    // passing validation pipe here does the magic and all validation dto are taken into picture
    signUp( @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto ):Promise<void> {
        return this.authService.signUp( authCredentialsDto );
    }

    @Post( '/signin' )
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto):Promise<{accessToken:string}> {
        return this.authService.signIn( authCredentialsDto );
    }

    @Post( '/test' )
    @UseGuards( AuthGuard() )
    test( @GetUser() user:User ) {
        console.log(user);
    }

    // this returns every property associated with it
    // test( @Req() req ) {
    //     console.log(req.user);
    // }
}

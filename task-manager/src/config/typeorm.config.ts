import { TypeOrmModuleOptions } from "@nestjs/typeorm";

console.log(process.env.database);


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: "url",
    autoLoadEntities: true,
    synchronize: true,
}

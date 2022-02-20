import { TypeOrmModuleOptions } from "@nestjs/typeorm";

console.log(process.env.database);


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: "postgres://urhuhujw:7VF9560KOVlW1f7FCdUW1YbHoBrzgVv3@castor.db.elephantsql.com/urhuhujw",
    autoLoadEntities: true,
    synchronize: true,
}
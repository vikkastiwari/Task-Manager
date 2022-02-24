import { Task } from './../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseEntity } from 'typeorm';
import * as bcrypt from "bcrypt";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    // adding it - such that user can access only those tasks that they have created
    @OneToMany(type=>Task,task=>task.user,{eager:true})
    tasks: Task[]

    // custom password validator
    async validatePassword( password: string ): Promise<boolean>{
        const hash = await bcrypt.hash( password, this.salt );
        return hash === this.password;
    }
}
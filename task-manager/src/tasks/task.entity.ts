import { TaskStatus } from './task.model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: String;

    @Column()
    description: string;

    @Column()
    status: TaskStatus
}
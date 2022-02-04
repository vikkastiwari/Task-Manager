import { GetTaskFilterDto } from './dto/get-filtered-tasks.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[] {
        return this.tasks;
    }

    getTasksWithFilters(getTaskFilterDto:GetTaskFilterDto): Task[]{
        const { status, search } = getTaskFilterDto;
        let tasks = this.getAllTasks();

        if ( status ) {
            tasks = tasks.filter( task => task.status === status );
        }

        if ( search ) {
            tasks = tasks.filter( task =>
                task.title.includes( search ) ||
                task.description.includes( search ),
            );
        }

        return tasks;
    }

    getTaskById(id:string) {
        return this.tasks.find( task => task.id === id );
    }

    createTask( createTaskDto: CreateTaskDto ): Task {
        // console.log( createTaskDto );
        const {title, description} = createTaskDto;
        // object
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push( task );
        return task;
    }

    updateTaskStatus( id: string, status:TaskStatus ) {
        const task = this.getTaskById( id );
        task.status = status;
        return task;
     }
    
    deleteTask(id:string) {
        this.tasks = this.tasks.filter( task => task.id !== id );
    }
}



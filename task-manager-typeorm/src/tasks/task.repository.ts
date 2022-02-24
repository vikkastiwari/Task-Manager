import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from './../auth/user.entity';
import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-filtered-tasks.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger();
    async getTasks(filterDto: GetTaskFilterDto, user:User): Promise<Task[]> {
    const { status, search } = filterDto;

    //   It builds query for us to utilize and we pass task as a keyword for utilization with the query
    const query = this.createQueryBuilder('task');

    // getting user id - this is a column that is automatically generated for us by typeorm
    query.where( 'task.userId = :userId', { userId: user.id } );

    //   andWhere - where clause for sql query
    if ( status ) {
        //                variable                  key
        query.andWhere('task.status = :status', { status });
    }

    if (search) {
        // like is equivalent to equal sign
        query.andWhere( '(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` } );
        // `%${search}%` - this makes partial search possible
    }

    try {
    const tasks = await query.getMany();
    return tasks;
    } catch ( error ) {
        this.logger.error( `Failed to get tasks for user ${user.username}. Filters: ${JSON.stringify( filterDto )}`, error.stack );
        throw new InternalServerErrorException();          
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user:User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user; // assigning task to user
    
    try {
        await task.save();
    } catch (error) {
        this.logger.error( `Failed to create task for user ${user.username}. Filters: ${JSON.stringify( createTaskDto )}`, error.stack ); // error.stack provides error stack
        throw new InternalServerErrorException();         
    }

    delete task.user; // task.user is saved and we dont want to print sensitive data that's why we are deleting it to restrict from being print.
      
    return task;
  }
}
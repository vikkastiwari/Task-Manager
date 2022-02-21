import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-filtered-tasks.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
      const { status, search } = filterDto;
      
    //   It builds query for us to utilize and we pass task as a keyword for utilization with the query
    const query = this.createQueryBuilder('task');

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

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}
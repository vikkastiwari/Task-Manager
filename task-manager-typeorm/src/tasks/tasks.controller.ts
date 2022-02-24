import { User } from './../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTaskFilterDto } from './dto/get-filtered-tasks.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger( 'TaskController' );
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks( @Query( ValidationPipe ) filterDto: GetTaskFilterDto, @GetUser() user: User ): Promise<Task[]>  {
      this.logger.verbose( `User "${user.username}" reteriving all tasks. Filters: ${JSON.stringify( filterDto )}` ); // filterDto is object therefore passed with stringify
    return this.tasksService.getTasks(filterDto,user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user:User): Promise<Task> {
    return this.tasksService.getTaskById(id,user);
  }

  @Post()
  @UsePipes( ValidationPipe )
//   @GetUser() user:User - getting user who created the task
  createTask( @Body() createTaskDto: CreateTaskDto, @GetUser() user: User ): Promise<Task> {
      this.logger.verbose( `User "${user.username}" creating new task. Data: ${JSON.stringify(createTaskDto)}` );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask( @Param( 'id', ParseIntPipe ) id: number, @GetUser() user:User): Promise<void> {
    return this.tasksService.deleteTask(id,user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body( 'status', TaskStatusValidationPipe ) status: TaskStatus,
    @GetUser() user:User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status,user);
  }
}
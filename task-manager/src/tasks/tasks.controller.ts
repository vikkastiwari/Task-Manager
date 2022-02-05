import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTaskFilterDto } from './dto/get-filtered-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor ( private tasksService: TasksService) { }
    
    @Get()
    getTasks( @Query(ValidationPipe) getTaskFilterDto: GetTaskFilterDto ): Task[] {
        // console.log(Object.keys( getTaskFilterDto ).length );
        
        if ( Object.keys( getTaskFilterDto ).length ) {
            return this.tasksService.getTasksWithFilters( getTaskFilterDto );
        }
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):Task {
        return this.tasksService.getTaskById( id );
    }

    // @Post()
    // createTask(@Body('title') title, @Body('description') description):Task {
    //     return this.tasksService.createTask( title, description );
    // }

    // with dto
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDto):Task {
        return this.tasksService.createTask( createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string):void {
        return this.tasksService.deleteTask(id);
    }

    @Patch( '/:id/status' )
    updateStatus(
        @Param( 'id' ) id: string,
        @Body( 'status', TaskStatusValidationPipe ) status: TaskStatus ): Task
    {
        return this.tasksService.updateTaskStatus( id, status );
    }
}

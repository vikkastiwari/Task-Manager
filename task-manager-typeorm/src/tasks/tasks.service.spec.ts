import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';
import {Test} from '@nestjs/testing';

const mockTaskRepository = () => ( {
    // mock function
    getTasks: jest.fn(),
})

describe('TasksService',()=>{
    let tasksService;
    let taskRepository;

    beforeEach(async()=>{
        const module = await Test.createTestingModule( {
            providers: [
                TasksService,
                // using useFactory coz we want it to get created over and over again
                { provide: TaskRepository, useFactory: mockTaskRepository },
            ],
        } ).compile();
        
        tasksService = await module.get<TasksService>( TasksService );
        taskRepository = await module.get<TaskRepository>( TaskRepository );
    } )
    
    describe( 'getTasks', () => {
        it( 'get all tasks from the repository', () => {
            expect( taskRepository.getTasks ).not.toHaveBeenCalled();
        })
    })
})
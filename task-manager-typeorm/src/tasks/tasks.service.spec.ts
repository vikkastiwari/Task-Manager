import { GetTaskFilterDto } from './dto/get-filtered-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';
import { Test } from '@nestjs/testing';

const mockUser = { id:12, username: 'Test user' };

const mockTaskRepository = () => ( {
    // mock function
    getTasks: jest.fn(),
    findOne: jest.fn(),
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
        it( 'get all tasks from the repository', async() => {

            // 
            // taskRepository.getTasks.mockRejectedValue();
            // taskRepository.getTasks.mockReturnedValue();

            // we are using this coz it is returning the promise
            taskRepository.getTasks.mockResolvedValue('someValue');

            expect( taskRepository.getTasks ).not.toHaveBeenCalled();

            const filters: GetTaskFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'some search query' };

            // call getTasks()
            const result = await tasksService.getTasks( filters, mockUser );

            // checking on called function
            expect( taskRepository.getTasks ).toHaveBeenCalled();

            expect( result ).toBe( 'someValue' );
        });
    });
    describe('getTaskById', () => { 
       it('calls taskRepository.findOne() and successfuly retrieve and return the task',async()=>{
           const mockTask = {title:'Title task', description:'Test desc'};
           taskRepository.findOne.mockResolvedValue(mockTask);

           const result = await tasksService.getTaskById(1,mockUser);

           expect( result ).toEqual( mockTask );
           
        //    check return value
           expect( taskRepository.findOne ).toHaveBeenCalledWith( {
               where: {
                   id: 1,
                   userId: mockUser.id,
               },
           });
       });

       it('throws an error as task is not found',()=>{
           taskRepository.findOne.mockRejectedValue( null );
           expect( tasksService.getTaskById( 1, mockUser ) ).rejects.toThrow();
       })
    });
});
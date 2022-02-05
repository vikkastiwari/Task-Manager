import { TaskStatus } from './../task.model';
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.DONE,TaskStatus.IN_PROGRESS,TaskStatus.OPEN])
    status: string;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}

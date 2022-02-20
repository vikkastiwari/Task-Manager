import { TaskStatus } from './../task.model';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ];

    transform( value: any, metadata: ArgumentMetadata ) {
        value = value.toUpperCase();

        if ( !this.isStatusAllowed( value ) ) {
            throw new BadRequestException( `${value} is invalid.` );
        }

        return value;
    }

    private isStatusAllowed( status: any ) {
        // if provided status is not available in allowedStatus array then it will return -1
        const idx = this.allowedStatus.indexOf( status );
        return idx !== -1;
    }
}
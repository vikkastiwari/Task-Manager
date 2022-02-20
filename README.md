# NEST

### Commands
  #### 1. Create Module
    nest g module module_name
  #### 2. Create Controller
    nest g controller module_name --no-spec
  #### 3. Create Services
    nest g service moudle_name --no-spec

### Packages
  #### 1. Create unique ID
    npm install --save-dev @types/uuid
  #### 2. Add validation dependencies
    npm install class-validator class-transformer --save
  #### 3. Add TypeORM - postgres
    npm install --save @nestjs/typeorm typeorm pg
  #### 4. Config Module
    npm i --save @nestjs/config

  #### Import
    import { v4 as uuid } from 'uuid';
    const id: string = uuid();

### References
  #### 1. Class validator
    https://github.com/typestack/class-validator#validation-decorators
  #### 2. TypeORM
    https://typeorm.io/

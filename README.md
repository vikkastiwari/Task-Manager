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

  #### Import
    import { v4 as uuid } from 'uuid';
    const id: string = uuid();

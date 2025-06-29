import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { PREDEFINED_GROUPS, PREDEFINED_ROLES } from '../user.model';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsIn(PREDEFINED_ROLES, { each: true })
  roles: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsIn(PREDEFINED_GROUPS, { each: true })
  groups: string[];
}

export class UpdateUserDto {
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsArray()
  @IsIn(PREDEFINED_ROLES, { each: true })
  roles?: string[];

  @IsArray()
  @IsIn(PREDEFINED_GROUPS, { each: true })
  groups?: string[];
}

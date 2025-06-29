import {
  ArrayContains,
  ArrayMinSize,
  IsArray,
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
  @ArrayContains(PREDEFINED_ROLES, { each: true })
  roles: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayContains(PREDEFINED_GROUPS, { each: true })
  groups: string[];
}

export class UpdateUserDto {
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsString()
  @ArrayContains(PREDEFINED_ROLES, { each: true })
  roles?: string[];

  @IsArray()
  @ArrayContains(PREDEFINED_GROUPS, { each: true })
  groups?: string[];
}

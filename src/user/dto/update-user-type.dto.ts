import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserType } from '../../common/enums/user-type.enum';

export class UpdateUserTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: UserType;
}

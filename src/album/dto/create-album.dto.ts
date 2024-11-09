import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Album name should contain at least one character' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The artistId must be a string' })
  artistId: string | null;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty({ message: 'Please add album year' })
  year: number;
}

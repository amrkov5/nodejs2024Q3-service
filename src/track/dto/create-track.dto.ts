import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTrackDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Track name should contain at least one character' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The artistId must be a string' })
  artistId: string | null;

  @IsOptional()
  @IsString({ message: 'The albumId must be a string' })
  albumId: string | null;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty({ message: 'Please add track duration' })
  duration: number;
}

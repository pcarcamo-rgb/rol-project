import { PartialType } from '@nestjs/swagger';
import { CreateArchetypeDto } from './create-archetype.dto';

export class UpdateArchetypeDto extends PartialType(CreateArchetypeDto) {}

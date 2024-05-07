import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { CharacterAbilities } from './entities/character-abilities.entity';
import { AbilitiesModule } from 'src/abilities/abilities.module';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { TalentModule } from 'src/talent/talent.module';
import { ClassModule } from 'src/class/class.module';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [
    TypeOrmModule.forFeature([Character, CharacterAbilities]),
    AbilitiesModule,
    EquipmentModule,
    TalentModule,
    ClassModule,
  ],
  exports: [CharacterService],
})
export class CharacterModule {}

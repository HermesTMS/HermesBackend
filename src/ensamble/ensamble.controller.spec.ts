import { Test, TestingModule } from '@nestjs/testing';
import { EnsambleController } from './ensamble.controller';
import { EnsambleService } from './ensamble.service';

describe('EnsambleController', () => {
  let controller: EnsambleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnsambleController],
      providers: [EnsambleService],
    }).compile();

    controller = module.get<EnsambleController>(EnsambleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

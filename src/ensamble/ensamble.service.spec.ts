import { Test, TestingModule } from '@nestjs/testing';
import { EnsambleService } from './ensamble.service';

describe('EnsambleService', () => {
  let service: EnsambleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnsambleService],
    }).compile();

    service = module.get<EnsambleService>(EnsambleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

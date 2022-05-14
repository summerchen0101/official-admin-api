import { Test, TestingModule } from '@nestjs/testing';
import { OperationRecService } from './operation_rec.service';

describe('OperationRecService', () => {
  let service: OperationRecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationRecService],
    }).compile();

    service = module.get<OperationRecService>(OperationRecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

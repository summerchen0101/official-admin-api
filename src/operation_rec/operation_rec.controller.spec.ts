import { Test, TestingModule } from '@nestjs/testing';
import { OperationRecController } from './operation_rec.controller';
import { OperationRecService } from './operation_rec.service';

describe('OperationRecController', () => {
  let controller: OperationRecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationRecController],
      providers: [OperationRecService],
    }).compile();

    controller = module.get<OperationRecController>(OperationRecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

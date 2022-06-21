import { Test, TestingModule } from '@nestjs/testing';
import { EventExpoController } from './event-expo.controller';
import { EventExpoService } from './event-expo.service';

describe('EventExpoController', () => {
  let controller: EventExpoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventExpoController],
      providers: [EventExpoService],
    }).compile();

    controller = module.get<EventExpoController>(EventExpoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

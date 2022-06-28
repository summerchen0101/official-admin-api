import { Test, TestingModule } from '@nestjs/testing';
import { EventExpoService } from './event-expo.service';

describe('EventExpoService', () => {
  let service: EventExpoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventExpoService],
    }).compile();

    service = module.get<EventExpoService>(EventExpoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

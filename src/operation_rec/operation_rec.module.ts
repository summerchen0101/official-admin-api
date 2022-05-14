import { Module } from '@nestjs/common';
import { OperationRecService } from './operation_rec.service';
import { OperationRecController } from './operation_rec.controller';

@Module({
  controllers: [OperationRecController],
  providers: [OperationRecService]
})
export class OperationRecModule {}

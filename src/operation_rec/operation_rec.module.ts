import { Global, Module } from '@nestjs/common';
import { OperationRecService } from './operation_rec.service';
import { OperationRecController } from './operation_rec.controller';

@Global()
@Module({
  controllers: [OperationRecController],
  providers: [OperationRecService],
  exports: [OperationRecService],
})
export class OperationRecModule {}

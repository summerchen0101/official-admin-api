import { Injectable } from '@nestjs/common';
import { CreateOperationRecDto } from './dto/create-operation_rec.dto';
import { UpdateOperationRecDto } from './dto/update-operation_rec.dto';

@Injectable()
export class OperationRecService {
  create(createOperationRecDto: CreateOperationRecDto) {
    return 'This action adds a new operationRec';
  }

  findAll() {
    return `This action returns all operationRec`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operationRec`;
  }

  update(id: number, updateOperationRecDto: UpdateOperationRecDto) {
    return `This action updates a #${id} operationRec`;
  }

  remove(id: number) {
    return `This action removes a #${id} operationRec`;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentsService {
  create() {
    return 'This action adds a new content';
  }

  findAll() {
    return `This action returns all contents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}

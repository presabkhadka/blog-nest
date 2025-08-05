import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
const prisma = new PrismaClient();

@Injectable()
export class ContentsService {
  async create(data: any) {
    return await prisma.content.create({
      ...data,
    });
  }

  async findAll() {
    return await prisma.content.findMany({});
  }

  async findOne(id: number) {
    return await prisma.content.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, data: { name?: string; type?: any }) {
    return await prisma.content.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }

  async remove(id: number) {
    return await prisma.content.delete({
      where: {
        id,
      },
    });
  }
}

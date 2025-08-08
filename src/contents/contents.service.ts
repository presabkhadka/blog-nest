import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

@Injectable()
export class ContentsService {
  constructor() { }

  getRepository() {
    return prisma.content;
  }

  async create(body: any) {
    return await prisma.content.create({
      data: {
        ...body,
      },
    });
  }

  async findAll() {
    return await prisma.content.findMany({});
  }

  async findOne(name: string) {
    return await prisma.content.findFirst({
      where: {
        name,
      },
    });
  }

  async update(id: number, body: { name?: string; type?: any }) {
    return await prisma.content.update({
      where: {
        id: id,
      },
      data: {
        ...body,
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

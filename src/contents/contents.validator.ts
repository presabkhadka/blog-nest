import * as z from 'zod';
import { ContentsService } from './contents.service';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common';

const types = ['BLOG', 'ARTICLE', 'RANT'];

export const createContentValidator = z.object({
  name: z.string().min(1, 'Content name must be provided'),
  type: z.enum(types),
  authorId: z.string().min(1, 'author id must be provided').optional(),
});

@Injectable()
export class CreateContentValidaitonPipe implements PipeTransform {
  constructor(private readonly contentsService: ContentsService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const validatedData = createContentValidator.parse(value);

      const existingContent = await this.contentsService.findOne(
        validatedData.name,
      );

      if (existingContent) {
        throw new BadRequestException(
          'There already exists a content with this id',
        );
      }

      return validatedData;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException(
          'Somethign went wrong with the server',
        );
      }
    }
  }
}

export const updateContentValidator = z.object({
  name: z.string().min(1, 'Content name must be provided').optional(),
  type: z.enum(types).optional(),
});

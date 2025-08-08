import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import {
  createContentValidator,
  updateContentValidator,
} from './contents.validator';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) { }

  @Post()
  async addContent(
    @Body()
    body: any,
  ) {
    try {
      const parsedData = createContentValidator.safeParse(body);
      console.log('parsedData', parsedData);

      if (parsedData.success) {
        await this.contentsService.create(parsedData.data);
        return {
          message: 'Content created successfully',
          data: parsedData.data,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async getContent() {
    try {
      const contents = await this.contentsService.findAll();
      return {
        message: 'Content fetched successfully',
        data: contents,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async deleteContent(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    try {
      const result = await this.contentsService.remove(id);
      return {
        message: 'Content deleted successfully',
        data: result,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch(':id')
  async updateContent(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body()
    body: {
      name?: string;
      type?: string;
    },
  ) {
    try {
      const parsedData = updateContentValidator.safeParse(body);
      if (parsedData.success) {
        const result = await this.contentsService.update(id, parsedData.data);
        return {
          message: 'Content updated successfully',
          data: result,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

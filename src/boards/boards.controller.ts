import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('boards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new board' })
  @ApiResponse({ status: 201, description: 'Board successfully created' })
  create(@Body() createBoardDto: CreateBoardDto, @CurrentUser() user: any) {
    return this.boardsService.create(createBoardDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all boards for current user' })
  @ApiResponse({ status: 200, description: 'Return all boards' })
  findAll(@CurrentUser() user: any) {
    return this.boardsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get board by id' })
  @ApiResponse({ status: 200, description: 'Return board details' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.boardsService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update board' })
  @ApiResponse({ status: 200, description: 'Board successfully updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @CurrentUser() user: any,
  ) {
    return this.boardsService.update(id, updateBoardDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete board' })
  @ApiResponse({ status: 200, description: 'Board successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.boardsService.remove(id, user.id);
  }
}
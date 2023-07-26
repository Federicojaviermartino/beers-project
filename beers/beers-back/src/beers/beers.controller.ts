import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BeersService } from './beers.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Post()
  create(@Body() createBeerDto: CreateBeerDto) {
    return this.beersService.create(createBeerDto);
  }

  @Get()
  findAll() {
    return this.beersService.findAll();
  }

  @Get('random')
  findRandom() {
    return this.beersService.findRandom();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBeerDto: UpdateBeerDto) {
  //   return this.beersService.update(+id, updateBeerDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.beersService.remove(+id);
  }
}

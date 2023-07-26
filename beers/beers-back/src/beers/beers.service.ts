import { Injectable, InternalServerErrorException, Res } from '@nestjs/common';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import * as data from '../../data/data.json';
import { Beer } from './entities/beer.entity';
import { Response } from 'express';
@Injectable()
export class BeersService {
  _rndm(arr: any[]) {
    return Math.floor(Math.random() * arr.length);
  }
  _idGenerator() {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
      timestamp +
      'xxxxxxxxxxxxxxxx'
        .replace(/[x]/g, function () {
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase()
    );
  }
  create(createBeerDto: CreateBeerDto) {
    const id = this._idGenerator();
    const newBeer: Beer = {
      _id: id,
      ...createBeerDto,
      image_url: '',
      expireAt: '',
      __v: 0,
    };

    if (typeof createBeerDto.attenuation_level !== 'number')
      throw new InternalServerErrorException();

    data.push(newBeer);
    return data.find((e) => e._id === id);

    // return 'This action adds a new beer';
  }

  findAll() {
    // return `This action returns all beers`;
    return data;
  }

  findOne(id: string) {
    // return `This action returns a #${id} beer`;
    return data.find((elemento) => elemento._id == id);
  }

  findRandom() {
    // const prueba = [1, 2, 3];
    return data[this._rndm(data)];
    // return prueba[2];
  }

  // update(id: number, updateBeerDto: UpdateBeerDto) {
  //   return `This action updates a #${id} beer`;
  // }

  async remove(id: number, @Res() res?: Response) {
    res.send('Beer deleted');
  }
}

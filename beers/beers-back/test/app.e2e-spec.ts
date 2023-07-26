import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as data from '../data/data.json';
import { BeersService } from '../src/beers/beers.service';
import { Beer } from 'src/beers/entities/beer.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let beersService: BeersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    beersService = moduleFixture.get(BeersService);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/beers (GET) should return all beers', async () => {
    const response = await request(app.getHttpServer()).get('/beers');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(data);
  });
  it('/beers (GET) should return all beers', async () => {
    const response = await request(app.getHttpServer()).get('/beers');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(data);
  });
  it('beers/64acfe1efebd5d00024c3365 (GET) should return an object "beer"', async () => {
    const beer = {
      image_url: 'https://images.punkapi.com/v2/2.png',
      _id: '64acfe1efebd5d00024c3365',
      name: 'Trashy Blonde',
      tagline: "You Know You Shouldn't",
      first_brewed: '04/2008',
      description:
        'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
      attenuation_level: 76,
      brewers_tips:
        'Be careful not to collect too much wort from the mash. Once the sugars are all washed out there are some very unpleasant grainy tasting compounds that can be extracted into the wort.',
      contributed_by: 'Sam Mason <samjbmason>',
      expireAt: '2023-07-11T07:00:46.768Z',
      __v: 0,
    };
    const response = await request(app.getHttpServer()).get(
      '/beers/64acfe1efebd5d00024c3365',
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(beer);
  });

  it('beers/random (GET) should return a random "beer"', async () => {
    const beer = {
      image_url: 'https://images.punkapi.com/v2/2.png',
      _id: '64acfe1efebd5d00024c3365',
      name: 'Trashy Blonde',
      tagline: "You Know You Shouldn't",
      first_brewed: '04/2008',
      description:
        'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
      attenuation_level: 76,
      brewers_tips:
        'Be careful not to collect too much wort from the mash. Once the sugars are all washed out there are some very unpleasant grainy tasting compounds that can be extracted into the wort.',
      contributed_by: 'Sam Mason <samjbmason>',
      expireAt: '2023-07-11T07:00:46.768Z',
      __v: 0,
    };
    const spy = jest.spyOn(beersService, '_rndm');
    spy.mockReturnValue(1);
    const response = await request(app.getHttpServer()).get('/beers/random');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(beer);
  });
  it('beers (POST) should return the new create beer', async () => {
    const newBeer = {
      name: 'birra',
      tagline: 'birra',
      first_brewed: 'birra',
      description: 'birra',
      attenuation_level: 80,
      brewers_tips: 'birra',
      contributed_by: 'birra',
    };

    const spy = jest.spyOn(beersService, '_idGenerator');
    spy.mockReturnValue('key');
    const response = await request(app.getHttpServer())
      .post('/beers')
      .send(newBeer);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      _id: 'key',
      ...newBeer,
      image_url: expect.any(String),
      expireAt: expect.any(String),
      __v: 0,
    });
  });
  it("/Delete beers 64acfe1efebd5d00024c3365 (DELETE) should return a message 'Beer deleted'", async () => {
    const spy = jest.spyOn(beersService, 'remove');
    spy.mockResolvedValue(() => 'Beer deleted');
    const response = await request(app.getHttpServer()).delete(
      '/beers/64acfe1efebd5d00024c3365',
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject('Beer deleted');
  });
});

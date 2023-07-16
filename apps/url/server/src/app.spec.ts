import request from 'supertest';
import { createApp } from './app';

describe('App', () => {
  let app;
  let urls: Array<string>;

  beforeEach(async () => {
    urls = [];

    const shortenUrl = async (original: string) => {
      urls = [...urls, original];
      return `http://localhost:3333/${urls.length}`;
    };

    const lookupUrl = async (shortId: number) => {
      return urls[shortId];
    };

    app = await createApp({
      shortenUrl,
      lookupUrl,
    });
  });

  it('should store shortened urls', async () => {
    const original = 'www.example.com/123';
    console.log(app);
    const response = await request(app)
      .post('/api/shorten')
      .send({ original: original });
    expect(response.status).toEqual(201);
    expect(urls).toContain(original);
  });
});

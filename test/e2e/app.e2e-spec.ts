import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { User } from 'src/users/user.model';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Users', () => {
    let testUser: User;

    it('POST /users - should create user (ADMIN)', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Authorization', '1')
        .send({
          name: 'Test User',
          roles: ['PERSONAL'],
          groups: ['GROUP_1'],
        })
        .expect(201)
        .then((response) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          testUser = response.body;
          expect(testUser).toHaveProperty('id');
          expect(testUser.name).toBe('Test User');
        });
    });

    it('POST /users - should reject duplicate name', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Authorization', '1')
        .send({
          name: 'Test User',
          roles: ['PERSONAL'],
          groups: ['GROUP_1'],
        })
        .expect(409);
    });

    it('GET /users - should return all users (ADMIN)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', '1')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('GET /users - should reject VIEWER with insufficient permissions', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', '2')
        .expect(401);
    });

    it('GET /users/managed/:id - should return users managed by admin', async () => {
      const adminId = 1;
      const response = await request(app.getHttpServer())
        .get(`/users/managed/${adminId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /users/managed/:id - should return empty for non-admin', async () => {
      const regularUserId = 3;
      const response = await request(app.getHttpServer())
        .get(`/users/managed/${regularUserId}`)
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });
});

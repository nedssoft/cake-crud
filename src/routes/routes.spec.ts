import request from 'supertest';
import server from '../api';
import { sequelize } from '../database/models';
const { Cake } = sequelize.models;



beforeEach(async () => {
  await sequelize.truncate();
});

describe('TEST SETUP', () => {
  it('should show that test is setup', async () => {
    expect(true).toBe(true);
  });
});

describe('TEST CAKE ENDPOINTS', () => {
  it('should return an empty array', async () => {
    const res = await request(server).get('/api/cakes');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.arrayContaining([]));
  });

  it('should list all cakes', async () => {
    await Cake.create({
      name: 'moUse-ear cchickweed ',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });
    const res = await request(server).get('/api/cakes');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it('should create a new cake', async () => {
    const res = await request(server).post('/api/cakes').send({
      name: 'moUse-ear cchickweed ',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });
    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.status).toBe('success');
  });

  it('should fail if the name already exists', async () => {
    await Cake.create({
      name: 'cchickweed',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });

    const res = await request(server).post('/api/cakes').send({
      name: 'cchickweed',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });
    expect(res.status).toBe(409);
    expect(res.body.status).toBe('error');
  });

  it('should fail if the name is missing', async () => {
    
    const res = await request(server).post('/api/cakes').send({
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });
    expect(res.status).toBe(422);
    expect(res.body.status).toBe('error');
  });

  it('should fail if the comment is missing', async () => {
    const res = await request(server).post('/api/cakes').send({
      name: 'cchickweed',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });
    expect(res.status).toBe(422);
    expect(res.body.status).toBe('error');
  });

  it('should fail if the imageUrl is missing', async () => {
    const res = await request(server).post('/api/cakes').send({
      name: 'cchickweed',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      yumFactor: 5,
    });
    expect(res.status).toBe(422);
    expect(res.body.status).toBe('error');
  });

  it('should fail if the yumfactor is missing', async () => {
    const res = await request(server).post('/api/cakes').send({
      comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      name: 'cchickweed',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
    });
    expect(res.status).toBe(422);
    expect(res.body.status).toBe('error');
  });

  it('should fail if the comment length is less than 5', async () => {
    const res = await request(server).post('/api/cakes').send({
      comment:
      'Lore',
      name: 'cchickweed',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });
    expect(res.status).toBe(422);
    expect(res.body.status).toBe('error');
  });

  it('should fail if the comment length is more than 200', async () => {
    const res = await request(server).post('/api/cakes').send({
      comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam',
      name: 'cchickweed',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });
    expect(res.status).toBe(422);
    expect(res.body.status).toBe('error');
  });

  it('should fail if the yumFactor is less than 1', async () => {
    const res = await request(server).post('/api/cakes').send({
      comment:
      'Lorem ipsum dolor sit amet, consectetuer',
      name: 'cchickweed',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 0,
    });
    expect(res.status).toBe(422);
    expect(res.body.status).toBe('error');
  });

  it('should fail if the yumFactor is greater than 5', async () => {
    const res = await request(server).post('/api/cakes').send({
      comment:
      'Lorem ipsum dolor sit amet, consectetuer',
      name: 'cchickweed',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor:6,
    });
    expect(res.status).toBe(422);
    expect(res.body.status).toBe('error');
  });

  it('should update cake name', async () => {
    await Cake.create({
      name: 'cchickweed',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });

    const res = await request(server).put('/api/cakes/1').send({
      name: 'cchickweed ssdsds',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('cchickweed ssdsds');
  });

  it('should fail to update cake name if the cake does not exist', async () => {
    await Cake.create({
      name: 'cchickweed',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });

    const res = await request(server).put('/api/cakes/66').send({
      name: 'cchickweed ssdsds',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });
    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
  });

  it('should fetch a single cake details', async () => {
    await Cake.create({
      name: 'cchickweed',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });

    const res = await request(server).get('/api/cakes/1')
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it('should respond with status code 404 if the cake does not exists', async () => {
    await Cake.create({
      name: 'cchickweed',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });

    const res = await request(server).get('/api/cakes/44')
    expect(res.status).toBe(404);
    
  });

  it('should delete a cake', async () => {
    await Cake.create({
      name: 'cchickweed',
      comment:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      imageUrl: 'dummyimage.com/131x100.png/ff4444/ffffff',
      yumFactor: 5,
    });

    const res = await request(server).delete('/api/cakes/1')
    expect(res.status).toBe(200);
    
  });

  it('should fail to delete a cake if it does  not exist', async () => {

    const res = await request(server).delete('/api/cakes/1')
    expect(res.status).toBe(404);
    
  });

});

process.env.DATABASE_NAME = 'test-db';
process.env.DATABASE_USER = 'test-user';
process.env.DATABASE_PASSWORD = 'test-password';
process.env.DATABASE_HOST = 'localhost';
process.env.DATABASE_PORT = '5432';

jest.mock('@/lib/db', () => ({
  sequelize: {
    sync: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

jest.mock('@/lib/models', () => ({
  Intention: {
    findOne: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('next/server', () => {
  const jsonMock = jest.fn(
    (body: unknown, init?: ResponseInit) => ({
      status: init?.status ?? 200,
      json: async () => body,
    })
  );

  return {
    NextResponse: {
      json: jsonMock,
    },
  };
});

const { NextResponse } = require('next/server') as {
  NextResponse: { json: jest.Mock };
};
const nextResponseJson = NextResponse.json as jest.Mock;

import { POST } from '@/app/api/users/register/route';

const { sequelize } = require('@/lib/db') as {
  sequelize: { sync: jest.Mock };
};
const { Intention, User } = require('@/lib/models') as {
  Intention: { findOne: jest.Mock };
  User: { findOne: jest.Mock; create: jest.Mock };
};
const { hash: bcryptHashMock } = require('bcrypt') as {
  hash: jest.Mock;
};

describe('POST /api/users/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sequelize.sync.mockResolvedValue(undefined);
    Intention.findOne.mockResolvedValue(null);
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ id: 'new-user-id' });
    bcryptHashMock.mockResolvedValue('hashed-password');
    nextResponseJson.mockClear();
  });

  it('returns 400 when required fields are missing', async () => {
    const request = {
      json: async () => ({ token: 'abc', name: 'Alice' }),
    } as unknown as Request;

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: 'Token, Nome e Senha são obrigatórios.',
    });
  });

  it('returns 404 when intention is not found or invalid', async () => {
    Intention.findOne.mockResolvedValue(null);

    const request = {
      json: async () => ({ token: 'abc', name: 'Alice', password: '123' }),
    } as unknown as Request;

    const response = await POST(request);
    const data = await response.json();

    expect(Intention.findOne).toHaveBeenCalledWith({
      where: expect.objectContaining({
        registrationToken: 'abc',
        status: 'APPROVED',
      }),
    });
    expect(response.status).toBe(404);
    expect(data).toEqual({
      success: false,
      message: 'Token inválido ou expirado.',
    });
  });

  it('returns 409 when user already exists', async () => {
    const intention = {
      email: 'alice@example.com',
    };
    Intention.findOne.mockResolvedValue(intention);
    User.findOne.mockResolvedValue({ id: 'existing-user' });

    const request = {
      json: async () => ({ token: 'abc', name: 'Alice', password: '123' }),
    } as unknown as Request;

    const response = await POST(request);
    const data = await response.json();

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: 'alice@example.com' },
    });
    expect(response.status).toBe(409);
    expect(data).toEqual({
      success: false,
      message: 'Este email já foi cadastrado.',
    });
  });

  it('creates user and clears token when data is valid', async () => {
    const updateMock = jest.fn();
    const intention = {
      email: 'alice@example.com',
      update: updateMock,
    };
    Intention.findOne.mockResolvedValue(intention);
    User.create.mockResolvedValue({ id: 'new-user-id' });

    const request = {
      json: async () => ({
        token: 'abc',
        name: 'Alice',
        password: '123456',
        company: 'Acme Corp',
      }),
    } as unknown as Request;

    const response = await POST(request);
    const data = await response.json();

    expect(bcryptHashMock).toHaveBeenCalledWith('123456', 10);
    expect(User.create).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      passwordHash: 'hashed-password',
      company: 'Acme Corp',
      role: 'MEMBER',
      status: 'ACTIVE',
    });
    expect(updateMock).toHaveBeenCalledWith({
      registrationToken: null,
      tokenExpiresAt: null,
    });
    expect(response.status).toBe(201);
    expect(data).toEqual({
      success: true,
      userId: 'new-user-id',
    });
  });

  it('returns 500 when an unexpected error occurs', async () => {
    Intention.findOne.mockRejectedValue(new Error('db failure'));

    const request = {
      json: async () => ({ token: 'abc', name: 'Alice', password: '123' }),
    } as unknown as Request;

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      success: false,
      message: 'Erro interno do servidor.',
    });
  });
});


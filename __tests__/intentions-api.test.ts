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

jest.mock('@/lib/models', () => ({
  Intention: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
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

import { POST } from '@/app/api/intentions/route';

const { sequelize } = require('@/lib/db') as {
  sequelize: { sync: jest.Mock };
};
const { Intention, User } = require('@/lib/models') as {
  Intention: { findOne: jest.Mock; create: jest.Mock };
  User: { findOne: jest.Mock };
};

describe('POST /api/intentions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sequelize.sync.mockResolvedValue(undefined);
    User.findOne.mockResolvedValue(null);
    Intention.findOne.mockResolvedValue(null);
    Intention.create.mockResolvedValue({ id: 'intention-id' });
    nextResponseJson.mockClear();
  });

  it('returns 400 when required fields are missing', async () => {
    const request = {
      json: async () => ({ email: 'someone@example.com' }),
    } as unknown as Request;

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: 'Nome e Email são obrigatórios.',
    });
    expect(User.findOne).not.toHaveBeenCalled();
  });

  it('creates a new intention when data is valid and unique', async () => {
    const request = {
      json: async () => ({
        name: 'Alice',
        email: 'alice@example.com',
        company: 'Company',
        reason: 'Networking',
      }),
    } as unknown as Request;

    const response = await POST(request);
    const data = await response.json();

    expect(sequelize.sync).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'alice@example.com' } });
    expect(Intention.findOne).toHaveBeenCalled();
    expect(Intention.create).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      company: 'Company',
      reason: 'Networking',
      status: 'PENDING',
    });
    expect(response.status).toBe(201);
    expect(data).toEqual({ success: true, intentionId: 'intention-id' });
  });
});


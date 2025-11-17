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
    findAll: jest.fn(),
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

import { GET } from '@/app/api/admin/intentions/route';

const { sequelize } = require('@/lib/db') as {
  sequelize: { sync: jest.Mock };
};
const { Intention } = require('@/lib/models') as {
  Intention: { findAll: jest.Mock };
};

describe('GET /api/admin/intentions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sequelize.sync.mockResolvedValue(undefined);
    Intention.findAll.mockResolvedValue([]);
    nextResponseJson.mockClear();
  });

  it('returns the list of intentions ordered by created_at desc', async () => {
    const intentions = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ];
    Intention.findAll.mockResolvedValue(intentions);

    const response = await GET({} as Request);
    const data = await response.json();

    expect(sequelize.sync).toHaveBeenCalled();
    expect(Intention.findAll).toHaveBeenCalledWith({
      order: [['created_at', 'DESC']],
    });
    expect(response.status).toBe(200);
    expect(data).toEqual(intentions);
  });

  it('returns 500 when an error occurs', async () => {
    const error = new Error('DB failure');
    sequelize.sync.mockRejectedValue(error);

    const response = await GET({} as Request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      success: false,
      message: 'Erro interno do servidor.',
    });
  });
});


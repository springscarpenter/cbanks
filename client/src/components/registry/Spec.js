const Spec = {
  openapi: '3.0.1',
  info: {
    title: 'Cryptoasset Registry',
    description:
      'This registry serves as a public namespace for cryptoassets. Each asset is represented by a unique Central Banks Cryptoasset ID: `CBCID`. See **Asset Schema** below for details.',
    contact: {
      email: 'contact@cbanks.org',
    },
    license: {
      name: 'MIT License',
      url: 'https://github.com/centralbanks/cbanks/blob/master/LICENSE',
    },
    version: '1.0.0',
  },
  externalDocs: {
    description: 'Register your cryptoasset here',
    url: 'https://www.google.com',
  },
  servers: [
    {
      url: 'https://www.cbanks.org/api/v1',
    },
  ],
  tags: [{ name: 'status' }, { name: 'asset' }],
  paths: {
    '/status': {
      get: {
        tags: ['status'],
        summary: 'Server status',
        operationId: 'getStatus',
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'object',
                      $ref: '#/components/schemas/Status',
                    },
                    data: {
                      example: null,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/assets': {
      get: {
        tags: ['asset'],
        summary: 'Detailed summary for each asset available',
        operationId: 'getAssets',
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'object',
                      $ref: '#/components/schemas/Status',
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Asset',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/asset/{cbcid}': {
      get: {
        tags: ['asset'],
        summary: 'Find asset by CBCID',
        operationId: 'findAssetByCBCID',
        parameters: [
          {
            name: 'cbcid',
            in: 'path',
            description: 'Unique Central Banks Cryptoasset ID (CBCID)',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'object',
                      $ref: '#/components/schemas/Status',
                    },
                    data: {
                      $ref: '#/components/schemas/Asset',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Invalid CBCID',
            content: {},
          },
          404: {
            description: 'Not Found',
            content: {},
          },
        },
      },
    },
    '/asset': {
      get: {
        tags: ['asset'],
        summary: 'Find asset by name',
        operationId: 'findAssetByName',
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Unique cryptoasset name',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'object',
                      $ref: '#/components/schemas/Status',
                    },
                    data: {
                      $ref: '#/components/schemas/Asset',
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Not Found',
            content: {},
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Status: {
        type: 'object',
        properties: {
          timestamp: {
            type: 'string',
            format: 'date-time',
            required: true,
          },
          success: {
            type: 'boolean',
            required: true,
          },
          status_code: {
            type: 'number',
            required: true,
            example: 200,
          },
          error_message: {
            type: 'string',
            example: null,
          },
        },
        required: true,
      },
      Asset: {
        type: 'object',
        properties: {
          CBCID: {
            type: 'string',
            required: true,
            unique: true,
            minlength: 46,
            example: 'CBCID985b274fCBCC045EEFcE54e47dCd7455545B7430ETH',
          },
          symbol: {
            type: 'string',
            required: true,
            example: 'ETH',
          },
          name: {
            type: 'string',
            required: true,
            unique: true,
            example: 'Ethereum',
          },
          decimals: {
            type: 'number',
            required: true,
            example: 18,
          },
          fractional_unit: {
            type: 'string',
            example: 'Wei',
          },
          blockchain: {
            type: 'string',
            required: true,
            example: 'Ethereum',
          },
          asset_type: {
            type: 'string',
            required: true,
            enum: ['native_currency', 'token'],
          },
          explorer: {
            type: 'string',
            required: true,
            example: 'https://etherscan.io',
          },
          website: {
            type: 'string',
            required: true,
            unique: true,
            example: 'https://ethereum.org',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
    },
  },
};

export default Spec;

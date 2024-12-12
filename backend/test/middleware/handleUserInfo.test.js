const mockQuery = jest.fn();

jest.mock('../../src/db/connection', () => ({
  connection: {
    query: mockQuery,
  },
}));

const { updateUserInfo, createUserInfo } = require('../../src/middleware/handleUserInfo'); // mockQuery needs to be defined before updateUserInfo is imported


describe('updateUserInfo', () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockQuery.mockReset();
  });

  it('should call connection.query with the correct SQL query and parameters', () => {
    const user = {
      username: 'testUser',
      email: 'test@example.com',
      status: true,
      sub: '12345',
    };

    updateUserInfo(user);
    // Note: expectedQuery REALLY wants the format to be the exact same. Just copy & paste without altering at all
    const expectedQuery = `UPDATE users
                       SET cognito_username = ?, cognito_email = ?, cognito_email_verified = ?
                       WHERE user_id = ?`;

    const expectedParams = [user.username, user.email, user.status, user.sub];

    expect(mockQuery).toHaveBeenCalledWith(expectedQuery, expectedParams, expect.any(Function));
    expect(mockQuery).toHaveBeenCalledTimes(1);
  });

  it('should log an error when the query fails', () => {
    const user = {
      username: 'testUser',
      email: 'test@example.com',
      status: true,
      sub: '12345',
    };
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Database error');

    mockQuery.mockImplementation((query, params, callback) => {
      callback(mockError, null);
    });

    updateUserInfo(user);

    expect(mockQuery).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Error updating user:', mockError);

    consoleSpy.mockRestore();
  });

  it('should log a success message when the query succeeds', () => {
    const user = {
      username: 'testUser',
      email: 'test@example.com',
      status: true,
      sub: '12345',
    };
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const mockResults = { affectedRows: 1 };

    mockQuery.mockImplementation((query, params, callback) => {
      callback(null, mockResults);
    });

    updateUserInfo(user);

    expect(mockQuery).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('User updated successfully:', mockResults);

    consoleSpy.mockRestore();
  });
});

describe('createUserInfo', () => {
    afterEach(() => {
        jest.clearAllMocks();
        mockQuery.mockReset();
    });

    it('should call connection.query with the correct SQL query and parameters', () => {
        const user = {
          username: 'testUser',
          email: 'test@example.com',
          status: true,
          sub: '12345',
        };

        createUserInfo(user);

        const expectedQuery = `INSERT INTO users (user_id, cognito_username, cognito_email, cognito_email_verified) 
                         VALUES (?, ?, ?, ?)`;
    
        const expectedParams = [user.sub, user.username, user.email, user.status];
    
        expect(mockQuery).toHaveBeenCalledWith(expectedQuery, expectedParams, expect.any(Function));
        expect(mockQuery).toHaveBeenCalledTimes(1);
    })

    it('should log an error when the query fails', () => {
        const user = {
          username: 'testUser',
          email: 'test@example.com',
          status: true,
          sub: '12345',
        };
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const mockError = new Error('Database error');
    
        mockQuery.mockImplementation((query, params, callback) => {
          callback(mockError, null);
        });
    
        createUserInfo(user);
    
        expect(mockQuery).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("Error creating user: ", mockError);
    
        consoleSpy.mockRestore();
      });

      it('should log a success message when the query succeeds', () => {
        const user = {
          username: 'testUser',
          email: 'test@example.com',
          status: true,
          sub: '12345',
        };
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const mockResults = { affectedRows: 1 };
    
        mockQuery.mockImplementation((query, params, callback) => {
          callback(null, mockResults);
        });
    
        createUserInfo(user);
    
        expect(mockQuery).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("New user created: ", mockResults);
    
        consoleSpy.mockRestore();
      });
})
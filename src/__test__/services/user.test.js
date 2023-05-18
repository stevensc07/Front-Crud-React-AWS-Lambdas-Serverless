import axios from 'axios';
import service from '../../services/user';


jest.mock('axios');

describe('loginService', () => {
  it('should return user data if successful', async () => {
    const data = { email: 'test@example.com', password: '123456' };
    const response = { data: { id: 1, name: 'John Doe', email: 'test@example.com' } };
    axios.post.mockResolvedValue(response);

    const result = await service(data);
    expect(result).toEqual(response.data);
  });

  it('should return error message if unsuccessful', async () => {
    const data = { email: 'test@example.com', password: '123456' };
    const error = { message: 'Invalid credentials' };
    axios.post.mockRejectedValue(error);

    const result = await service(data);
    expect(result).toEqual(error);
  });
});
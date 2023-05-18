import axios from 'axios';
import services from '../../services/inventory';

jest.mock('axios');

describe('Services', () => {
  const token = 'TOKEN';
  const data = { key: 'value' };
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  describe('getInventory', () => {
    it('should call axios.post with the correct arguments and return the response data', async () => {
      const responseData = { data: 'responseData' };
      axios.post.mockResolvedValueOnce(responseData);
      const result = await services.getInventory(data);
      expect(result).toBe(responseData.data);
    });

    it('should return an error if the request fails', async () => {
      const error = new Error('Request failed');
      axios.post.mockRejectedValueOnce(error);
      const result = await services.getInventory(data);
      expect(result).toBe(error);
    });
  });

  describe('createOrUpdateInventoryService', () => {
    it('should call axios.post with the correct arguments and return the response data', async () => {
      const responseData = { data: 'responseData' };
      axios.post.mockResolvedValueOnce(responseData);
      const result = await services.createOrUpdateInventoryService(data);
      expect(result).toBe(responseData.data);
    });

    it('should return an error if the request fails', async () => {
      const error = new Error('Request failed');
      axios.post.mockRejectedValueOnce(error);
      const result = await services.createOrUpdateInventoryService(data);
      expect(result).toBe(error);
    });
  });

  describe('deleteInventoryService', () => {
    it('should call axios.post with the correct arguments and return the response data', async () => {
      const responseData = { data: 'responseData' };
      axios.post.mockResolvedValueOnce(responseData);

      const result = await services.deleteInventoryService(data);

      expect(result).toBe(responseData.data);
    });

    it('should return an error if the request fails', async () => {
      const error = new Error('Request failed');
      axios.post.mockRejectedValueOnce(error);
      const result = await services.deleteInventoryService(data);
      expect(result).toBe(error);
    });
  })

  describe('pdfService', () => {
    it('should call axios.post with the correct arguments and return the response data', async () => {
      const responseData = { data: 'responseData' };
      axios.post.mockResolvedValueOnce(responseData);

      const result = await services.pdfService(data);

      expect(result).toBe(responseData.data);
    });

    it('should return an error if the request fails', async () => {
      const error = new Error('Request failed');
      axios.post.mockRejectedValueOnce(error);
      const result = await services.pdfService(data);
      expect(result).toBe(error);
    });
  })
  
});




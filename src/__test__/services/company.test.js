import axios from 'axios';
import services from '../../services/company';


jest.mock('axios');

const mockedData = {
  data: [
    {
      id: 1,
      name: 'Company 1',
      address: 'Address 1',
      phone: '123-456-7890'
    },
    {
      id: 2,
      name: 'Company 2',
      address: 'Address 2',
      phone: '123-456-7891'
    }
  ]
};

describe('services', () => {
  describe('getCompaniesService', () => {
    it('debería devolver los datos correctamente', async () => {
      axios.post.mockResolvedValueOnce(mockedData);

      const data = await services.getCompaniesService();

      expect(data).toEqual(mockedData.data);
    });

    it('debería manejar los errores correctamente', async () => {
      const errorMsg = 'Error al obtener los datos';
      axios.post.mockRejectedValueOnce(errorMsg);

      const error = await services.getCompaniesService();

      expect(error).toEqual(errorMsg);
    });
  });

  describe('createOrUpdateCompanyService', () => {
    it('debería devolver los datos correctamente', async () => {
      const data = {
        name: 'Company 3',
        address: 'Address 3',
        phone: '123-456-7892'
      };
      axios.post.mockResolvedValueOnce({ data });

      const response = await services.createOrUpdateCompanyService(data);

      expect(response).toEqual(data);
    });

    it('debería manejar los errores correctamente', async () => {
      const data = {
        name: 'Company 3',
        address: 'Address 3',
        phone: '123-456-7892'
      };
      const errorMsg = 'Error al crear o actualizar la empresa';
      axios.post.mockRejectedValueOnce(errorMsg);

      const error = await services.createOrUpdateCompanyService(data);

      expect(error).toEqual(errorMsg);
    });
  });

  describe('deleteCompanyService', () => {
    it('debería devolver los datos correctamente mmmm', async () => {
      const data = { id: 1 };
      axios.post.mockResolvedValueOnce({ data });

      const response = await services.deleteCompanyService(data);

      expect(response).toEqual({"data": {"id": 1}});
    });

    it('debería manejar los errores correctamente', async () => {
      const data = { id: 1 };
      const errorMsg = 'Error al eliminar la empresa';
      axios.post.mockRejectedValueOnce(errorMsg);

      const error = await services.deleteCompanyService(data);

      expect(error).toEqual(errorMsg);
    });
  });
});

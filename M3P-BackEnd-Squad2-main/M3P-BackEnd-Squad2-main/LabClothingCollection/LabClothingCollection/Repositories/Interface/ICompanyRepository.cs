using LabClothingCollection.Enums;
using LabClothingCollection.Models;

namespace LabClothingCollection.Repositories.Interface{
  public interface ICompanyRepository
  {
        Task<IEnumerable<Company>> GetCompany();
        Task<Company> GetCompanyById(int id);
        void CreateCompany(Company company);
        void UpdateCompany(Company company);
        void DeleteCompany(Company company);
        Task<bool> SaveAllAsync();
        Task<bool> CnpjExists(string? cNPJ);
     }
}
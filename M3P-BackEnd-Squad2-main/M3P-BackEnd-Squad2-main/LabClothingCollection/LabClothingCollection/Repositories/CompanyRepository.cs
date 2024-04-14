using LabClothingCollection.Context;
using LabClothingCollection.Enums;
using LabClothingCollection.Models;
using LabClothingCollection.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace LabClothingCollection.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly LCCContext _context;
        public CompanyRepository(LCCContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Company>> GetCompany()
        {
            return await _context.Companies.ToListAsync();
        }

        public async Task<Company> GetCompanyById(int id)
        {
            return await _context.Companies.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public void CreateCompany(Company company)
        {
            _context.Companies.Add(company);
        }

        public void UpdateCompany(Company company)
        {
            _context.Entry(company).State = EntityState.Modified;
        }

        public void DeleteCompany(Company company)
        {
            _context.Companies.Remove(company);
        }        

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }        

        public async Task<bool> CnpjExists(string? cNPJ)
        {
            return await _context.Companies.AnyAsync(x => x.CNPJ == cNPJ);
        }
    }
}

using LabClothingCollection.Context;
using LabClothingCollection.Models;
using LabClothingCollection.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace LabClothingCollection.Repositories
{
    public class GetHelpRepository : IGetHelpRepository
    {
        private readonly LCCContext _context;

        public GetHelpRepository(LCCContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GetHelp>> GetHelp()
        {
            return await _context.GetHelp.ToListAsync();
        }

        public async Task<GetHelp> GetHelpById(int id)
        {
            return await _context.GetHelp.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public void CreateGetHelp(GetHelp getHelp)
        {
            _context.GetHelp.Add(getHelp);
        }

        public void UpdateGetHelp(GetHelp getHelp)
        {
            _context.Entry(getHelp).State = EntityState.Modified;
        }

        public void DeleteGetHelp(GetHelp getHelp)
        {
            _context.GetHelp.Remove(getHelp);
        }        

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }       
    }
}

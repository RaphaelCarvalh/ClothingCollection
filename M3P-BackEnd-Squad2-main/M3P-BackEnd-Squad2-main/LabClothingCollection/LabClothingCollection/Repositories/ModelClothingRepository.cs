using LabClothingCollection.Context;
using LabClothingCollection.Models;
using LabClothingCollection.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace LabClothingCollection.Repositories
{
    public class ModelClothingRepository : IModelClothingRepository
    {
        private readonly LCCContext _lccContext;

        public ModelClothingRepository(LCCContext lccContext)
        {
            _lccContext = lccContext;
        }

        public async Task<IEnumerable<ModelClothing>> GetModelsClothing()
        {
            return await _lccContext.Models.Include(x => x.ClothingCollection).ToListAsync();
        }

        public async Task<ModelClothing> GetModelsClothingById(int id)
        {
            return await _lccContext.Models.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public void CreateModelsClothing(ModelClothing modelClothing)
        {
            _lccContext.Models.Add(modelClothing);
        }

        public void UpdateModelClothing(ModelClothing modelClothing)
        {
            _lccContext.Entry(modelClothing).State = EntityState.Modified;
        }

        public void DeleteModelsClothing(ModelClothing modelClothing)
        {
            _lccContext.Models.Remove(modelClothing);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _lccContext.SaveChangesAsync() > 0;
        }
    }
}

using LabClothingCollection.Models;

namespace LabClothingCollection.Repositories.Interface
{
    public interface IModelClothingRepository
    {
        Task<IEnumerable<ModelClothing>> GetModelsClothing();
        Task<ModelClothing> GetModelsClothingById(int id);
        void CreateModelsClothing(ModelClothing modelClothing);
        void UpdateModelClothing(ModelClothing modelClothing);
        void DeleteModelsClothing(ModelClothing modelClothing);
        Task<bool> SaveAllAsync();
    }
}

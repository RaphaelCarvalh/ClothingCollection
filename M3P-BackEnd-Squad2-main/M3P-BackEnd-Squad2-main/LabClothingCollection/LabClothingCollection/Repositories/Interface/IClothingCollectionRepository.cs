using LabClothingCollection.Enums;
using LabClothingCollection.Models;

namespace LabClothingCollection.Repositories.Interface
{
    public interface IClothingCollectionRepository 
    {
        Task<IEnumerable<ClothingCollection>> GetClothingCollections();
        Task<ClothingCollection> GetClothingCollectionById(int IdCollection);
        void CreateClothingCollection(ClothingCollection clothingCollection);
        void UpdateClothingCollection(ClothingCollection clothingCollection);
        void DeleteClothingCollection(ClothingCollection clothingCollection);
        Task<bool> SaveAllAsync();
    }
}

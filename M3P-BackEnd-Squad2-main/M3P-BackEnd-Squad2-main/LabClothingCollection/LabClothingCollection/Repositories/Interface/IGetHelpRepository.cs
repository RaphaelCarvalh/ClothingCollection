using LabClothingCollection.Models;

namespace LabClothingCollection.Repositories.Interface
{
    public interface IGetHelpRepository
    {
        Task<IEnumerable<GetHelp>> GetHelp();
        Task<GetHelp> GetHelpById(int id);
        void CreateGetHelp(GetHelp getHelp);
        void UpdateGetHelp(GetHelp getHelp);
        void DeleteGetHelp(GetHelp getHelp);
        Task<bool> SaveAllAsync();
    }
}

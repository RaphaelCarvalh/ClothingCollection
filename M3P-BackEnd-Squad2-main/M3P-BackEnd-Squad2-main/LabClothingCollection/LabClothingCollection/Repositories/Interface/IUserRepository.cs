using LabClothingCollection.Models;

namespace LabClothingCollection.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers(); 
        Task<User> GetUserById(string id); 
        void CreateUser(User user); 
        void UpdateUser(User user);
        Task UpdateUserPassword(string id, string password);
        void DeleteUser(User user); 
        Task<bool> SaveAllAsync();
        User LoginUser(string email);
    }
}

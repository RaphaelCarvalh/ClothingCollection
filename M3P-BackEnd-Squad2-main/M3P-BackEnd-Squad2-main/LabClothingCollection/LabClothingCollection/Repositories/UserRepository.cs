using Microsoft.EntityFrameworkCore;
using LabClothingCollection.Models;
using LabClothingCollection.Repositories.Interface;
using LabClothingCollection.Context;
using Microsoft.AspNetCore.Identity;

namespace LabClothingCollection.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly LCCContext _context;
        public UserRepository(LCCContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserById(string id)
        {
            return await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public void CreateUser(User user)
        {
            _context.Users.Add(user);
        }

        public void UpdateUser(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task UpdateUserPassword(string id, string password)
        {
            var user = await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
            var pw = new PasswordHasher<User>();
            var hashed = pw.HashPassword(user, password);

            user.Password = password;
            user.PasswordHash = hashed;
            await _context.SaveChangesAsync();
        }

        public void DeleteUser(User user)
        {
            _context.Users.Remove(user);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public User LoginUser(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email) ?? throw new Exception("Usuário não encontrado");
        }
    }
}

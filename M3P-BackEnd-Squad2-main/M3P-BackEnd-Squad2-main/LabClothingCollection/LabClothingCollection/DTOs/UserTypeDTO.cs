using LabClothingCollection.Enums;
using System.ComponentModel.DataAnnotations;

namespace LabClothingCollection.DTOs
{
    public class UserTypeDTO
    {
        [Required(ErrorMessage = "Informe o tipo do Usuário")]
        public UserType userType{ get; set; }

        [Required(ErrorMessage = "Informe o status")]
        public UserStatus userStatus { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace LabClothingCollection.DTOs
{
    public class UserPasswordDTO
    {
        public string? Id { get; set; }

        [Required(ErrorMessage = "A senha não pode ser nula")]
        [MinLength(8, ErrorMessage = "A senha deve ter 8 ou mais caracteres")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}

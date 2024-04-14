using LabClothingCollection.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LabClothingCollection.DTOs
{
    public class UserDTO
    {        
        public string? Id { get; set; }

        [MaxLength(100)]
        [Required(ErrorMessage = "Informe seu o nome completo")]
        [MinLength(5, ErrorMessage = "O nome deve ter 5 ou mais caracteres")]
        public string? Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Email invalido")]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required(ErrorMessage = "A senha não pode ser nula")]
        [MinLength(8, ErrorMessage = "A senha deve ter 8 ou mais caracteres")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Informe o status")]
        public UserStatus UserStatus { get; set; }

        [Required(ErrorMessage = "Informe o tip do Usuário")]
        public UserType UserType { get; set; }

        [ForeignKey("Company")]
        public int IdCompany { get; set; }
    }    
}

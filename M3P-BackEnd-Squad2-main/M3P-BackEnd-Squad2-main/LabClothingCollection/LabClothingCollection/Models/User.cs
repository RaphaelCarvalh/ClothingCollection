using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using LabClothingCollection.Enums;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;

namespace LabClothingCollection.Models
{
    public class User : IdentityUser
    {
        [MaxLength(100)]
        [DisplayName("Nome")]
        [Required(ErrorMessage = "Informe seu o nome completo")]
        [MinLength(5, ErrorMessage = "O nome deve ter 5 ou mais caracteres")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "A senha não pode ser nula")]
        [MinLength(8, ErrorMessage = "A senha deve ter 8 ou mais caracteres")]
        [DataType(DataType.Password)]
        [DisplayName("Senha")]
        public string? Password { get; set; }

        [DisplayName("Status")]
        [Required(ErrorMessage = "Informe o status")]
        public UserStatus UserStatus { get; set; }

        [DisplayName("Status")]
        [Required(ErrorMessage = "Informe o tip do Usuário")]
        public UserType UserType { get; set; }

        [ForeignKey("Company")]
        [DisplayName("Empresa")]
        public int IdCompany { get; set; }
        public virtual Company? Company { get; set; }
    }
 }

using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace LabClothingCollection.Models
{
    public class GetHelp
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo Título é obrigatório.")]
        [MaxLength(40)]
        [DisplayName("Titulo")]
        [MinLength(10, ErrorMessage = "O nome deve ter 20 ou mais caracteres")]
        public string? Title { get; set; }

        [Required(ErrorMessage = "O campo Título é obrigatório.")]
        [MaxLength(300)]
        [DisplayName("Texto")]
        [MinLength(30, ErrorMessage = "O nome deve ter 30 ou mais caracteres")]
        public string? Text { get; set; }
    }
}

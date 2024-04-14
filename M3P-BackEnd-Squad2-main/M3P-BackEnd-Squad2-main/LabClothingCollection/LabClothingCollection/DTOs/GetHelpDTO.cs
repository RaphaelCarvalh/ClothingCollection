using System.ComponentModel.DataAnnotations;

namespace LabClothingCollection.DTOs
{
    public class GetHelpDTO
    {
        public int? Id { get; set; }

        [Required(ErrorMessage = "O campo Título é obrigatório.")]
        [MaxLength(40)]
        [MinLength(10, ErrorMessage = "O nome deve ter 20 ou mais caracteres")]
        public string? Title { get; set; }

        [Required(ErrorMessage = "O campo Título é obrigatório.")]
        [MaxLength(300)]
        [MinLength(30, ErrorMessage = "O nome deve ter 30 ou mais caracteres")]
        public string? Text { get; set; }
    }
}

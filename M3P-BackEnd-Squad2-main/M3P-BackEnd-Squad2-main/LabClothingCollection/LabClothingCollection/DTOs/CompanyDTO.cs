using LabClothingCollection.Enums;
using System.ComponentModel.DataAnnotations;

namespace LabClothingCollection.DTOs
{
    public class CompanyDTO
    {
        public int? Id { get; set; }

        [Required(ErrorMessage = "Obrigatório nome da empresa")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Obrigatório CNPJ da empresa")]
        [StringLength(14, MinimumLength = 14, ErrorMessage = "CNPJ deve conter 14 caracteres")]
        public string? CNPJ { get; set; }

        public string? Logo { get; set; }

        public DefaultTheme? DefaultTheme { get; set; }

        public string? LightModePrimary { get; set; }

        public string? LightModeSecondary { get; set; }

        public string? DarkModePrimary { get; set; }

        public string? DarkModeSecondary { get; set; }
    }
}

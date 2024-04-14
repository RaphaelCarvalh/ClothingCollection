using LabClothingCollection.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace LabClothingCollection.Models
{
    public class Company
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage ="Obrigatório nome da empresa")]
        [DisplayName("Nome")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Obrigatório CNPJ da empresa")]
        [StringLength(14, MinimumLength = 14, ErrorMessage = "CNPJ deve conter 14 caracteres")]
        [DisplayName("CNPJ")]
        public string? CNPJ { get; set; }

        [DisplayName("Logo")]
        public string? Logo { get; set; }

        [EnumDataType(typeof(DefaultTheme))]
        [DisplayName("Tema Padrão")]
        public DefaultTheme? DefaultTheme { get; set; }

        [DisplayName("LightModePrimary")]
        public string? LightModePrimary { get; set; }

        [DisplayName("LightModeSecondary")]
        public string? LightModeSecondary { get; set; }

        [DisplayName("DarkModePrimary")]
        public string? DarkModePrimary { get; set; }

        [DisplayName("DarkModeSecondary")]
        public string? DarkModeSecondary { get; set; }
    }
}

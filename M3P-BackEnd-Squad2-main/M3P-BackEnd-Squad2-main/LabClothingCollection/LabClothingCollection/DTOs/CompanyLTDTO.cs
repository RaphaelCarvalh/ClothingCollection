using LabClothingCollection.Enums;

namespace LabClothingCollection.DTOs
{
    public class CompanyLTDTO
    {
        public int? Id { get; set; }

        public string? Logo { get; set; }

        public DefaultTheme? DefaultTheme { get; set; }

        public string? LightModePrimary { get; set; }

        public string? LightModeSecondary { get; set; }

        public string? DarkModePrimary { get; set; }

        public string? DarkModeSecondary { get; set; }
    }
}

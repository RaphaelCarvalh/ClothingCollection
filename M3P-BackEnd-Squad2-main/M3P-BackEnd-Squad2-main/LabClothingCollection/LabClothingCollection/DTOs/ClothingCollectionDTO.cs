using LabClothingCollection.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LabClothingCollection.DTOs
{
    public class ClothingCollectionDTO
    {
        public int? Id { get; set; }

        [Required(ErrorMessage = "Necessário inserir um Nome para Coleção")]
        [MaxLength(100)]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Necessário inserir a Marca da Coleção")]
        [MaxLength(100)]
        public string? Brand { get; set; }

        [Required(ErrorMessage = "Necessário inserir o Orçamento da Coleção")]
        public double Budget { get; set; }

        [Required(ErrorMessage = "Necessário inserir as Cores da Coleção")]
        public string? CollectionColors { get; set; }

        [Required(ErrorMessage = "Necessário inserir o Ano de Lançamento da Coleção")]
        public int ReleaseYearCollection { get; set; }

        [Required(ErrorMessage = "Necessário inserir a Estação da Coleção")]
        [EnumDataType(typeof(LaunchStation))]
        public LaunchStation LaunchStation { get; set; }

        [Required(ErrorMessage = "Necessário inserir o Status da Coleção")]
        [EnumDataType(typeof(Status))]
        public Status Status { get; set; }

        [ForeignKey("User")]
        [Required(ErrorMessage = "Necessário inserir o Id do Usuário")]
        public string IdUser { get; set; }
    }
}

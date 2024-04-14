using LabClothingCollection.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LabClothingCollection.Models
{
    public class ClothingCollection
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Necessário inserir um Nome para Coleção")]
        [MaxLength(100)]
        [DisplayName("Nome")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Necessário inserir a Marca da Coleção")]
        [MaxLength(100)]
        [DisplayName("Marca")]
        public string? Brand { get; set; }

        [Required(ErrorMessage = "Necessário inserir o Orçamento da Coleção")]
        [DisplayName("Orçamento")]
        public double Budget { get; set; }

        [Required(ErrorMessage = "Necessário inserir as Cores da Coleção")]
        [DisplayName("Cores")]
        public string? CollectionColors { get; set; }

        [Required(ErrorMessage = "Necessário inserir o Ano de Lançamento da Coleção")]
        [DisplayName("Ano de Lançamento")]
        public int ReleaseYearCollection { get; set; }

        [Required(ErrorMessage = "Necessário inserir a Estação da Coleção")]
        [DisplayName("Estação")]
        [EnumDataType(typeof(LaunchStation))]
        public LaunchStation LaunchStation { get; set; }

        [Required(ErrorMessage = "Necessário inserir o Status da Coleção")]
        [EnumDataType(typeof(Status))]
        [DisplayName("Status")]
        public Status Status { get; set; }

        [ForeignKey("User")]
        [Required(ErrorMessage = "Necessário inserir o Id do Usuário")]
        [DisplayName("Usuário")]
        public string IdUser { get; set; }
        public virtual User? User { get; set; }


    }
}

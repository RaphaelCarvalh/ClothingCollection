using LabClothingCollection.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LabClothingCollection.Models
{
    public class ModelClothing
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [MaxLength(100)]
        [DisplayName("Nome")]
        [MinLength(3, ErrorMessage = "O nome deve ter 3 ou mais caracteres")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Informe o Tipo de Modelo")]
        [EnumDataType(typeof(TypeModel), ErrorMessage = "Valor inválido para TypeModel.")]
        [DisplayName("Tipo de Modelo")]
        public TypeModel TypeModel { get; set; }

        [Required(ErrorMessage = "Informe o se é Bordado ou não")]
        [DisplayName("Bordado")]
        public bool Embroidered { get; set; }

        [Required(ErrorMessage = "Informe o se é Estampado ou não")]
        [DisplayName("Estampa")]
        public bool Print { get; set; }

        [Required(ErrorMessage = "Informe o Custo")]
        [DisplayName("Custo")]
        public double Cost { get; set; }

        [ForeignKey("ClothingCollection")]
        [Required(ErrorMessage = "O campo IdCCollection é obrigatório.")]
        [DisplayName("Coleção")]
        public int IdCCollection { get; set; }

        [ForeignKey("User")]
        [Required(ErrorMessage = "O campo IdUserM é obrigatório.")]
        [DisplayName("Usuario")]
        public string IdUser { get; set; }

        public virtual ClothingCollection? ClothingCollection { get; set; }
        public virtual User? User { get; set; }
    }

}

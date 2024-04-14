using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using LabClothingCollection.Enums;

namespace LabClothingCollection.DTOs
{
    public class ModelClothingDTO
    {
        public int? Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [MaxLength(100)]
        [MinLength(3, ErrorMessage = "O nome deve ter 3 ou mais caracteres")]
        public string? Name { get; set; }

        [EnumDataType(typeof(TypeModel), ErrorMessage = "Valor inválido para TypeModel.")]
        public TypeModel TypeModel { get; set; }

        [Required(ErrorMessage = "Informe o se é Bordado ou não")]
        public bool Embroidered { get; set; }

        [Required(ErrorMessage = "Informe o se é Estampado ou não")]
        public bool Print { get; set; }

        [Required(ErrorMessage = "Informe o Custo")]
        public double Cost { get; set; }

        [ForeignKey("ClothingCollection")]
        [Required(ErrorMessage = "O campo IdCCollection é obrigatório.")]
        public int IdCCollection { get; set; }

        [ForeignKey("User")]
        [Required(ErrorMessage = "O campo IdUserM é obrigatório.")]
        public string IdUser { get; set; }

    }    
}

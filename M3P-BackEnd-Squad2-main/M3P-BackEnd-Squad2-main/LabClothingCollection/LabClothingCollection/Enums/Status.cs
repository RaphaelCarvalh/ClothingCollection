using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace LabClothingCollection.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Status
    {
        NãoIniciada = 1,
        Andamento = 2,
        Finalizada = 3,
        Arquivada = 4
    }
}

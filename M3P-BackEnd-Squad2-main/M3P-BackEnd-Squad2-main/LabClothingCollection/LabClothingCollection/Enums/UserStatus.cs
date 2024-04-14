using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace LabClothingCollection.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum UserStatus
    {
        Ativo = 1,
        Inativo = 2
    }
}

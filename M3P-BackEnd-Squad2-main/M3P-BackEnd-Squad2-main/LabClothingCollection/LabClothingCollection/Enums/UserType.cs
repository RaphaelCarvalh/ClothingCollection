using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace LabClothingCollection.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum UserType
    {
        Gerente = 1,
        VerSomente = 2,
        Time = 3
    }
}

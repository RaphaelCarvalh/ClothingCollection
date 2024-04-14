using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace LabClothingCollection.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum LaunchStation
    {
        Primavera = 1,
        Verão = 2,
        Outono = 3,
        Inverno = 4
    }
}

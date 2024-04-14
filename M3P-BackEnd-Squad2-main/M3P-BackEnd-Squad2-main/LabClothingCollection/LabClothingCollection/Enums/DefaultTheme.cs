using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace LabClothingCollection.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum DefaultTheme
    {
        Light = 1,
        Dark = 2
    }
}

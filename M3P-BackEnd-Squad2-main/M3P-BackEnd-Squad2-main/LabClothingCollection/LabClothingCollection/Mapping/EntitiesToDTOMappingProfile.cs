using AutoMapper;
using LabClothingCollection.DTOs;
using LabClothingCollection.Models;

namespace LabFashion.Mapping
{
    public class EntitiesToDTOMappingProfile : Profile
    {
        public EntitiesToDTOMappingProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserLoginDTO>().ReverseMap();
            CreateMap<User, UserTypeDTO>().ReverseMap();
            CreateMap<User, UserPasswordDTO>().ReverseMap();
            CreateMap<ClothingCollection, ClothingCollectionDTO>().ReverseMap();
            CreateMap<ModelClothing, ModelClothingDTO>().ReverseMap();
            CreateMap<Company, CompanyDTO>().ReverseMap();
            CreateMap<Company, CompanyLTDTO>().ReverseMap();
            CreateMap<GetHelp, GetHelpDTO>().ReverseMap();
        }
    }
}

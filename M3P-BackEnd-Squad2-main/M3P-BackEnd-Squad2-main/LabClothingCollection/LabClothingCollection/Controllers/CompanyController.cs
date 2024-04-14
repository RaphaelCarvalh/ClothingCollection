using AutoMapper;
using LabClothingCollection.Context;
using LabClothingCollection.DTOs;
using LabClothingCollection.Repositories.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LabClothingCollection.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [EnableCors("AllowAngularOrigins")]
    public class CompanyController : Controller
    {
        private readonly LCCContext _context;
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper;

        public CompanyController(LCCContext context, ICompanyRepository companyRepository, IMapper mapper)
        {
            _context = context;
            _companyRepository = companyRepository;
            _mapper = mapper;
        }


        /// <summary>
        /// Return a specific company
        /// </summary>
        /// <param name="id"></param>
        /// <response code=200>Return a specific company successfully</response>
        /// <response code=404>Company not found</response>
        [HttpGet("getCompanyById/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetCompaniesById(int id)
        {
            var company = await _companyRepository.GetCompanyById(id);
            if (company == null)
            {
                return NotFound("Empresa não encontrado!");
            }
            var companyDTO = _mapper.Map<CompanyDTO>(company);
            return Ok(companyDTO);
        }


        /// <summary>
        /// Update company configurations
        /// </summary>
        /// <param name="companyLTDTO"></param>
        /// <param name="id"></param>
        /// <response code=200>Update a specific company configurations successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=404>Company Not Found</response>
        [HttpPut("updateCompany/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateInfoCompany(int id, CompanyLTDTO companyLTDTO)
        {
            var company = await _companyRepository.GetCompanyById(id);
            if(company == null)
            {
                return NotFound("Usuário inválido.");
            }
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _mapper.Map(companyLTDTO, company);
            await _companyRepository.SaveAllAsync();
            company.Logo = companyLTDTO.Logo;
            company.DefaultTheme = companyLTDTO.DefaultTheme;
            company.LightModePrimary = companyLTDTO.LightModePrimary;
            company.LightModeSecondary = companyLTDTO.LightModeSecondary;
            company.DarkModePrimary = companyLTDTO.DarkModePrimary;
            company.DarkModeSecondary = companyLTDTO.DarkModeSecondary;
            return Ok(company);
        }
    }
}

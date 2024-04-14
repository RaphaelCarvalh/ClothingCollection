using AutoMapper;
using LabClothingCollection.Context;
using LabClothingCollection.DTOs;
using LabClothingCollection.Models;
using LabClothingCollection.Repositories;
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
    public class GetHelpController : Controller
    {
        private readonly LCCContext _context;
        private readonly IGetHelpRepository _getHelpRepository;
        private readonly IMapper _mapper;

        public GetHelpController(LCCContext context, IGetHelpRepository getHelpRepository, IMapper mapper)
        {
            _context = context;
            _getHelpRepository = getHelpRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Returns the list of GetHelp
        /// </summary>
        /// <returns>Returns the list of Models</returns>
        /// <response code=200>Returns the list of Models</response>    
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetHelp>>> GetHelp()
        {
            var getHelp = await _getHelpRepository.GetHelp();
            var getHelps = _mapper.Map<IEnumerable<GetHelp>>(getHelp);
            return Ok(getHelps);
        }

        /// <summary>
        /// Return a specific GetHelp
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Return a specific GetHelp successfully</returns>
        /// <response code=200>Return a specific GetHelp successfully</response>
        /// <response code=404>GetHelp not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetHelpById(int id)
        {
            var getHelp = await _getHelpRepository.GetHelpById(id);
            if (getHelp == null)
            {
                return NotFound("Obter Ajuda não encontrado.");
            }
            var getHelpDTO = _mapper.Map<GetHelpDTO>(getHelp);
            return Ok(getHelpDTO);
        }

        /// <summary>
        /// Create a GetHelp
        /// </summary>
        /// <param name="getHelpDTO"></param>
        /// <returns>Create a GetHelp successfully</returns>
        /// <response code=201>Create a GetHelp successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=409>GetHelp name already exists</response>
        [HttpPost("createGetHelp")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> CreateGetHelp(GetHelpDTO getHelpDTO)
        {
            var getHelp = _mapper.Map<GetHelp>(getHelpDTO);
            _getHelpRepository.CreateGetHelp(getHelp);

            if (getHelp.Title == _context.GetHelp.First().Title)
            {
                return Conflict();
            }

            if (await _getHelpRepository.SaveAllAsync())
            {
                return CreatedAtAction(nameof(GetHelpById), new { id = getHelp.Id }, getHelp);
            }
            return BadRequest();
        }

        /// <summary>
        /// Update a specific GetHelp
        /// </summary>
        /// <param name="id"></param>
        /// <param name="getHelpDTO"></param>
        /// <returns>Update a specific GetHelp successfully</returns>
        /// <response code=200>Update a specific GetHelp successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=404>GetHelp Not Found</response>
        [HttpPut("updateGetHelp/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> UpdateCollection(int id, GetHelpDTO getHelpDTO)
        {
            if (getHelpDTO.Id == 0)
            {
                return BadRequest();
            }

            var getHelp = _mapper.Map<GetHelp>(getHelpDTO);
            _getHelpRepository.UpdateGetHelp(getHelp);
            if (getHelpDTO.Id == null)
            {
                return NotFound("Obter Ajuda não encontrado.");
            }

            if (await _getHelpRepository.SaveAllAsync())
            {
                return Ok("Obter Ajuda atualizado com sucesso.");
            }
            return BadRequest();
        }

        /// <summary>
        /// Delete a specific GetHelp
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Delete a specific GetHelp successfully</returns>
        /// <response code=204>Delete a specific GetHelp successfully</response>
        /// <response code=404>GetHelp not found</response>
        [HttpDelete("deleteGetHelp/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteGetHelp(int id)
        {
            var getHelp = await _getHelpRepository.GetHelpById(id);
            if (getHelp == null)
            {
                return NotFound("Obter Ajuda não encontrada.");
            }
            _getHelpRepository.DeleteGetHelp(getHelp);
            await _getHelpRepository.SaveAllAsync();
            return NoContent();
        }
    }
}

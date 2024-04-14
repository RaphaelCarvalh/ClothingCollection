using AutoMapper;
using LabClothingCollection.Context;
using LabClothingCollection.DTOs;
using LabClothingCollection.Models;
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
    public class ModelClothingController : Controller
    {
        private readonly LCCContext _context;
        private readonly IModelClothingRepository _modelRepository;
        private readonly IMapper _mapper;

        public ModelClothingController(LCCContext context, IModelClothingRepository modelRepository, IMapper mapper)
        {
            _context = context;
            _modelRepository = modelRepository;
            _mapper = mapper;
        }


        /// <summary>
        /// Returns the list of Models and the number of items per page may be limited
        /// </summary>
        /// <returns>Returns the list of Models</returns>
        /// <response code=200>Returns the list of Models</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ModelClothing>>> GetClothingModels()
        {
            var model = await _modelRepository.GetModelsClothing();
            var models = _mapper.Map<IEnumerable<ModelClothing>>(model);
            return Ok(models);
        }

        /// <summary>
        /// Return a specific model
        /// </summary>
        /// <param name="id"></param>
        /// <response code=200>Return a specific model successfully</response>
        /// <response code=404>Model not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetClothingModelsById(int id)
        {
            var modelClothing = await _modelRepository.GetModelsClothingById(id);
            if (modelClothing == null)
            {
                return NotFound("Modelo não encontrado.");
            }
            var modelClothingDTO = _mapper.Map<ModelClothingDTO>(modelClothing);
            return Ok(modelClothingDTO);
        }

        /// <summary>
        /// Create a model
        /// </summary>
        /// <param name="modelClothingDTO"></param>
        /// <response code=201>Create a model successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=409>Model name already exists</response>
        [HttpPost("createModel")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> CreateClothingModels(ModelClothingDTO modelClothingDTO)
        {
            var modelClothing = _mapper.Map<ModelClothing>(modelClothingDTO);
            _modelRepository.CreateModelsClothing(modelClothing);

            if (modelClothing.Name == _context.Models.First().Name)
            {
                return Conflict();
            }

            if (await _modelRepository.SaveAllAsync())
            {
                return CreatedAtAction(nameof(GetClothingModelsById), new { id = modelClothing.Id }, modelClothing);
            }
            return BadRequest();
        }

        /// <summary>
        /// Update a specific model
        /// </summary>
        /// <param name="id"></param>
        /// <param name="modelClothingDTO"></param>
        /// <response code=200>Update a specific model successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=404>Model Not Found</response>
        [HttpPut("updateModel/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateModels(int id, ModelClothingDTO modelClothingDTO)
        {
            if (modelClothingDTO.Id == 0)
            {
                return BadRequest();
            }

            var modelClothing = _mapper.Map<ModelClothing>(modelClothingDTO);
            _modelRepository.UpdateModelClothing(modelClothing);
            if (modelClothingDTO.Id == null)
            {
                return NotFound("Coleção não encontrado.");
            }

            if (await _modelRepository.SaveAllAsync())
            {
                return Ok("Coleção atualizado com sucesso.");
            }
            return BadRequest();
        }

        /// <summary>
        /// Delete a specific model
        /// </summary>
        /// <param name="id"></param>
        /// <response code=204>Delete a specific model successfully</response>
        /// <response code=404>Model not found</response>
        [HttpDelete("deleteModel/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteClothingModels(int id)
        {
            var modelClothing = await _modelRepository.GetModelsClothingById(id);
            if (modelClothing == null)
            {
                return NotFound("Modelo não encontrado.");
            }
            _modelRepository.DeleteModelsClothing(modelClothing);
            await _modelRepository.SaveAllAsync();
            return NoContent();
        }
    }
}

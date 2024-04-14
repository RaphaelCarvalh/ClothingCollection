using Microsoft.AspNetCore.Mvc;
using LabClothingCollection.Context;
using LabClothingCollection.Models;
using AutoMapper;
using LabClothingCollection.Repositories.Interface;
using LabClothingCollection.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors;

namespace LabClothingCollection.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [EnableCors("AllowAngularOrigins")]
    public class ClothingCollectionsController : Controller
    {
        private readonly LCCContext _context;
        private readonly IClothingCollectionRepository _clothingCollectionRepository;
        private readonly IMapper _mapper;

        public ClothingCollectionsController(LCCContext context, IClothingCollectionRepository clothingCollectionRepository, IMapper mapper)
        {
            _context = context;
            _clothingCollectionRepository = clothingCollectionRepository;
            _mapper = mapper;
        }


        /// <summary>
        /// Returns the list of Collections
        /// </summary>
        /// <returns>Returns the list of Collections</returns>
        /// <response code=200>Returns the list of Collections</response> 
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClothingCollection>>> GetCollections()
        {
            var collection = await _clothingCollectionRepository.GetClothingCollections();
            var collections = _mapper.Map<IEnumerable<ClothingCollection>>(collection);
            return Ok(collections);
        }

        /// <summary>
        /// Return a specific collection
        /// </summary>
        /// <param name="id"></param>
        /// <response code=200>Return a specific collection successfully</response>
        /// <response code=404>Collection not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCollectionById(int id)
        {
            var clothingCollection = await _clothingCollectionRepository.GetClothingCollectionById(id);
            if (clothingCollection == null)
            {
                return NotFound("Coleção não encontrada.");
            }
            var clothingCollectionDTO = _mapper.Map<ClothingCollectionDTO>(clothingCollection);
            return Ok(clothingCollectionDTO);
        }

        /// <summary>
        /// Create a model
        /// </summary>
        /// <param name="clothingCollectionDTO"></param>
        /// <response code=201>Create a collection successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=409>Collection name already exists</response>
        [HttpPost("createCollection")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> CreateCollection(ClothingCollectionDTO clothingCollectionDTO)
        {
            var clothingCollection = _mapper.Map<ClothingCollection>(clothingCollectionDTO);
            _clothingCollectionRepository.CreateClothingCollection(clothingCollection);

            if (clothingCollection.Name == _context.Collections.First().Name)
            {
                return Conflict();
            }

            if (await _clothingCollectionRepository.SaveAllAsync())
            {
                return CreatedAtAction(nameof(GetCollectionById), new { id = clothingCollection.Id }, clothingCollection);
            }
            return BadRequest();
        }

        /// <summary>
        /// Update a specific collection
        /// </summary>
        /// <param name="id"></param>
        /// <param name="collectionDTO"></param>
        /// <response code=200>Update a specific collection successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=404>Collection Not Found</response>
        [HttpPut("updateCollection/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> UpdateCollection(int id, ClothingCollectionDTO collectionDTO)
        {
            if (collectionDTO.Id == 0)
            {
                return BadRequest();
            }

            var clothingCollection = _mapper.Map<ClothingCollection>(collectionDTO);
            _clothingCollectionRepository.UpdateClothingCollection(clothingCollection);
            if (collectionDTO.Id == null)
            {
                return NotFound("Coleção não encontrado.");
            }

            if (await _clothingCollectionRepository.SaveAllAsync())
            {
                return Ok("Coleção atualizado com sucesso.");
            }
            return BadRequest();
        }

        /// <summary>
        /// Delete a specific collection
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Delete a specific collection successfully</returns>
        /// <response code=204>Delete a specific collection successfully</response>
        /// <response code=404>Collection not found</response>
        [HttpDelete("deleteCollection/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteCollection(int id)
        {
            var collection = await _clothingCollectionRepository.GetClothingCollectionById(id);
            if (collection == null)
            {
                return NotFound("Coleção não encontrada.");
            }
            _clothingCollectionRepository.DeleteClothingCollection(collection);
            await _clothingCollectionRepository.SaveAllAsync();
            return NoContent();
        }
    }
}


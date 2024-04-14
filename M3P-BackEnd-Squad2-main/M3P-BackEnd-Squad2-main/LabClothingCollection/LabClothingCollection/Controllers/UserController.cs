using AutoMapper;
using LabClothingCollection.Context;
using LabClothingCollection.DTOs;
using LabClothingCollection.Models;
using LabClothingCollection.Repositories.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LabClothingCollection.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Produces("application/json")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [EnableCors("AllowAngularOrigins")]
    public class UserController : Controller
    {
        private readonly LCCContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public UserController(LCCContext context, IUserRepository userRepository, IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _context = context;
            _userRepository = userRepository;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        /// <summary>
        /// Return a list of users
        /// </summary>
        /// <response code=200>Returns a list of users successfully</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _userRepository.GetUsers();
            var userDTOs = _mapper.Map<IEnumerable<UserDTO>>(users);
            return Ok(userDTOs);
        }

        /// <summary>
        /// Return a specific user
        /// </summary>
        /// <param name="id"></param>
        /// <response code=200>Return a specific user successfully</response>
        /// <response code=404>User not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetUserById(string id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }
            var userDTO = _mapper.Map<UserDTO>(user);
            return Ok(userDTO);
        }

        /// <summary>
        /// Create an user
        /// </summary>
        /// <param name="userDTO"></param>
        /// <response code=201>Create an user successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=409>Name already exists</response>
        [HttpPost("userCreate")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<UserDTO>> CreateUser(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);

            user = new User
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                Password = userDTO.Password,
                UserStatus = userDTO.UserStatus,
                UserType = userDTO.UserType,
                IdCompany = userDTO.IdCompany,
                UserName = userDTO.Email,
                EmailConfirmed = true
            };

            _userRepository.CreateUser(user);

            var result = await _userManager.CreateAsync(user, user.Password);
            if (user.Email == _context.Users.First().Email)
            {
                return Conflict();
            }

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                await _userRepository.SaveAllAsync();
                return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, GenerateTokenToCreate(userDTO));
            }
            return BadRequest();
        }

        /// <summary>
        /// Update of a specific user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userDTO"></param>
        /// <response code=200>Update a specific user successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=404>User Not Found</response>
        [HttpPut("userUpdate/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateUsers(string id, UserDTO userDTO)
        {
            if (userDTO.Id == null)
            {
                return NotFound("User not found.");
            }

            var user = _mapper.Map<User>(userDTO);
            _userRepository.UpdateUser(user);            

            if (await _userRepository.SaveAllAsync())
            {
                return Ok("Update user successfully.");
            }
            return BadRequest();
        }

        /// <summary>
        /// Update the type of a specific user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userDTO"></param>
        /// <returns>Update the type a specific user successfully</returns>
        /// <response code=200>Update the type of a specific user successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=404>User Not Found</response>
        [HttpPut("userUpdate/type/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateUserType(string id, UserTypeDTO userTypeDTO)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound("Usuário inválido.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _mapper.Map(userTypeDTO, user);
            await _userRepository.SaveAllAsync();
            user.UserStatus = userTypeDTO.userStatus;
            user.UserType = userTypeDTO.userType;
            return Ok(user);
        }

        /// <summary>
        /// Update the password of a specific user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="password"></param>
        /// <returns>Update a specific user successfully</returns>
        /// <response code=200>Update the password of a specific user successfully</response>
        [HttpPut("userUpdate/password/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> UpdateUserPassword([FromRoute]string id, [FromBody] UserPasswordDTO userPasswordDTO)
        {   
            await _userRepository.UpdateUserPassword(id, userPasswordDTO.Password);
            return Ok();
        }

        /// <summary>
        /// Delete a specific user
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Delete a specific user successfully</returns>
        /// <response code=204>Delete a specific user successfully</response>
        /// <response code=404>User not found</response>
        [HttpDelete("userDelete/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var User = await _context.Users.FindAsync(id);
            if (User == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            _context.Users.Remove(User);
            await _context.SaveChangesAsync();
            return NoContent();
        }               

        UserToken GenerateTokenToCreate(UserDTO userDTO)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, userDTO.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var configTokenExpiration = _configuration["TokenConfiguration:ExpireHours"];
            var expiration = DateTime.UtcNow.AddHours(double.Parse(configTokenExpiration));

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["TokenConfiguration:Issuer"],
                audience: _configuration["TokenConfiguration:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: credentials);

            return new UserToken()
            {
                Authenticated = true,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration,
                Message = "Token JWT Ok!"
            };
        }
    }
}
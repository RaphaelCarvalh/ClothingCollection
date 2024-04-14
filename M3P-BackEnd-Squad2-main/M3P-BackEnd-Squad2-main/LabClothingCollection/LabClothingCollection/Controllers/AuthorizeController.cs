using AutoMapper;
using LabClothingCollection.Context;
using LabClothingCollection.DTOs;
using LabClothingCollection.Models;
using LabClothingCollection.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LabClothingCollection.Controllers
{
    [Produces("application/json")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AuthorizeController : Controller
    {
        private readonly LCCContext _context;
        private readonly IUserRepository _userRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthorizeController(LCCContext context, IUserRepository userRepository, ICompanyRepository companyRepository, IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _context = context;
            _userRepository = userRepository;
            _companyRepository = companyRepository;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        /// <summary>
        /// Return company list
        /// </summary>
        [HttpGet("companies")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            IQueryable<Company> query = _context.Companies;
            return await query.ToListAsync();
        }

        /// <summary>
        /// Return user list
        /// </summary>
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            IQueryable<User> query = _context.Users;
            return await query.ToListAsync();
        }

        /// <summary>
        /// Return a specific user
        /// </summary>
        /// <param name="id"></param>
        /// <response code=200>Return a specific user successfully</response>
        /// <response code=404>User not found</response>
        [HttpGet("getUserById/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> GetUserById(string id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound("Usuário não encontrado!");
            }
            var userDTO = _mapper.Map<UserDTO>(user);
            return Ok(userDTO);
        }

        /// <summary>
        /// Return a specific company successfully
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
        /// Create a manager
        /// </summary>
        /// <param name="userDTO"></param>
        /// <response code=201>Create amanager successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=409>Name already exists</response>
        [HttpPost("managerCreate")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> ManagerCreate(UserDTO userDTO)
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
        /// Create a company
        /// </summary>
        /// <param name="companyDTO"></param>
        /// <response code=201>Create a company successfully</response>
        /// <response code=400>Bad Request</response>
        /// <response code=409>Name already exists</response>
        [HttpPost("companyCreate")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> CompanyCreate(CompanyDTO companyDTO)
        {
            var company = _mapper.Map<Company>(companyDTO);
            _companyRepository.CreateCompany(company);

            if (company.CNPJ == _context.Companies.First().CNPJ)
            {
                return Conflict();
            }

            if (await _userRepository.SaveAllAsync())
            {
                return CreatedAtAction(nameof(GetCompaniesById), new { id = company.Id }, company);
            }
            return BadRequest();
        }

        /// <summary>
        /// Authenticates a user and generates a valid JWT token
        /// </summary>
        /// <param name="userLoginDTO"></param>
        /// <response code=200>Authenticates a user and generates a valid JWT token</response>
        /// <response code=400>Bad Request</response>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> LoginUser(UserLoginDTO userLoginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(userLoginDTO.Email, userLoginDTO.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return Ok(GenerateTokenToLogin(userLoginDTO));
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Login Inválido...");
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// Generates a valid JWT token for user authentication during login.
        /// </summary>
        /// <param name="userLoginDTO"></param>
        /// <returns>A valid JWT token in case of successful authentication.</returns>
        UserToken GenerateTokenToLogin(UserLoginDTO userLoginDTO)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, userLoginDTO.Email),
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


        /// <summary>
        /// Generates a valid JWT token for user authentication during login.
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns>A valid JWT token in case of successful authentication.</returns>
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

using LabClothingCollection.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using LabClothingCollection.Enums;

namespace LabClothingCollection.Context
{
    public class LCCContext : IdentityDbContext
    {
        public LCCContext() { }

        public LCCContext(DbContextOptions<LCCContext> options) : base(options) { }

        public virtual DbSet<ClothingCollection> Collections { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<ModelClothing> Models { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<GetHelp> GetHelp { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var user = new User();
            var password = new PasswordHasher<User>();
            var hashed = password.HashPassword(user, "!Ab12345");

            modelBuilder.Entity<Company>().HasData(new Company
            {
                Id = 1,
                Name = "TechSolutions Inc.",
                CNPJ = "57154704000136",
                Logo = "",
                DefaultTheme = DefaultTheme.Light,
                LightModePrimary = "",
                LightModeSecondary = "",
                DarkModePrimary = "",
                DarkModeSecondary = ""
            });

            modelBuilder.Entity<Company>().HasData(new Company
            {
                Id = 2,
                Name = "ByteWave Technologies",
                CNPJ = "16854346000197",
                Logo = "",
                DefaultTheme = DefaultTheme.Light,
                LightModePrimary = "",
                LightModeSecondary = "",
                DarkModePrimary = "",
                DarkModeSecondary = ""
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = "1",
                Name = "Clei Lisboa",
                Email = "clei.lisboa@ts.com",
                NormalizedEmail = "CLEI.LISBOA@TS.COM",
                Password = "!Ab12345",
                UserStatus = UserStatus.Ativo,
                UserType = UserType.Gerente,
                IdCompany = 1,
                UserName = "clei.lisboa@ts.com",
                NormalizedUserName = "CLEI.LISBOA@TS.COM",
                EmailConfirmed = true,
                LockoutEnabled = true,
                PasswordHash = hashed
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = "2",
                Name = "Sophia Lisboa",
                Email = "sophia.lisboa@ts.com",
                NormalizedEmail = "SOPHIA.LISBOA@TS.COM",
                Password = "!Ab12345",
                UserStatus = UserStatus.Ativo,
                UserType = UserType.Time,
                IdCompany = 1,
                UserName = "sophia.lisboa@ts.com",
                NormalizedUserName = "SOPHIA.LISBOA@TS.COM",
                EmailConfirmed = true,
                LockoutEnabled = true,
                PasswordHash = hashed
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = "3",
                Name = "Pamela Lisboa",
                Email = "pamela.lisboa@ts.com",
                NormalizedEmail = "PAMELA.LISBOATS.COM",
                Password = "!Ab12345",
                UserStatus = UserStatus.Ativo,
                UserType = UserType.Time,
                IdCompany = 1,
                UserName = "pamela.lisboa@ts.com",
                NormalizedUserName = "PAMELA.LISBOATS.COM",
                EmailConfirmed = true,
                LockoutEnabled = true,
                PasswordHash = hashed
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = "4",
                Name = "Raphael Carvalho",
                Email = "raphael.carvalho@bt.com",
                NormalizedEmail = "RAPHAEL.CARVALHO@BT.COM",
                Password = "!Ab12345",
                UserStatus = UserStatus.Ativo,
                UserType = UserType.Gerente,
                IdCompany = 2,
                UserName = "raphael.carvalho@bt.com",
                NormalizedUserName = "RAPHAEL.CARVALHO@BT.COM",
                EmailConfirmed = true,
                LockoutEnabled = true,
                PasswordHash = hashed
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = "5",
                Name = "Rafaela Carvalho",
                Email = "rafaela.carvalho@bt.com",
                NormalizedEmail = "RAFAELA.CARVALHO@BT.COM",
                Password = "!Ab12345",
                UserStatus = UserStatus.Ativo,
                UserType = UserType.Time,
                IdCompany = 2,
                UserName = "rafaela.carvalho@bt.com",
                NormalizedUserName = "RAFAELA.CARVALHO@BT.COM",
                EmailConfirmed = true,
                LockoutEnabled = true,
                PasswordHash = hashed
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = "6",
                Name = "Rosângela Carvalho",
                Email = "rosangela.carvalho@bt.com",
                NormalizedEmail = "ROSANGELA.CARVALHO@BT.COM",
                Password = "!Ab12345",
                UserStatus = UserStatus.Ativo,
                UserType = UserType.Time,
                IdCompany = 2,
                UserName = "rosangela.carvalho@bt.com",
                NormalizedUserName = "ROSANGELA.CARVALHO@BT.COM",
                EmailConfirmed = true,
                LockoutEnabled = true,
                PasswordHash = hashed
            });

            modelBuilder.Entity<ClothingCollection>().HasData(new ClothingCollection
            {
                Id = 1,
                Name = "Primavera 2023",
                Brand = "Adidas",
                Budget = 70000,
                CollectionColors = "",
                ReleaseYearCollection = 2023,
                LaunchStation = LaunchStation.Primavera,
                Status = Status.Andamento,
                IdUser = "1"
            });

            modelBuilder.Entity<ClothingCollection>().HasData(new ClothingCollection
            {
                Id = 2,
                Name = "Verão 2023",
                Brand = "Nike",
                Budget = 80000,
                CollectionColors = "Azul e Amarelo",
                ReleaseYearCollection = 2023,
                LaunchStation = LaunchStation.Verão,
                Status = Status.Andamento,
                IdUser = "2"
            });

            modelBuilder.Entity<ClothingCollection>().HasData(new ClothingCollection
            {
                Id = 3,
                Name = "Outono 2023",
                Brand = "Puma",
                Budget = 75000,
                CollectionColors = "Vermelho e Marrom",
                ReleaseYearCollection = 2023,
                LaunchStation = LaunchStation.Outono,
                Status = Status.Andamento,
                IdUser = "3"
            });

            modelBuilder.Entity<ClothingCollection>().HasData(new ClothingCollection
            {
                Id = 4,
                Name = "Inverno 2023",
                Brand = "Reebok",
                Budget = 90000,
                CollectionColors = "Preto e Branco",
                ReleaseYearCollection = 2023,
                LaunchStation = LaunchStation.Inverno,
                Status = Status.Andamento,
                IdUser = "4"
            });

            modelBuilder.Entity<ClothingCollection>().HasData(new ClothingCollection
            {
                Id = 5,
                Name = "Verão 2024",
                Brand = "Under Armour",
                Budget = 85000,
                CollectionColors = "Verde e Laranja",
                ReleaseYearCollection = 2024,
                LaunchStation = LaunchStation.Verão,
                Status = Status.Andamento,
                IdUser = "5"
            });

            modelBuilder.Entity<ClothingCollection>().HasData(new ClothingCollection
            {
                Id = 6,
                Name = "Outono 2024",
                Brand = "New Balance",
                Budget = 72000,
                CollectionColors = "Cinza e Marrom",
                ReleaseYearCollection = 2024,
                LaunchStation = LaunchStation.Outono,
                Status = Status.Andamento,
                IdUser = "6"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 1,
                Name = "Camisa com Capuz",
                TypeModel = TypeModel.Camisa,
                Embroidered = false,
                Print = true,
                Cost = 10000,
                IdCCollection = 5,
                IdUser = "1"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 2,
                Name = "Shorts de Verão",
                TypeModel = TypeModel.Bermuda,
                Embroidered = false,
                Print = true,
                Cost = 10000,
                IdCCollection = 1,
                IdUser = "2"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 3,
                Name = "Bermuda Jeans",
                TypeModel = TypeModel.Bermuda,
                Embroidered = true,
                Print = false,
                Cost = 12000,
                IdCCollection = 1,
                IdUser = "3"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 4,
                Name = "Camiseta Casual",
                TypeModel = TypeModel.Camisa,
                Embroidered = false,
                Print = true,
                Cost = 11000,
                IdCCollection = 1,
                IdUser = "4"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 5,
                Name = "Camisa Social",
                TypeModel = TypeModel.Camisa,
                Embroidered = true,
                Print = false,
                Cost = 8000,
                IdCCollection = 1,
                IdUser = "5"
            });
            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 6,
                Name = "Saia de Verão",
                TypeModel = TypeModel.Saia,
                Embroidered = false,
                Print = true,
                Cost = 13000,
                IdCCollection = 2,
                IdUser = "6"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 7,
                Name = "Calça Jeans Skinny",
                TypeModel = TypeModel.Calça,
                Embroidered = true,
                Print = false,
                Cost = 13500,
                IdCCollection = 2,
                IdUser= "4"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 8,
                Name = "Calça de Couro",
                TypeModel = TypeModel.Calça,
                Embroidered = false,
                Print = false,
                Cost = 9000,
                IdCCollection = 2,
                IdUser = "5"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 9,
                Name = "Blusa de Tricô",
                TypeModel = TypeModel.Camisa,
                Embroidered = true,
                Print = false,
                Cost = 5000,
                IdCCollection = 3,
                IdUser = "6"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 10,
                Name = "Calça de Moletom",
                TypeModel = TypeModel.Calça,
                Embroidered = false,
                Print = true,
                Cost = 8000,
                IdCCollection = 3,
                IdUser = "1"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 11,
                Name = "Camisa Polo",
                TypeModel = TypeModel.Camisa,
                Embroidered = true,
                Print = false,
                Cost = 6000,
                IdCCollection = 3,
                IdUser = "2"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 12,
                Name = "Saia Midi",
                TypeModel = TypeModel.Saia,
                Embroidered = false,
                Print = true,
                Cost = 7600,
                IdCCollection = 4,
                IdUser = "3"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 13,
                Name = "Boné Clássico",
                TypeModel = TypeModel.Boné,
                Embroidered = true,
                Print = false,
                Cost = 14000,
                IdCCollection = 4,
                IdUser = "4"
            });

            modelBuilder.Entity<ModelClothing>().HasData(new ModelClothing
            {
                Id = 14,
                Name = "Shorts Esportivos",
                TypeModel = TypeModel.Bermuda,
                Embroidered = false,
                Print = false,
                Cost = 9400,
                IdCCollection = 5,
                IdUser= "6"
            });

            modelBuilder.Entity<GetHelp>().HasData(new GetHelp
            {
                Id = 1,
                Title = "Como Criar uma Coleção",
                Text = "No Sidebar, selecionar Coleções. Na página de Coleções, clicar no botão Criar Coleção. Após efetuar as alterações, clicar no Botão Salvar."
            });

            modelBuilder.Entity<GetHelp>().HasData(new GetHelp
            {
                Id = 2,
                Title = "Como Criar um Modelo",
                Text = "No Sidebar, selecionar Modelos. Na página de Modelos, clicar no botão Criar Modelo. Após efetuar as alterações, clicar no Botão Salvar."
            });
        }
    }
}

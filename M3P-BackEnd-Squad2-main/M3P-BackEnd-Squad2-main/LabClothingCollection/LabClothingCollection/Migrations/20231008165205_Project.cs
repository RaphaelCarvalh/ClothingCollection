using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LabClothingCollection.Migrations
{
    /// <inheritdoc />
    public partial class Project : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CNPJ = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DefaultTheme = table.Column<int>(type: "int", nullable: true),
                    LightModePrimary = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LightModeSecondary = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DarkModePrimary = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DarkModeSecondary = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GetHelp",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Text = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GetHelp", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserStatus = table.Column<int>(type: "int", nullable: true),
                    UserType = table.Column<int>(type: "int", nullable: true),
                    IdCompany = table.Column<int>(type: "int", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_Companies_IdCompany",
                        column: x => x.IdCompany,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Collections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Budget = table.Column<double>(type: "float", nullable: false),
                    CollectionColors = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReleaseYearCollection = table.Column<int>(type: "int", nullable: false),
                    LaunchStation = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Collections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Collections_AspNetUsers_IdUser",
                        column: x => x.IdUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Models",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TypeModel = table.Column<int>(type: "int", nullable: false),
                    Embroidered = table.Column<bool>(type: "bit", nullable: false),
                    Print = table.Column<bool>(type: "bit", nullable: false),
                    Cost = table.Column<double>(type: "float", nullable: false),
                    IdCCollection = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Models", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Models_AspNetUsers_IdUser",
                        column: x => x.IdUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Models_Collections_IdCCollection",
                        column: x => x.IdCCollection,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "CNPJ", "DarkModePrimary", "DarkModeSecondary", "DefaultTheme", "LightModePrimary", "LightModeSecondary", "Logo", "Name" },
                values: new object[,]
                {
                    { 1, "57154704000136", "", "", 1, "", "", "", "TechSolutions Inc." },
                    { 2, "16854346000197", "", "", 1, "", "", "", "ByteWave Technologies" }
                });

            migrationBuilder.InsertData(
                table: "GetHelp",
                columns: new[] { "Id", "Text", "Title" },
                values: new object[,]
                {
                    { 1, "No Sidebar, selecionar Coleções. Na página de Coleções, clicar no botão Criar Coleção. Após efetuar as alterações, clicar no Botão Salvar.", "Como Criar uma Coleção" },
                    { 2, "No Sidebar, selecionar Modelos. Na página de Modelos, clicar no botão Criar Modelo. Após efetuar as alterações, clicar no Botão Salvar.", "Como Criar um Modelo" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "IdCompany", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "Password", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserStatus", "UserType" },
                values: new object[,]
                {
                    { "1", 0, "bad80ab8-1dd4-40f2-9a91-172d32965f20", "User", "clei.lisboa@ts.com", true, 1, true, null, "Clei Lisboa", "CLEI.LISBOA@TS.COM", "CLEI.LISBOA@TS.COM", "!Ab12345", "AQAAAAIAAYagAAAAEPnBP8WhKkaapHEOFkids06ixRpo7ISDgalBzqQoZkjN2LPsr1ruURmplKcNa6m2LQ==", null, false, "2b02e4e6-12e1-4185-9368-bfb14aef38c5", false, "clei.lisboa@ts.com", 1, 1 },
                    { "2", 0, "d22589d4-bae3-49f9-b42a-b0644a39b986", "User", "sophia.lisboa@ts.com", true, 1, true, null, "Sophia Lisboa", "SOPHIA.LISBOA@TS.COM", "SOPHIA.LISBOA@TS.COM", "!Ab12345", "AQAAAAIAAYagAAAAEPnBP8WhKkaapHEOFkids06ixRpo7ISDgalBzqQoZkjN2LPsr1ruURmplKcNa6m2LQ==", null, false, "4fe5a41a-bd2e-4bf6-b155-a07b5b9b40ec", false, "sophia.lisboa@ts.com", 1, 3 },
                    { "3", 0, "0de27f24-9b43-4912-b2dd-c4165137eec7", "User", "pamela.lisboa@ts.com", true, 1, true, null, "Pamela Lisboa", "PAMELA.LISBOATS.COM", "PAMELA.LISBOATS.COM", "!Ab12345", "AQAAAAIAAYagAAAAEPnBP8WhKkaapHEOFkids06ixRpo7ISDgalBzqQoZkjN2LPsr1ruURmplKcNa6m2LQ==", null, false, "0a9220e5-baf2-4964-bcf8-908b689c3b77", false, "pamela.lisboa@ts.com", 1, 3 },
                    { "4", 0, "171664eb-e87e-420d-9ce7-b9af58627ef3", "User", "raphael.carvalho@bt.com", true, 2, true, null, "Raphael Carvalho", "RAPHAEL.CARVALHO@BT.COM", "RAPHAEL.CARVALHO@BT.COM", "!Ab12345", "AQAAAAIAAYagAAAAEPnBP8WhKkaapHEOFkids06ixRpo7ISDgalBzqQoZkjN2LPsr1ruURmplKcNa6m2LQ==", null, false, "59f8a151-d163-412f-b5b5-48d71df6cbc7", false, "raphael.carvalho@bt.com", 1, 1 },
                    { "5", 0, "a846e0d9-7d67-4a0f-b3db-8622b2b590bd", "User", "rafaela.carvalho@bt.com", true, 2, true, null, "Rafaela Carvalho", "RAFAELA.CARVALHO@BT.COM", "RAFAELA.CARVALHO@BT.COM", "!Ab12345", "AQAAAAIAAYagAAAAEPnBP8WhKkaapHEOFkids06ixRpo7ISDgalBzqQoZkjN2LPsr1ruURmplKcNa6m2LQ==", null, false, "32efc2d0-7cef-4286-9e77-575b05f6acfe", false, "rafaela.carvalho@bt.com", 1, 3 },
                    { "6", 0, "ff6d968d-e76b-4400-89b5-0b7b20ef080c", "User", "rosangela.carvalho@bt.com", true, 2, true, null, "Rosângela Carvalho", "ROSANGELA.CARVALHO@BT.COM", "ROSANGELA.CARVALHO@BT.COM", "!Ab12345", "AQAAAAIAAYagAAAAEPnBP8WhKkaapHEOFkids06ixRpo7ISDgalBzqQoZkjN2LPsr1ruURmplKcNa6m2LQ==", null, false, "e7b17086-2bbd-45b2-a5f8-7feb8a1c6ca0", false, "rosangela.carvalho@bt.com", 1, 3 }
                });

            migrationBuilder.InsertData(
                table: "Collections",
                columns: new[] { "Id", "Brand", "Budget", "CollectionColors", "IdUser", "LaunchStation", "Name", "ReleaseYearCollection", "Status" },
                values: new object[,]
                {
                    { 1, "Adidas", 70000.0, "", "1", 1, "Primavera 2023", 2023, 2 },
                    { 2, "Nike", 80000.0, "Azul e Amarelo", "2", 2, "Verão 2023", 2023, 2 },
                    { 3, "Puma", 75000.0, "Vermelho e Marrom", "3", 3, "Outono 2023", 2023, 2 },
                    { 4, "Reebok", 90000.0, "Preto e Branco", "4", 4, "Inverno 2023", 2023, 2 },
                    { 5, "Under Armour", 85000.0, "Verde e Laranja", "5", 2, "Verão 2024", 2024, 2 },
                    { 6, "New Balance", 72000.0, "Cinza e Marrom", "6", 3, "Outono 2024", 2024, 2 }
                });

            migrationBuilder.InsertData(
                table: "Models",
                columns: new[] { "Id", "Cost", "Embroidered", "IdCCollection", "IdUser", "Name", "Print", "TypeModel" },
                values: new object[,]
                {
                    { 1, 10000.0, false, 5, "1", "Camisa com Capuz", true, 7 },
                    { 2, 10000.0, false, 1, "2", "Shorts de Verão", true, 1 },
                    { 3, 12000.0, true, 1, "3", "Bermuda Jeans", false, 1 },
                    { 4, 11000.0, false, 1, "4", "Camiseta Casual", true, 7 },
                    { 5, 8000.0, true, 1, "5", "Camisa Social", false, 7 },
                    { 6, 13000.0, false, 2, "6", "Saia de Verão", true, 9 },
                    { 7, 13500.0, true, 2, "4", "Calça Jeans Skinny", false, 5 },
                    { 8, 9000.0, false, 2, "5", "Calça de Couro", false, 5 },
                    { 9, 5000.0, true, 3, "6", "Blusa de Tricô", false, 7 },
                    { 10, 8000.0, false, 3, "1", "Calça de Moletom", true, 5 },
                    { 11, 6000.0, true, 3, "2", "Camisa Polo", false, 7 },
                    { 12, 7600.0, false, 4, "3", "Saia Midi", true, 9 },
                    { 13, 14000.0, true, 4, "4", "Boné Clássico", false, 4 },
                    { 14, 9400.0, false, 5, "6", "Shorts Esportivos", false, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_IdCompany",
                table: "AspNetUsers",
                column: "IdCompany");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Collections_IdUser",
                table: "Collections",
                column: "IdUser");

            migrationBuilder.CreateIndex(
                name: "IX_Models_IdCCollection",
                table: "Models",
                column: "IdCCollection");

            migrationBuilder.CreateIndex(
                name: "IX_Models_IdUser",
                table: "Models",
                column: "IdUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "GetHelp");

            migrationBuilder.DropTable(
                name: "Models");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Collections");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}

# LabClothing Collection API 🧵
### Acesso ao trello do projeto
https://trello.com/b/neBMBgic/m3p-backend-squad-2

## Descrição
A LabClothingCollection API é o backend do software de gerenciamento de moda LabClothingCollection. Com essa API REST desenvolvida em C#, os usuários podem dar asas à sua imaginação e criar suas próprias coleções de roupas, além de editar modelos e interagir com suas peças.

💡 Seja um designer de moda virtual e tenha controle total sobre suas criações!

## Tecnologias Utilizadas
- Linguagem de Programação: C#
- Framework: ASP.NET Core
- Banco de Dados: SQL Server
- ORM: Entity Framework Core
- Ferramenta de Documentação: Swagger

## Executando a API
Siga as instruções abaixo para executar a API em seu ambiente local:

1. Clone o repositório em sua máquina local.
git clone https://github.com/DEVin-Audaces-V2/M3P-BackEnd-Squad2.git

2. Acesse as dependências principais ClothingCollection e instale as dependências do projeto.
cd _LabClothingClollection

3. Configure o banco de dados no arquivo `appsettings.json` com as informações corretas:

"ConnectionStrings": {
  "DefaultConnection": "Server=nome-do-servidor;Database=labclothing;User Id=seu-usuario;Password=sua-senha;"
}

Certifique-se de substituir "nome-do-servidor", "seu-usuario" e "sua-senha" pelas informações corretas do seu servidor SQL.

4. Execute as migrações do banco de dados: dotnet ef database update

5. Inicie a API: dotnet run
-----------------------------------------------------------------------------------------------------------
A API estará disponível em https://localhost:5222/complemento ou em um servidor local de sua escolha.

### Resources

#### A - Authorize `https://localhost:5222/`
- `/api/v{version}/Authorize/complemento`

#### B - ClothingCollections `https://localhost:5222/`
- `/api/v{version}/ClothingCollections/complemento`

#### C - Company `https://localhost:5222/`
- `/api/v{version}/Company/complemento`

#### D - GetHelp `https://localhost:5222/`
- `/api/v{version}/GetHelp/complemento`

#### E - ModelClothing `https://localhost:5222/`
- `/api/v{version}/ModelClothing/complemento`

#### F - User `https://localhost:5222/`
- `/api/v{version}/User/complemento`

### Documentação da API 📚
A documentação da API está disponível por meio do Swagger. Após iniciar a API, acesse `https://localhost:5222/swagger/index.html` em seu navegador para visualizar e interagir com os endpoints disponíveis.

<h3>📷A seguir os modelos lógico utilizado para criação do labclothingcollectionbd:</h3>

<br>
<div align="center">
  <h4>Modelo Lógico utilizado na implementação</h4>
  <img src="https://github.com/DEVin-Audaces-V2/M3P-BackEnd-Squad2/assets/89228213/c4f40ec7-07e3-4c80-8fa0-ac8c79d2dc4e" height="400" width="720" alt="Último commit">
</div>
<br>   

### Melhorias Futuras ✏️➕
- Implementar paginação nos endpoints.
- Autorização personalizada por endpoint.
- Incorporar testes unitários e testes de integração para garantir a qualidade do código.

### Contribuindo
🤝 Contribuições são sempre bem-vindas! Se você tiver alguma sugestão, correção de bugs ou melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Contato
📧 Se você tiver alguma dúvida ou quiser entrar em contato, envie um e-mail para `meuemail@example.com`.

 \ {^_^} /           \ {^_^} /         \ {^_^} /         \ {^_^} /       \ {^_^} /

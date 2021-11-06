## Proposta

### Upload de imagem e variáveis de ambiente.

#### Pacotes utilizados:
    @supabase/supabase-js, bcryptjs, dotenv, express, jsonwebtoken, knex, nodemailer, nodemailer-express-handlebars, pg

1 - Configurar variáveis de ambiente.

2 - implementar upload de imagem do produto cadastrado.

-   Deverá receber o `base64` da imagem no body da requisição que faz o cadastro do produto e implementar o upload dessa imagem antes do cadastro, de fato, acontecer. Isso, claro, se a imagem for informada no body, pois não deve ser um campo obrigatório.

-   Na atualização do produto, não deverá permitir a atualização do campo imagem no banco de dados e dois novos endpoints deverão existir. Um para atualização da imagem existente (deve atualizar a imagem no servidor ou excluir e fazer o upload novamente) e o outro endpoint apenas para remover a imagem do produto (a exclusão deve acontecer no servidor e no campo imagem do banco de dados também).

-   Todos os endpoints deverão receber o token do usuario autenticado e validar se o produto em questão pertence a ele.


3 - Implementar envio de email quando um novo usuario for cadastrado.

-   O email deverá conter um texto de boas vindas para o novo usuário.

---

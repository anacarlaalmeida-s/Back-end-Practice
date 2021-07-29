const express = require("express");
const app = express();
app.use(express.json());

const convidados = ["Carlos", "Amanda", "Fernanda", "Juliana", "Lucas", "Roberto"];

app.get("/convidados", (req, res) => {
    //res.json(convidados);//funcao anterior, so acessar toda a lista
    if (convidados.includes(req.query.nome)) {//implementação
        res.send({ mensagem: "Convidado presente." })
    } else if (!req.query.nome) {
        res.json(convidados);
    } else {
        res.send({ mensagem: "O convidado buscado não está presente na lista." });
    };
});

app.post("/convidados", (req, res) => {
    if(convidados.includes(req.body.nome)){
        res.json({mensagem: "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também."})
    }else{
        convidados.push(req.body.nome);
        res.json({mensagem:"Convidado adicionado."})
    };   
});

app.delete("/convidados/:nome", (req,res)=>{
    if(convidados.includes(req.params.nome)){
        const indice = convidados.indexOf(req.params.nome);
        convidados.splice(indice,1);
        res.json({mensagem: "Convidado removido."})
    }else{
        res.json({mensagem:"O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido."})
    };
});

app.listen(8000);
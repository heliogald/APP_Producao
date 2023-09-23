import { db } from "../db.js";

export const getItens = (_, res) => {
  const q = "SELECT *, DATE_FORMAT( dataDeLiberacao, '%d/%m/%Y' ) AS dataDeLiberacao FROM itens;"//"SELECT * FROM itens";

  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }

    return res.status(200).json(data);
  });
};

export const addItens = (req, res) => {
const q = "INSERT INTO itens(`nomeCliente`, `equipamentoModelo`, `numeroDeSerie`, `dataDeLiberacao`,\
 `codigo`, `descricao`, `quantidade`, `void`) VALUE(?)";

  const values = [
    req.body.nomeCliente,
    req.body.equipamentoModelo,
    req.body.numeroDeSerie,
    req.body.dataDeLiberacao,    
    req.body.codigo,
    req.body.descricao,
    req.body.quantidade,
    req.body.void,    
  ];

  console.log(values);
  console.log(req.body);

  db.query(q, [values], (error) => {
    if (error) return res.json(error);

    return res.status(200).json("Item cadastrado com sucesso");
  });
};

export const updateItens = (req, res) => {
  const q = 
    "UPDATE itens SET `nomeCliente` = ?, `equipamentoModelo` = ?, `numeroDeSerie` = ?, `dataDeLiberacao` = ?,\
    `codigo` = ?, `descricao` = ?, `quantidade` = ?, `void` = ? WHERE `id` = ?";

  const values = [
    req.body.nomeCliente,
    req.body.equipamentoModelo,
    req.body.numeroDeSerie,
    req.body.dataDeLiberacao,    
    req.body.codigo,
    req.body.descricao,
    req.body.quantidade,
    req.body.void,    
  ];

  db.query(q, [...values, req.params.id], (error) => {
    if (error) return res.json(error);

    return res.status(200).json("Item atualizado com sucesso");
  });
};

export const deleteItens = (req, res) => {
  const q = "DELETE FROM itens WHERE `id` = ?";

  db.query(q, [req.params.id], (error) => {
    if (error) return res.json(error);

    return res.status(200).json("Item deletado com sucesso");
  });
};

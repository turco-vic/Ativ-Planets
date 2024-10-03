import { Router } from "express";

const filmesRoutes = Router();

let filmes = [
    {
      id: Number(Math.floor(Math.random() * 99)) + 1,
      titulo: "Meu irmão urso",
      genero: "Animação",
      emCartaz: false
    },
    {
      id: Number(Math.floor(Math.random() * 99)) + 1,
      titulo: "DeadPool and Wolverine",
      genero: "Ação",
      emCartaz: true,
    },
    {
      id: Number(Math.floor(Math.random() * 99)) + 1,
      titulo: "É assim que acaba",
      genero: "Romance",
      emCartaz: true,
    }
  ];

  //Rota para buscar todos os elementos do array filmes
filmesRoutes.get("/", (req, res) => {
  return res.status(201).json(filmes);
});

//Rota para criar novo filme
filmesRoutes.post("/", (req, res) => {
  const { titulo, genero, emCartaz} = req.body

  const novoFilme = {
    id: Number(Math.floor(Math.random() * 99)) + 1,
    titulo,
    genero,
    emCartaz,
  }

  filmes.push(novoFilme);
  return res.status(201).send(filmes);
});

//Rota para buscar um elemento específico do array filmes
filmesRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  const filme = filmes.find((movie) => movie.id === Number(id));


  if (!filme) {
    return res.status(404).send({ message: "Filme não encontrado!" });
  }

  return res.status(200).send(filme);
});

//Rota para editar um filme
filmesRoutes.put("/:id", (req, res) => {
  const { id } = req.params

  const filme = filmes.find((movie) => movie.id === Number(id)
  );


  if (!filme) {
    return res.status(404).send({ message: "Filme não encontrado!" });
  };

  const { titulo, genero, emCartaz} = req.body

  filme.titulo = titulo
  filme.genero = genero
  filme.emCartaz = emCartaz

  return res.status(200).send({
    message: "Filme atualizado!",
    filme,
  })

});//Rota para deletar um filme
filmesRoutes.delete("/:id", (req, res) => {
  const { id } = req.params

  const filme = filmes.find((movie) => movie.id === Number(id)
  );

  if (!filme) {
    return res.status(404).send({ message: "Filme não encontrado!" });
  }

  filmes = filmes.filter((movie) => movie.id !== Number(id));


  return res.status(200).send({
    message: "Filme deletado!",
    filme,
  })
})

export default filmesRoutes;
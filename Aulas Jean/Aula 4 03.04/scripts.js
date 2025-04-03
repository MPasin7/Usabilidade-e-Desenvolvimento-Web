const turmas = [];
  const alunos = new Map();
    
    function buscaAluno(ra) {
        let aluno = alunos.get(ra);
        if(aluno == undefined){
            aluno = {ra, 
                nome: "Aluno não cadastrado",
                idade: 0
            }
        }
        return aluno;
    }

    function criaTitulo(titulo) {
        const h1 = document.createElement('h1');
        h1.innerText = titulo;
        h1.classList.add('titulo')
        return h1;
    }
    function criaEmenta(ementa) {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.innerText = "Ementa";
        div.appendChild(h2);
        const p = document.createElement('p');
        p.innerText = ementa;
        div.appendChild(p);
        return div;
    }

    //Função que lista os alunos
function criaListaAlunos(alunos) {
    //Cria uma DIV
        const div = document.createElement('div');
    //Cria um H2 
        const h2 = document.createElement('h2');
    //Adiciona o titulo Alunos ao H2
        h2.innerText = "Alunos";
    //Adiona o H2 dentro da DIV
        div.appendChild(h2);
    //Cria uma UL
        const ul = document.createElement('ul');
    //Adiciona a UL a DIV
        div.appendChild(ul);
    //Cria um For Each onde para cada RA da turma ele executa:
        alunos.forEach(ra => {
            //Cria um LI
            const li = document.createElement('li');
            //Cria uma Var do tipo aluno que recebe a Função Busca aluno com a ra passada
            const aluno = buscaAluno(ra);
            //Com o resultado ele cria um ítem na lista adicionando somente o aluno.NOME
            li.innerText = aluno.nome;
            //Devolve para a UL superior o li com a informação do nome criada acima.
            ul.appendChild(li);
        });
        //Retorna a DIV formada.
        return div;
    }
    
    function cardTurma(turma) {
        const app = document.getElementById('app');
        const div = document.createElement('div');
        div.appendChild( criaTitulo(turma.nome) );
        div.appendChild(criaEmenta(turma.ementa));
        div.appendChild( criaListaAlunos(turma.alunos));
        div.classList.add('card')
        app.appendChild(div)
    }

    function listaSelecaoAlunos(alunos){
        const ul = document.createElement('ul');
        alunos.forEach(aluno => {
            const li = document.createElement('li');
            ul.appendChild(li);
            const btn = document.createElement('button');
            li.appendChild(btn);
            btn.onclick = () => {
                turmas[1].alunos.push(aluno.ra);
                alert(aluno.nome + '' + aluno.ra);
                refresh();
            }
            btn.innerText = aluno.nome;
        })

        return ul;
    }

    function refresh(){
        document.getElementById('app').innerHTML = "";
        turmas.forEach(turma=>cardTurma(turma));
        //Isto
        document.getElementById('app').appendChild(listaSelecaoAlunos( Array.from(alunos.values())));


        /*E isto fazem a mesma coisa. 
        const iteradorMapaAlunos = alunos.values();
        const arrAlunos = Array.from(iteradorMapaAlunos);
        const lista = listaSelecaoAlunos(arrAlunos);

        const app = document.getElementById('app');
        app.appendChild(lista);*/
    }

    console.log("antes do fetch", turmas);
    fetch("http://localhost:3000/turmas")
    .then((response)=> {
        console.log(response);
        response.json(
        .then(dados)=>{
            // nao da pq turmas é constante
           // turmas = dados;
           dados.forEach((t)=> turmas.push(t))
           console.log("turmas",turmas);
           refresh();
        })
        .catch((erro)=>{console.log(erro.message)})
    })
    .catch((erro)=>{console.log(erro.message)});

    console.log("depois do fetch", turmas);

    refresh();
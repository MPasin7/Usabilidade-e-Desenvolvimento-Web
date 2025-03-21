const turmas = 
    [
    {
        id: "UC1",
        nome: "Usabilidade e Dev Web",
        ementa: "asdflkj df lsdjfsdlfkj sdlf",
        diasAula: "5as e 6as às 19h",
        alunos: ['000', '123', '456', '789']
    },
    {
        id: "UC2",
        nome: "Sistemas Distribuídos",
        ementa: "asdflkj df lsdjfsdlfkj sdlf",
        diasAula: "2as e 3as às 19h",
        alunos: []
        
    }];
    const alunos = new Map();
    alunos.set('123',{
            ra:'123',
            nome: 'Luana',
            idade: 20,
            sexo: 'F'
        });
    alunos.set('456',
        {
            ra: '456',
            nome: 'João',
            idade: 21,
            sexo: 'M'
        });
    alunos.set('789',    
        {
            ra: '789',
            nome: 'Luano',
            idade: 22,
            sexo: 'M'
        });
    
    function buscaAluno(ra) {
        let aluno = alunos.get(ra);
        if (aluno == undefined) {
            aluno = {ra: ra, 
                     nome: "Aluno não cadastrado",
                     idade: 0
                    }
        }
        return aluno;
    }

    function criaTitulo(titulo) {
        const h1 = document.createElement('h1');
        h1.innerText = titulo;
        h1.classList.add('titulo');
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

function criaListaAlunos(alunos) {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.innerText = "Alunos";
        div.appendChild(h2);
        const ul = document.createElement('ul');
        div.appendChild(ul);
        alunos.forEach(ra => {
            const li = document.createElement('li');
            const aluno = buscaAluno(ra);
            li.innerText = aluno.nome;
            ul.appendChild(li);
        });
        return div;
    }
    
    function cardTurma(turma) {
        const app = document.getElementById('app');
        const div = document.createElement('div');
        div.appendChild( criaTitulo(turma.nome) );
        div.appendChild(criaEmenta(turma.ementa));
        div.appendChild( criaListaAlunos(turma.alunos));
        div.classList.add('card');
        app.appendChild(div);
    }

    function listaSelecaoAlunos(alunos) {
        console.log(alunos);
        const ul = document.createElement('ul');
        alunos.forEach(aluno=>{
            const li = document.createElement('li');
            ul.appendChild(li);
            const btn = document.createElement('button');
            li.appendChild(btn);
            btn.onclick = ()=>{
                turmas[1].alunos.push(aluno.ra);
                alert(aluno.nome+ ' '+ aluno.ra+ ' adicionado')
                refresh();
            };
            btn.innerText = aluno.nome;
        });

        return ul;
    }
    function refresh() {
        console.log(alunos)
        document.getElementById('app').innerHTML = '';
        turmas.forEach(turma=>cardTurma(turma));
        // escolhe isto 
        document.getElementById('app').appendChild(listaSelecaoAlunos( Array.from(alunos.values())));
        // ou isto
        const iteradorMapaAlunos = alunos.values();
        const arrAlunos = Array.from(iteradorMapaAlunos);
        const lista = listaSelecaoAlunos(arrAlunos);

        const app = document.getElementById('app');
        app.appendChild(lista);
    }

    refresh();
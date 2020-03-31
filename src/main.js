import api from './api';

class App{
    constructor(){
        this.endereco = [];
        this.formEl = document.getElementById('end-form');
        this.inputEl = document.querySelector('input[name=endereco]');
        this.listEl = document.getElementById('end-list');

        this.registerHandlers();
    }
        registerHandlers() {
            this.formEl.onsubmit = event => this.addRepository(event);
        }
        setLoading(loading = true){
            if(loading === true){
                let loadingEl = document.createElement('span');
                loadingEl.appendChild(document.createTextNode('Carregando...'));
                loadingEl.setAttribute('id','loading');

                this.formEl.appendChild(loadingEl);
            }else{
                document.getElementById('loading').remove();
            }
        }
    
        async addRepository(event) {
            event.preventDefault();

            const endInput = this.inputEl.value;

            if(endInput.length === 0)
                return;
            this.setLoading();
        try{
            const response = await api.get(`${endInput}/json`);

            const{ cep, logradouro, bairro, localidade, uf} = response.data;

            this.endereco.push({
                cep,
                logradouro,
                bairro,
                cidade:localidade,
                uf,
            });
            this.inputEl.value = '';

            this.render();
        }catch(err){
            alert('O CEP não existe');
        }
        this.setLoading(false);
        }
        render(){
            this.listEl.innerHTML = '';
            this.endereco.forEach( end => {

                let cepEl = document.createElement('strong');
                cepEl.appendChild(document.createTextNode(end.cep));
                
                let logradouroEl = document.createElement('p');
                logradouroEl.appendChild(document.createTextNode(end.logradouro));
                let bairroEl = document.createElement('p');
                bairroEl.appendChild(document.createTextNode(`bairro:${end.bairro}`));
                let cidadeEl = document.createElement('p');
                cidadeEl.appendChild(document.createTextNode(`${end.cidade}/${end.uf}`));

                let listItemEl = document.createElement('li');
                listItemEl.appendChild(cepEl);
                listItemEl.appendChild(logradouroEl);
                listItemEl.appendChild(bairroEl);
                listItemEl.appendChild(cidadeEl);

                this.listEl.appendChild(listItemEl);
            });
        }
    }
new App();
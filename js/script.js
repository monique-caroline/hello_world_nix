//alert("Seja bem vinde!")

//Alternando a imagem do banner ao clicar
let minhaImagem = document.querySelector('img');

minhaImagem.onclick = function() {
    let meuSrc = minhaImagem.getAttribute('src');
    if(meuSrc === 'img/banner1.png') {
      minhaImagem.setAttribute ('src','img/banner2.png');
    } else {
      minhaImagem.setAttribute ('src','img/banner1.png');
    }
}

//Exemplo 1 Javascript - Jogo adivinhe o número
        var numeroAleatorio= Math.floor(Math.random() * 100) + 1;

        var palpites = document.querySelector('.palpites');
        var ultimoResultado = document.querySelector('.ultimoResultado');
        var baixoOuAlto = document.querySelector('.baixoOuAlto');

        var envioPalpite = document.querySelector('.envioPalpite');
        var campoPalpite = document.querySelector('.campoPalpite');

        var contagemPalpites = 1;
        var botaoReinicio;

        campoPalpite.focus();

        function conferirPalpite() {
            var palpiteUsuario = Number(campoPalpite.value);
            if (contagemPalpites === 1) {
              palpites.textContent = 'Palpites anteriores: ';
            }
            palpites.textContent += palpiteUsuario + ' ';
          
            if (palpiteUsuario === numeroAleatorio) {
              ultimoResultado.textContent = 'Parabéns! Você acertou!';
              ultimoResultado.style.backgroundColor = 'green';
              baixoOuAlto.textContent = '';
              configFimDeJogo();
            } else if (contagemPalpites === 10) {
              ultimoResultado.textContent = '!!!FIM DE JOGO!!!';
              baixoOuAlto.textContent = '';
              configFimDeJogo();
            } else {
              ultimoResultado.textContent = 'Errado!';
              ultimoResultado.style.backgroundColor = 'red';
              if(palpiteUsuario < numeroAleatorio) {
                baixoOuAlto.textContent = 'Seu palpite está muito baixo!';
              } else if(palpiteUsuario > numeroAleatorio) {
                baixoOuAlto.textContent = 'Seu palpite está muito alto!';
              }
            }
          
            contagemPalpites++;
            campoPalpite.value = '';
            campoPalpite.focus();
          }

          envioPalpite.addEventListener('click', conferirPalpite);

          function configFimDeJogo() {
            campoPalpite.disabled = true;
            envioPalpite.disabled = true;
            botaoReinicio = document.createElement('button');
            botaoReinicio.textContent = 'Iniciar novo jogo';
            document.body.appendChild(botaoReinicio);
            botaoReinicio.addEventListener('click', reiniciarJogo);
          }

          function reiniciarJogo() {
            contagemPalpites = 1;
          
            var reiniciarParas = document.querySelectorAll('.resultadoParas p');
            for (var i = 0 ; i < reiniciarParas.length ; i++) {
              reiniciarParas[i].textContent = '';
            }
          
            botaoReinicio.parentNode.removeChild(botaoReinicio);
          
            campoPalpite.disabled = false;
            envioPalpite.disabled = false;
            campoPalpite.value = '';
            campoPalpite.focus();
          
            ultimoResultado.style.backgroundColor = 'white';
          
            numeroAleatorio = Math.floor(Math.random() * 100) + 1;
          }

//Exemplo 2 Javascript - Controle de despesas       
/*const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

          
const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = ({ amount, name, id })=> {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')
            
    li.classList.add(CSSClass)
    li.innerHTML = `
        ${name} 
        <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
        `
            transactionsUl.append(li)
          }

          const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
            .filter(value => value < 0)
            .reduce((accumulator, value) => accumulator + value, 0))
            .toFixed(2)

          const getIncome = transactionsAmounts => transactionsAmounts
            .filter(value => value > 0)
            .reduce((accumulator, value) => accumulator + value, 0)
            .toFixed(2)

          const getTotal = transactionsAmounts => transactionsAmounts
            .reduce((accumulator, transaction) => accumulator + transaction, 0)
            .toFixed(2)

          const updateBalanceValues = () => {
              const transactionsAmounts = transactions.map(({ amount }) => amount)
              const total = getTotal(transactionsAmounts)
              const income = getIncome(transactionsAmounts)
              const expense = getExpenses(transactionsAmounts)
            
            balanceDisplay.textContent = `R$ ${total}`
            incomeDisplay.textContent = `R$ ${income}`
            expenseDisplay.textContent = `R$ ${expense}`
          }

          const init = () => {
              transactionsUl.innerHTML = ''
              transactions.forEach(addTransactionIntoDOM)
              updateBalanceValues()
          }

          init()

          const updateLocalStorage = () => {
              localStorage.setItem('transactions', JSON.stringify(transactions))
          }

          const generateID = () => Math.round(Math.random() * 1000)

          const addTransactionsArray = (transactionName, transactionAmount) => {
            transactions.push({
              id: generateID(),
              name: transactionName,
              amount: Number(transactionAmount)
          })
        }
          
          const cleanInputs = () => {
            inputTransactionName.value = ''
            inputTransactionAmount.value = ''
          }

          const handleFormSubmit = event => {
            event.preventDefault() //Impedindo que o form seja enviado e a página seja recarrega

            //Criando duas const com os valores inseridos no input
            const transactionName = inputTransactionName.value.trim()
            const transactionAmount = inputTransactionAmount.value.trim()
            const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

            //Verificando se algum dos inputs não foi preenchido e exibindo uma mensagem na tela
            if(isSomeInputEmpty){
              alert('Por favor, todos os campos!')
              return  
            }

          addTransactionsArray(transactionName, transactionAmount)
          //Invocando a init para atualizar as transações na tela e atualiza o localStorage
          init()
          updateLocalStorage()

          //Invocar a clean inputs
          cleanInputs()
        }

          form.addEventListener('submit', handleFormSubmit)*/

//Exemplo de evento
/*document.querySelector('html').onclick = function() {
    alert('Ai! Pare de me cutucar!');
}*/

//Formulário Inferior
document.getElementById("botaoEnviar").addEventListener("click", validaFormulario)

function validaFormulario(){
    if(document.getElementById("nome").value != "" &&
      document.getElementById("email").value != "" &&
      document.getElementById("telefone").value != ""){

        alert("Tudo certo! Você receberá as novidades por email.")
      }else{
          alert("Por favor, preencha todos os campos!")
      }

//Exemplo de evento - corrigir
/*let meuBotao = document.querySelector('botaoUsuario');
let meuCabecalho = document.querySelector('h2');

function defineNomeUsuario() {
    let meuNome = prompt('Por favor, digite seu nome.');
    if(!meuNome || meuNome === null) {
      defineNomeUsuario();
    } else {
      localStorage.setItem('nome', meuNome);
      meuCabecalho.innerHTML = 'Bem vinde, ' + meuNome;
    }
  }

  if(!localStorage.getItem('nome')) {
    defineNomeUsuario();
  } else {
    let nomeGuardado = localStorage.getItem('nome');
    meuCabecalho.textContent = 'Programar é legal, ' + nomeGuardado;
  }

  meuBotao.onclick = function() { defineNomeUsuario();
  }
  
}*/
}
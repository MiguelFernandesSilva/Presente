'use strict'

document.addEventListener('DOMContentLoaded', () => {
    // MENU MOBILE
    const navToggle = document.getElementById('navToggle');
    const menu = document.getElementById('menu');

    if (navToggle && menu) {
        navToggle.addEventListener('click', () => {
            const aberto = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!aberto));
            menu.classList.toggle('is-open');
        });

        menu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('is-open');
            });
        });
    }

    // CARROSSEL
    const track = document.getElementById('carouselTrack');

    if (track) {
        const slides = Array.from(track.children);
        const dots = Array.from(document.querySelectorAll('.carousel-dot'));
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        const TEMPO_AUTOPLAY = 5000;
        let indiceAtual = 0;
        let autoplayId = null;

        function irParaSlide(indice) {
            indiceAtual = (indice + slides.length) % slides.length;
            track.style.transform = `translateX(-${indiceAtual * 100}%)`;

            dots.forEach((dot, i) => {
                const ativo = i === indiceAtual;
                dot.classList.toggle('is-active', ativo);
                dot.setAttribute('aria-selected', String(ativo));
            });
        }

        function iniciarAutoplay() {
            autoplayId = setInterval(() => {
                irParaSlide(indiceAtual + 1);
            }, TEMPO_AUTOPLAY);
        }

        function reiniciarAutoplay() {
            clearInterval(autoplayId);
            iniciarAutoplay();
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const indice = Number(dot.dataset.index);
                irParaSlide(indice);
                reiniciarAutoplay();
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                irParaSlide(indiceAtual - 1);
                reiniciarAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                irParaSlide(indiceAtual + 1);
                reiniciarAutoplay();
            });
        }

        irParaSlide(0);
        iniciarAutoplay();
    }

    // CALENDÁRIO DE MENSAGENS
    const calendarList = document.getElementById('calendarList');

    if (calendarList) {
        // remove a indentação repetida de cada linha de um texto multilinha
        function limparTexto(texto) {
            return texto
                .split('\n')
                .map(linha => linha.trim())
                .join('\n')
                .trim();
        }

        const mensagens = [
            {
                dia: 13,
                titulo: "Feliz",
                texto: limparTexto(
                    `
                        Olá minha mãe, nada mal com você? Nada mal comigo. Aqui é seu filho quem lhe dá a palavra, e seja bem-vinda, minha mãe,
                        ao seu site, ou melhor, seu presente! Antes de tudo, queria pedir desculpa porquê seu presente não é algo assim, concreto de
                        verdade, tipo um tênis, uma blusa ou algo assim. Eu ainda não tenho trabalho (mas vou conseguir um logo mais), portanto, não
                        tenho dinheiro. Dadas as devidas desculpas, vamos para as explicações! Nesse site aqui, a cada dia, um novo texto vai ser 
                        desbloqueado para você ler (tem como você burlar e ler tudo, mas eu não vou te ensinar como), e conforme os dias vão se
                        passando, algumas coisas novas vão sendo desbloqueadas, também, mas isso aí você vai vendo. O que hoje é seu aniversário, e 
                        o que é melhor pra comemorar do que ler o primeiro texto de presente? Mas antes, vamos começar uma oração bem simples.
                        Estenda suas mãos, mas não feche seus olhos, se não você não vai conseguir ler, e faça essa oração comigo (leia com a minha
                        voz): "Meu Pai que estás nos céus, hoje te entrego a vida da minha mãe. Te agradeço, pai, por mais um ano de vida completo,
                        por mais um ciclo que se encerra e por tudo que ela e eu vivemos nesse ano que se passou. Te peço também, Pai, pelos ciclos 
                        que se iniciam a partir desse novo ano. Minha mãe tem muito ainda pra viver de bom, Pai, e eu peço, Jesus, que nós possamos
                        ver o teu toque em cada uma das coisas que passará pela vida dela. Em nome de Jesus, amém! Devidamente feita nossa oração,
                        nosso assunto de hoje é algo bem complexo, mãe. Recentemente, a vida tem ficado bem amarga e cinza, e eu não tô falando isso
                        no meu caso, é na vida de todo mundo. Antigamente, o mundo realmente tinha mais cor, e agora ele é bem chocho e sem graça.
                        Acordar todos os dias já não tem a mesma graça. As risadas já não duram o mesmo tempo, e tudo é muito seletivo para o que
                        se é realmente engraçado e o que não é. Eu tenho reparado que, antigamente, pra ver um vídeo no Youtube, bastava eu abrir ele
                        e praticamente o primeiro vídeo que aparecia já me chamava atenção e era o suficiente pra me entreter. O mesmo valia pra
                        jogos. E hoje, eu paço mais tempo rolando a tela tentando escolher um vídeo ou jogo pra jogar do que fazendo isso em si. Não
                        por falta de atenção, mas sim de animo. As coisas já não dão a mesma energia, a mesma alegria, e tudo isso que davam antes.
                        Tudo no mundo agora é triste, o Sol é triste, o sorvete é triste, as paredes são tristes, elas até tem chorado esses dias.
                        E tudo isso ainda tem um agravante. Você sabe do que eu estou falando. O dia em que o meu mundo virou de cabeça pra baixo.
                        O dia em que nem aquilo que ainda era engraçado, me fazia rir. Depois que ela partiu, mãe, eu chorei. Chorei escondido de
                        você, porquê todo mundo dizia que você dependeria de mim, ainda que não naquele momento, pra continuar forte. O meu mundo
                        acabou, e até hoje, ele não voltou. E se o meu mundo acabou, imagine o seu. Eu nem consigo escrever isso. Mas, sabe o irônico?
                        Todos estavam surpreendentemente errados. Não era você que dependeria de mim pra se sustentar. Eu dependeria de você. E mesmo
                        sem saber, você me salvou, mãe, me salvou de um abismo muito maior que viria. Me salvou de tanta, mais tanta coisa, e me fez
                        voltar a sorrir. Eu gosto muito de muitos filmes, jogos, hobbies, mas nenhum deles era capaz de me fazer sorrir. Mas você me 
                        fez sorrir, minha mãe. Ver sua luta pra continuar a vida todos os dias me inspirou, e me fez querer continuar, me fez querer
                        sorrir também. Você, a pessoa que eu mais vi sofrer depois de tudo, foi a pessoa que eu mais vi e vejo felicidade. Eu sei que
                        você mesma não vê muita das vezes, minha mãe, mas eu vejo algo em você. Vejo uma alegria que se recusa a acabar. Vejo uma 
                        esperança que se recusa a morrer. Você é uma guerreira forte, muito forte, mais do que você acha. E sua força pra continuar a 
                        sorrir mesmo quando tudo dizia que não, isso foi o que mais me fez feliz.
                    `
                )
            },
            { 
                dia: 14, 
                titulo: "Dia de Agradecer", 
                texto: limparTexto(
                    `
                        Hoje é dia de agradecer, minha mãe. "Agradecer pelo quê?" você me pergunta, e eu te respondo: hoje é dia de te agradecer
                        por aquela vez que eu comprei uma cartinha pokémon com o dinheiro que eu ganhei da vó e fiquei com medo de contar, e você
                        descobriu, me deixou de castigo por um tempinho, e jogou vôlei comigo na garagem (mesmo que eu ainda fosse muito ruim naquela
                        época kkkkk). Agradecer por aquela vez no quarto ou quinto ano em que eu queria por que queria participar da coroação da
                        Virgem Maria, e você não deixou, mesmo que isso significasse que enquanto todos os meus amigos estavam lá na igreja se
                        divertindo, eu ficava na sala não fazendo nada. Te agradecer por um dia que, com 5 anos, eu sentei na mesinha
                        de café na cama enquanto assistia o desenho dos piratinhas doidos, ela quebrou, e você me bateu. Te agradecer por
                        aquele dia em que estavamos viajando pra São Sebastião, e nós fomos pro restaurante que tinha uma promoção pra crianças
                        menores de 5 anos, eu tinha uns 8, e não deixei você e o pai mentirem pro carinha do restaurante, fiz vocês pagarem o maior
                        mico, e no final vocês ficaram bravos comigo (sendo que quem me educou assim foi vocês kkkkkk). Te agradecer por cada vez que
                        você brigou comigo. Te agradecer por cada vez que, nem por um segundo, só no pensamento, você pensou "será que valeu a pena
                        ter filho?". Te agradecer por cada vez que você me frustrou, de certa forma. Isso porque hoje, nada disso me frustra mais.
                        Hoje eu entendo. Foi pro meu bem. Sabe aquela fala de mãe quando tá brigando e fala "isso dói mais em mim do que em você"?
                        Então, a maioria é mentira, mas você não mente quando diz isso. Eu olho pra trás e vejo que tudo que você me impediu de viver
                        antes, foi para que eu vivesse algo melhor hoje. No texto anterior falei que sou feliz porquê você me ajudou a construir quem
                        eu sou, e admito que grande parte disso provém do que está escrito aqui, dessas broncas, puxadas de orelha, chamadas de
                        atenção, etc. Ainda acho triste quando você não me deixa pular do penhasco com um pano de chão de paraquedas com meus amigos, 
                        mas é como uma árvore: você poda hoje, pra ela crescer o dobro amanhã. Mãe, eu te agradeço por ter feito tudo isso, mas
                        lamento te informar que não vou ser como a árvore podada. Cresci e vi com meus próprios olhos sua luta diária, e o quanto
                        você se esforça pra sorrir todos os dias. Cresci e vi você chegando cansada do trabalho querendo deitar, e eu fecho a porta e 
                        falo que só vou abrir quando você falar a senha. Desculpa mãe, se você me podou um dia esperando que eu crescesse o dobro,
                        eu não vou. Vou crescer o triplo, o quadruplo, o quintuplo, centenas, milhares, milhões de vezes mais, porquê todos dizem
                        o ditado "é agora que o filho chora e a mãe não vê". Eu vi o contrário. Eu sei que você chorou quando eu não vi. Eu sei que
                        você lutou quando eu não tinha forças. E isso me inspira, mãe. Eu vou vencer, nem que pra isso eu me machuque, caia, seja
                        atropelado de novo, e sei lá mais o que. Um dia você me botou de castigo porquê eu menti. Um dia você não me deixou participar
                        do evento com meus amigos. Um dia você me bateu porquê fui desobediente. Um dia você brigou comigo porquê fui educado (???).
                        Mas isso me ensinou. Você se honra da minha inteligência e sabedoria, mãe? Porque elas eu devo a você, e por isso, hoje é
                        dia de agradecer.
                    `
                ) 
            },
            { 
                dia: 15, 
                titulo: "Morro do Limão", 
                texto: limparTexto(
                    `
                        Oi minha mãe, nada mal com você? Nada mal comigo. Aqui quem te fala é o seu filho, aquele que tem muitos nomes. Uns me chamam
                        de Miguel, alguns de Fernandes, uns de Mega, outros de peixinho, mas isso não importa. Alguma vez, você já se perguntou quem
                        você era no mundo? Tipo, a pergunta parece fácil, eu sei. Quem eu sou? Sou fi de Rômulo e Queila que moram lá no Morro
                        do Limão, visse? (tendeu? Limão, lemans kkkk) Mas isso aí é uma resposta qalquer, mas quem eu sou de verdade? Será que quem aparece no espelho quando
                        eu olho sou eu mesmo? Será? São muitas perguntas. Sabe mãe, recentemente eu tenho refletido muito sobre a quantidade de jovens
                        que encontraram quem são, mas perderam sua identidade. Hoje, na rua, o que mais tem por aí é galera de 16, 14 anos, ou até
                        mesmo, bebendo, fumando, tendo filho, destruindo a própria vida, e não tem nem 20 anos. É só sair na rua pra ver. Será que
                        esse sou eu? Acho que não, eu não bebo, não fumo, não curto balada, meu negócio é ficar em casa em baixo do cobertor.
                        Vejo um monte de jovens que estão afundados em coisas que são tão profundas quanto um oceano. Sabe o que dizem, né? A
                        depressão é a doença do século, e a ansiedade tem pegado todo mundo hoje em dia. Será que esse sou eu? Hmmm, acho que não.
                        Ansiedade todo mundo tem um pouco, isso inclui a mim, mas acho que eu não fecho nesse perfil. Vejo poucos jovens por aí que
                        estudam em escolas dos sonhos, renomadas, porquê passaram em provas difíceis, e falam 5 idiomas fluentemente, representam o 
                        país em olimpíadas de conhecimento, e tudo mais que dá pra achar daora. Algum dia desses mesmo eu vi o perfil de um menino de
                        17 anos no Github que já sabia Java, SpringBoot, Docker, Kubernetes e um monte de coisa difícil que eu ainda nem comecei a
                        aprender (embora eu vou ter que aprender isso logo mais, se eu quiser me dar bem). Será que esse sou eu? Ah, sou eu sim, claro
                        que sou. Descobri quem eu sou, acabou o poema (nah kkkk). Embora eu quisesse muito, esse não sou eu (ainda). Mas então, quem
                        eu sou? Eu não vejo muitos jovens, nem a minoria que seja, na verdade eu vi um, uma vez, que não era rico, não era famoso,
                        sabia se virar, mas não era um gênio, e algumas coisas assim. Mas ele tinha o que mais valia. Nenhum cigarro consegue queimar
                        isso. Nenhuma bebida embebeda isso. A depressãoa disfarça, mas não pode acabar com isso. A ansiedade faz parecer que não
                        tem, mas ainda tem isso. Nenhuma nota no vestibular faz você ganhar isso, e nenhuma faculdade ensina a ter isso, nem Oxford,
                        nem Harvard, Cambridge, Stanford, nenhuma delas. Sabe o que é, mamãe? É você e seu amor. A gente brinca de eu te amo mais, mas
                        eu tenho que admitir, o tanto que você me ama cara, isso é brincadeira. Chega a ser bizarro. Eu não cheguei a ver o sacrifício
                        da cruz pessoalmente, mas acho que no mundo todo, seu amor é o que mais chega perto do amor que foi manifestado lá. Essa é
                        minha identidade, minha mãe. Eu sou filho amado, sou filho seu, e não me envergonho disso, nunca me envergonharei. Vou subir
                        numa montanha e gritar, enquanto um avião que eu contratei passa com uma faixa escrito isso atrás, lá no céu, e um monte de 
                        luzes apontam pra mim, que eu descobri quem eu sou. Tanto faz se sou Miguel, Fernandes, Mega, Peixinho, sla mais o que. Eu sou
                        amado, e não por qualquer um, sou amado por você. Essa é minha maior riqueza e meu maior troféu. Obrigado por me conceber isso.
                        Jesus, eu conheço. Paulo, eu sei quem é. Mas e você, quem é? Sou fi de Queila dque mora lá no Morro do Limão, visse? E
                        ninguém, ninguém mais tem esse privilégio. Eita como eu sou sortudo. (aí os bixo tudo sai repreendido, TERRA).
                    `
                )
            },
            { dia: 16, titulo: "Dia 4", texto: "" },
            { dia: 17, titulo: "Dia 5", texto: "" },
            { dia: 18, titulo: "Dia 6", texto: "" },
            { dia: 19, titulo: "Dia 7", texto: "" },
            { dia: 20, titulo: "Dia 8", texto: "" },
        ];

        const MES_CALENDARIO = 8;

        const panelDate = document.getElementById('panelDate');
        const panelTitle = document.getElementById('panelTitle');
        const panelText = document.getElementById('panelText');

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const dias = mensagens.map(item => {
            const data = new Date(hoje.getFullYear(), MES_CALENDARIO, item.dia);
            data.setHours(0, 0, 0, 0);
            return {
                ...item,
                data,
                desbloqueado: data <= hoje
            };
        });

        function formatarDataCompleta(data) {
            return data.toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: '2-digit',
                month: 'long'
            });
        }

        function mostrarMensagem(diaInfo, botao) {
            calendarList.querySelectorAll('.calendar-day').forEach(btn => {
                btn.classList.remove('is-active');
                btn.setAttribute('aria-selected', 'false');
            });

            botao.classList.add('is-active');
            botao.setAttribute('aria-selected', 'true');

            panelDate.textContent = formatarDataCompleta(diaInfo.data);
            panelTitle.textContent = diaInfo.titulo;
            panelText.textContent = diaInfo.texto;
        }

        let botaoParaSelecionarAoCarregar = null;

        dias.forEach(diaInfo => {
            const botao = document.createElement('button');
            botao.className = 'calendar-day';
            botao.type = 'button';
            botao.setAttribute('role', 'tab');
            botao.setAttribute('aria-selected', 'false');

            const weekday = diaInfo.data.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');

            if (diaInfo.desbloqueado) {
                botao.innerHTML = `
                    <span class="calendar-day-weekday">${weekday}</span>
                    <span class="calendar-day-number">${diaInfo.dia}</span>
                `;
                botao.setAttribute('aria-label', `Ver mensagem do dia ${diaInfo.dia} de setembro`);
                botao.addEventListener('click', () => mostrarMensagem(diaInfo, botao));
                botaoParaSelecionarAoCarregar = { diaInfo, botao }; // guarda o último dia desbloqueado
            } else {
                botao.innerHTML = `
                    <span class="calendar-day-weekday">${weekday}</span>
                    <span class="calendar-day-number">${diaInfo.dia}</span>
                    <span class="calendar-day-lock" aria-hidden="true">&#128274;</span>
                `;
                botao.disabled = true;
                botao.setAttribute('aria-label', `Mensagem do dia ${diaInfo.dia} ainda não disponível`);
            }

            calendarList.appendChild(botao);
        });

        if (botaoParaSelecionarAoCarregar) {
            mostrarMensagem(botaoParaSelecionarAoCarregar.diaInfo, botaoParaSelecionarAoCarregar.botao);
        }
    }

    // VALES
    document.querySelectorAll('.voucher-card').forEach(card => {
        const botao = card.querySelector('.voucher-card__button');
        const contador = card.querySelector('.voucher-card__count');

        if (!botao || !contador) return;

        function atualizarContador(restantes) {
            contador.dataset.count = String(restantes);
            contador.textContent = restantes === 1 ? '1 vale restante' : `${restantes} vales restantes`;

            const esgotado = restantes <= 0;
            card.classList.toggle('is-esgotado', esgotado);
            botao.disabled = esgotado;
            botao.textContent = esgotado ? 'Esgotado' : 'Usar vale';
        }

        atualizarContador(Number(contador.dataset.count));

        botao.addEventListener('click', () => {
            const restantes = Number(contador.dataset.count);
            if (restantes <= 0) return;
            atualizarContador(restantes - 1);
        });
    });

    // ANO DA FOOTER
    const anoEl = document.getElementById('ano');
    if (anoEl) anoEl.textContent = new Date().getFullYear();
});
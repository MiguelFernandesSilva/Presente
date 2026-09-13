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
                texto: limparTexto(`
                    Olá minha mãe, nada mal? Aqui é seu filho que tá falando.
                    Nesse site aqui, a cada dia, um novo texto vai ser
                    desbloqueado para você ler, e o de hoje fala sobre como
                    eu sou feliz por ter você como mãe. Eu ando refletindo
                    muito sobre os jovens da minha idade e sobre como muitos
                    deles infelizmente já estão desperdiçando a própria vida
                    por conta de muitas coisas, como vícios, bebidas, drogas
                    e muito mais coisa (é sério, se você soubesse como as
                    outras pessoas da minha idade são, você ia me condecorar
                    santo) e isso me faz pensar tipo "nossa, eu só não sou
                    assim por conta da minha mãe", e de verdade, eu sou muito
                    feliz por isso, por você ter me criado do jeito que criou,
                    por não ter me deixado ser mais qualquer um como qualquer
                    outro. Geralmente quando se lê um texto assim de
                    felicidade se espera um "ah, sou feliz por ter você" e
                    claro que eu sou feliz por isso e por outras 500 coisas,
                    mas aqui eu não estou para falar o óbvio e o genérico,
                    vou tentar (tentar) ir um pouco além disso. Então sobre
                    hoje, acho que é isso, tenho muito a agradecer a você,
                    pois graças a você, posso dizer que sou quem eu sou, e
                    isso me faz muito muito muito FELIZ.
                `)
            },
            { dia: 14, titulo: "Dia 2", texto: "" },
            { dia: 15, titulo: "Dia 3", texto: "" },
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
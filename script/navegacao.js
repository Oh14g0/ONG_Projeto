import { configurarCadastro } from "./cadastro.js";


// ==============================
// CARREGAMENTO DAS PÁGINAS
// ==============================

export function carregarPagina(
    rota,
    conteudo,
    criarProjetos,
    fecharMenu
) {

    // ==========================
    // PROJETOS COM TEMPLATE
    // ==========================

    if (rota === "projetos") {

        conteudo.innerHTML = `
            <h2>Projetos</h2>
            ${criarProjetos()}
        `;

        fecharMenu();

        return;
    }


    // ==========================
    // OUTRAS PÁGINAS
    // ==========================

    const arquivo =
        rota === "inicio"
            ? "index.html"
            : rota + ".html";


    fetch(arquivo)

        .then(function (resposta) {

            if (!resposta.ok) {

                throw new Error(
                    "Não foi possível carregar a página."
                );
            }

            return resposta.text();
        })

        .then(function (html) {

            // Cria um documento temporário

            const documento =
                new DOMParser().parseFromString(
                    html,
                    "text/html"
                );


            // Pega somente o <main>

            const novoConteudo =
                documento.querySelector("main");


            if (novoConteudo) {

                // Atualiza o conteúdo do <main>

                conteudo.innerHTML =
                    novoConteudo.innerHTML;


                // Fecha o menu hamburger

                fecharMenu();


                // Reativa o formulário

                configurarCadastro();
            }
        })

        .catch(function (erro) {

            console.error(
                "Erro ao carregar a página:",
                erro
            );
        });
}


// ==============================
// CONFIGURAÇÃO DA NAVEGAÇÃO
// ==============================

export function configurarNavegacao(
    conteudo,
    criarProjetos,
    fecharMenu
) {

    // ==========================
    // LINKS DO MENU
    // ==========================

    document.querySelectorAll("nav a").forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();


            const pagina = link
                .getAttribute("href")
                .replace(".html", "");


            const rota =
                pagina === "index"
                    ? "inicio"
                    : pagina;


            // Atualiza a URL da SPA

            history.pushState(
                { pagina: rota },
                "",
                "#" + rota
            );


            carregarPagina(
                rota,
                conteudo,
                criarProjetos,
                fecharMenu
            );

        });

    });


    // ==========================
    // VOLTAR / AVANÇAR
    // ==========================

    window.addEventListener(
        "popstate",
        function (event) {

            const rota =
                event.state?.pagina || "inicio";


            carregarPagina(
                rota,
                conteudo,
                criarProjetos,
                fecharMenu
            );

        }
    );
}
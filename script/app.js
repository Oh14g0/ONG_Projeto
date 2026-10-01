import { configurarNavegacao } from "./navegacao.js";
import { configurarCadastro } from "./cadastro.js";

document.addEventListener("DOMContentLoaded", function () {

    const conteudo = document.querySelector("main");

    // ==============================
    // DADOS DOS PROJETOS
    // ==============================

    const projetos = [
        {
            titulo: "Projeto Educação",
            descricao:
                "Ações voltadas para educação e desenvolvimento de jovens."
        },

        {
            titulo: "Projeto Comunidade",
            descricao:
                "Iniciativas para apoiar famílias e melhorar a comunidade."
        }
    ];


    // ==============================
    // SISTEMA DE TEMPLATE
    // ==============================

    function criarProjetos() {

        return projetos.map(function (projeto) {

            return `
                <section>
                    <h3>${projeto.titulo}</h3>
                    <p>${projeto.descricao}</p>
                </section>
            `;

        }).join("");
    }


    // ==============================
    // MENU HAMBURGER
    // ==============================

    function fecharMenu() {

        const menuToggle =
            document.querySelector("#menu-toggle");

        if (menuToggle) {
            menuToggle.checked = false;
        }
    }


    // ==============================
    // CONFIGURAÇÃO INICIAL
    // ==============================

    configurarNavegacao(
        conteudo,
        criarProjetos,
        fecharMenu
    );

    configurarCadastro();

});
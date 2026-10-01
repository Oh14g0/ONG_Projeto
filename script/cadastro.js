// ==============================
// BOTÃO DE CADASTRO
// ==============================

export function configurarCadastro() {

    const formulario =
        document.querySelector("form");

    const mensagem =
        document.querySelector(".cadastro-mensagem");


    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // ==========================
            // LIMPA ERROS ANTERIORES
            // ==========================

            const campos =
                formulario.querySelectorAll("input");

            campos.forEach(function (campo) {

                campo.classList.remove(
                    "campo-invalido"
                );

            });


            // ==========================
            // CAMPOS
            // ==========================

            const nome =
                formulario.querySelector("#nome");

            const email =
                formulario.querySelector("#email");

            const cpf =
                formulario.querySelector("#cpf");

            const telefone =
                formulario.querySelector("#telefone");

            const cep =
                formulario.querySelector("#cep");


            // ==========================
            // VALIDAÇÕES
            // ==========================

            const cpfValido =
                /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
                    .test(cpf.value.trim());


            const telefoneValido =
                /^(\(\d{2}\)\s?|\d{2}\s?)\d{4,5}-?\d{4}$/
                    .test(telefone.value.trim());


            const cepValido =
                /^\d{5}-?\d{3}$/
                    .test(cep.value.trim());


            const emailValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email.value.trim());


            // ==========================
            // CAMPOS INVÁLIDOS
            // ==========================

            const camposInvalidos = [];


            if (!nome.value.trim()) {
                camposInvalidos.push(nome);
            }


            if (!emailValido) {
                camposInvalidos.push(email);
            }


            if (!cpfValido) {
                camposInvalidos.push(cpf);
            }


            if (!telefoneValido) {
                camposInvalidos.push(telefone);
            }


            if (!cepValido) {
                camposInvalidos.push(cep);
            }


            // ==========================
            // EXIBE ERROS
            // ==========================

            if (camposInvalidos.length > 0) {

                camposInvalidos.forEach(
                    function (campo) {

                        campo.classList.add(
                            "campo-invalido"
                        );

                    }
                );


                if (mensagem) {

                    mensagem.textContent =
                        "Não foi possível cadastrar. Verifique os campos preenchidos.";

                    mensagem.className =
                        "cadastro-mensagem mensagem-erro";
                }


                return;
            }


            // ==========================
            // SUCESSO
            // ==========================

            if (mensagem) {

                mensagem.textContent =
                    "Cadastro realizado com sucesso!";

                mensagem.className =
                    "cadastro-mensagem mensagem-sucesso";
            }

        }
    );
}
import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

const RegexService = {
    //Verifica se a string tem mais de uma palavra
    singleWord: function (text: string) {
        text = text.trimEnd();

        if (!(text.trim().length > 0)) {
            return true;
        }

        if (text.split(" ").length <= 1) {
            return true;
        } else {
            return false;
        }
    },

    isDate: function (dateToTest: string) {
        return !isNaN(Date.parse(this.convertDate(dateToTest)));
    },

    birthdateValidade: function (dateTotest: string) {
        if (this.isDate(dateTotest)) {
            const now = new Date();
            const birthdate = new Date(this.convertDate(dateTotest));

            const daysDiff = Math.ceil(
                Math.abs(now.getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24)
            );
            const years = Math.floor(daysDiff / 365.25);

            return years >= 18 && years < 120 ? true : false;
        } else {
            false;
        }
    },

    //Verifica dígitos numéricos
    countNumbers: function (text: any) {
        var numb = text.match(/\d/g);
        numb = numb.join("");
        const total = numb.length;
        return total;
    },

    getWordPosition: function (text: string, position: number) {
        const value = String(text).split(".")[position];
        return value;
    },

    getWordPrice: function (text: string) {
        const value = String(text).split(".")[1];

        if (value) {
            return "," + value;
        } else {
            return ",00";
        }
    },

    validationCPF: function (cpf: string) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]+/g, "");

        // Verifica se o CPF tem 11 dígitos
        if (cpf.length !== 11) return false;

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) return false;

        // Função para calcular o dígito verificador
        function calcularDigito(cpf: string, pesoInicial: any) {
            let soma = 0;
            for (let i = 0; i < cpf.length; i++) {
                soma += parseInt(cpf[i]) * pesoInicial--;
            }
            let resto = (soma * 10) % 11;
            return resto === 10 || resto === 11 ? 0 : resto;
        }

        // Calcula os dois dígitos verificadores
        const digito1 = calcularDigito(cpf.substring(0, 9), 10);
        const digito2 = calcularDigito(cpf.substring(0, 9) + digito1, 11);

        // Verifica se os dígitos calculados são iguais aos dígitos informados
        return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);
    },

    changeDot: function (text: string) {
        // Função para substituir ponto por vírgula

        const final = text.split(".").join(",");

        return final;
    },

    validateCPF: function (cpf: string) {
        cpf = cpf.replace(/[^\d]+/g, ""); // Remove todos os caracteres não numéricos

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false; // Verifica se o CPF tem 11 dígitos e não é uma sequência de números iguais
        }

        let soma = 0;
        let resto;

        // Validação do primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        soma = 0;
        // Validação do segundo dígito verificador
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    },

    validateCNPJ: function (cnpj: string) {
        cnpj = cnpj.replace(/[^\d]+/g, ""); // Remove todos os caracteres não numéricos

        if (cnpj.length !== 14) {
            return false; // Verifica se o CNPJ tem 14 dígitos
        }

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cnpj)) {
            return false;
        }

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(1))) {
            return false;
        }

        return true;
    },

    replaceCpfCnpj: function (valor: string) {
        valor = valor.replace(/\D/g, ""); // Remove qualquer coisa que não seja número

        if (valor.length === 11) {
            // Formatar como CPF
            return valor
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (valor.length === 14) {
            // Formatar como CNPJ
            return valor
                .replace(/^(\d{2})(\d)/, "$1.$2")
                .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d)/, ".$1/$2")
                .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
        } else {
            return valor; // Retorna o valor original se não for CPF nem CNPJ
        }
    },

    regexSpaces: function (text: string) {
        return text.replace(/ /g, "+");
    },

    //Verifica se o e-email está no formato correto
    validationEmail: function (email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    //Verifica se o e-email está no formato correto
    validationCEP: function (cep: string) {
        // Remove todos os caracteres que não são números
        const cepNumeros = cep.replace(/\D/g, "");
        // Verifica se o CEP tem exatamente 8 dígitos
        return cepNumeros.length >= 8;
    },

    convertDate: function (date: string) {
        var partesData = date.split("/");
        var ano = partesData[2];
        var mes = partesData[1];
        var dia = partesData[0];

        // Formatando a data no formato "DD/MM/YYYY"
        var final = ano + "-" + mes + "-" + dia;
        return final;
    },
};

export default RegexService;

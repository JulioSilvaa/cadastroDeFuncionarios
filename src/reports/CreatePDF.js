import moment from "moment/moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function createPDF(employee) {
  moment.locale("br");

  const reportTitle = [
    {
      text: employee.firstname + " " + employee.lastname,
      image: employee.image[0],
      fontSize: 25,
      bold: true,
      italics: true,
      margin: [20, 20, 0, 30], //left, top, right, bottom
    },
  ];

  const reportBody = {
    content: [
      {
        text: "Descrição:",
        bold: true,
        fontSize: 16,
        margin: [0, 20, 0, 8],
        italics: true,
      },
      `${employee.description} `,
      {
        text: "Dados pessoais",
        bold: true,
        fontSize: 16,
        margin: [0, 20, 0, 8],
        italics: true,
      },
      `Telefone: ${employee.telephone} `,
      `Endereço: ${employee.address}`,
      `Email: ${employee.email} `,
      `Nacionalidade: ${employee.nationality} `,
      `Data de nascimento: ${moment(employee.birthdate).format("DD-MM-YYYY")} `,
      {
        text: "Função e setor onde trabalha:",
        bold: true,
        fontSize: 16,
        margin: [0, 20, 0, 8],
        italics: true,
      },
      `Tabralha como : ${employee.job} no setor de ${employee.sector}`,
      `Salário atual: R$ ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(employee.wage)}`,
      {
        text: "Status do contrato:",
        bold: true,
        fontSize: 16,
        margin: [0, 20, 0, 8],
        italics: true,
      },
      `Início do contrato: ${moment(employee.startOfContract).format(
        "DD-MM-YYYY"
      )} `,
      `Fim do contrato: ${
        employee.endOfContract
          ? moment(employee.endOfContract).format("DD-MM-YYYY")
          : "ATIVO"
      } `,

      {
        text: "Contrato foi adicionado por:",
        bold: true,
        fontSize: 16,
        margin: [0, 20, 0, 8],
        italics: true,
      },
      `Usuário: ${employee.createdBy} `,
    ],
  };

  function reportFooter(currentPage, pageCount) {
    return [
      {
        text: currentPage + "/" + pageCount,
        alignment: "right",
        fontSize: 10,
        margin: [0, 10, 20, 0],
      },
    ];
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [20, 50, 15, 40],
    header: [reportTitle],
    content: reportBody.content,
    footer: reportFooter,
  };

  pdfMake.createPdf(docDefinitions).open();
}

export default createPDF;

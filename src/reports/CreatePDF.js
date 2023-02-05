import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function createPDF(employee) {
  console.log(employee);
  const reportTitle = [
    {
      text: employee.firstname + " " + employee.lastname,
      fontSize: 20,
      bold: true,
      margin: [20, 20, 0, 4], //left, top, right, bottom
    },
  ];

  const reportBody = [
    {
      text: "Descrição",
      fontSize: 20,
      bold: true,
      margin: [20, 20, 0, 45], //left, top, right, bottom
    },
    { text: employee.description },
  ];

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
    content: [reportBody],
    footer: reportFooter,
  };

  pdfMake.createPdf(docDefinitions).open();
}

export default createPDF;

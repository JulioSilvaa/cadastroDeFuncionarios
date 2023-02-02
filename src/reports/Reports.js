import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vsf = pdfFonts.pdfMake.vsf;

function reportPDF(employee) {
  const reportTitle = [
    {
      text: "employee.firstName",
      fontSize: 20,

      margin: [15, 20, 0, 45],
    },
  ];
  const reportBody = [];

  function reportFooter(currentPage, pageCount) {
    return [
      {
        text: currentPage + "/" + pageCount,
        alignment: "rigth",
        fontSize: 9,
        margin: [0, 10, 20, 0],
      },
    ];
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [reportBody],
    footer: reportFooter,
  };

  pdfMake.createPdf(docDefinitions).download();
}

export default reportPDF;

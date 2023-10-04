import html2pdf from 'html2pdf.js';
const methods = {
  htmlToPdfPrint: location => {
    html2pdf()
      .set({
        margin: [15, 0, 15, 0],
        filename: navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1 ? 'print.pdf' : 'print',
        pagebreak: { mode: 'avoid-all' },
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          useCORS: true,
          scrollY: 0,
          scale: 1,
          dpi: 300,
          letterRendering: true,
          allowTaint: false, //useCORS를 true로 설정 시 반드시 allowTaint를 false처리 해주어야함
        },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      })
      .from(location)
      .toPdf()
      .get('pdf')
      .then(function (pdfObj) {
        pdfObj.autoPrint();
        window.open(pdfObj.output('bloburl'));
      });
  },
};

export default {
  install(Vue) {
    Vue.prototype.$htmlToPdfPrint = methods.htmlToPdfPrint;
  },
};
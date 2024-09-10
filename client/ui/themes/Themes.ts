import { Theme } from "./types/Theme";

export const ThemeDefault: Theme = {
  color: "default",
  logo: "logo-default",
  data: {
    title: "Online PDF Converter",
    subheader: "Easily convert to and from PDF in seconds.",
    howTo: {
      title: "How to Convert Files to and from PDF Free",
      steps: {
        1: "Select the Word, Excel, PowerPoint, PDF or other file you wish to convert.",
        2: "Our free PDF creator will convert your document to PDF or from PDF in seconds.",
        3: "Your new document will be ready to download immediately. After the download is complete, any remaining files uploaded will be purged from our server.",
      },
    },
  },
};

export const ThemeExcel: Theme = {
  color: "excel",
  logo: "logo-excel",
  data: {
    title: "Excel to PDF Converter",
    subheader:
      "Convert your Excel spreadsheet to a portable PDF file in seconds.",
    howTo: {
      title: "How to Convert Excel to PDF Free",
      steps: {
        1: "Choose the XLS or XLSX file you want to convert from your computer.",
        2: "Our free Excel to PDF converter will properly format your Excel spreadsheet into a PDF file.",
        3: "After a few moments, your PDF download will be ready. After conversion is complete, all remaining files will be deleted from our online servers.",
      },
    },
  },
};

export const ThemeJPG: Theme = {
  color: "jpg",
  logo: "logo-jpg",
  data: {
    title: "JPG to PDF Converter",
    subheader:
      "Reformat a JPG, PNG, or other image to a PDF file in a few seconds.",
    howTo: {
      title: "How to Convert JPGs to PDF Free",
      steps: {
        1: "Select the JPGs you want to change to PDF, then add the images to our JPG to PDF converter for conversion.",
        2: "Our online JPG to PDF converter turns your images into multiple PDFs or a single merged PDF in seconds.",
        3: "Download your converted PDF files and save them to your computer. After converting your images to PDFs, all remaining files will be deleted from our servers.",
      },
    },
  },
};

export const ThemeOpenOffice: Theme = {
  color: "openoffice",
  logo: "logo-openoffice",
  data: {
    title: "Convert OpenOffice files to PDF",
    subheader:
      "Convert OpenOffice Writer, Calc, Impress, Draw and Math files to PDF online and free.",
    howTo: {
      title: "How to convert ODT to PDF online",
      steps: {
        1: "Select Open Office document to convert online.",
        2: "Wait a few seconds until the converter finishes its job.",
        3: "Download your newly converted PDF file for free.",
      },
    },
  },
};

export const ThemePPT: Theme = {
  color: "ppt",
  logo: "logo-ppt",
  data: {
    title: "PPT to PDF Converter",
    subheader: "Turn your PPT or PPTX files into a PDF document instantly.",
    howTo: {
      title: "How to Convert PPT to PDF Free",
      steps: {
        1: "Select your PowerPoint from your computer.",
        2: "Our online PPT to PDF converter will turn your PPT or PPTX into a PDF in seconds.",
        3: "Download your new PDF and save it to your computer. When the conversion is done, your PPT, PPTX, and PDF files will be automatically deleted.",
      },
    },
  },
};

export const ThemeWord: Theme = {
  color: "word",
  logo: "logo-word",
  data: {
    title: "Word to PDF Converter",
    subheader:
      "Turn your Word document into an easy-to-share PDF in an instant.",
    howTo: {
      title: "How to Convert a Word Document to PDF",
      steps: {
        1: "Select the Word document you need to convert.",
        2: "Our free Word to PDF converter will copy the formatting and text from your Word document and turn it into a PDF.",
        3: "The PDF will be ready to download in an instant. Any remaining copies of submitted files are deleted from our server, ensuring your data remains secure.",
      },
    },
  },
};

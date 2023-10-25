/**
   * Preloader Remove
   */
const RemovePreloader = () => {
    // let preloader = document.getElementById('#preloader');
    // if (preloader) {
    //     window.addEventListener('load', () => {
    //         preloader.remove();
    //     });
    // }
    
}
RemovePreloader();

//         // Function to convert text to speech
//         function textToSpeech(text) {
//             const utterance = new SpeechSynthesisUtterance(text);
//             speechSynthesis.speak(utterance);
//         }

//         // Function to handle PDF file input
//         document.getElementById('convertBtn').addEventListener('click', async function () {
//             const pdfInput = document.getElementById('pdfInput');
//             const selectedFile = pdfInput.files[0];

//             if (selectedFile) {
//                 const fileReader = new FileReader();
//                 fileReader.onload = async function (event) {
//                     const pdfData = new Uint8Array(event.target.result);
//                     const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

//                     let pdfText = '';

//                     for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//                         const page = await pdf.getPage(pageNum);
//                         const pageText = await page.getTextContent();
//                         pageText.items.forEach(item => {
//                             pdfText += item.str + ' ';
//                         });
//                     }

//                     textToSpeech(pdfText);
//                 };

//                 fileReader.readAsArrayBuffer(selectedFile);
//             }
//         });



/**
   * Function to convert text to speech
   */
function textToSpeech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}
// Function to handle PDF file input
document.getElementById('convertBtn').addEventListener('click', async function () {
    const pdfInput = document.getElementById('pdfInput');
    const selectedFile = pdfInput.files[0];

    if (selectedFile) {
        const fileReader = new FileReader();
        fileReader.onload = async function (event) {
            const pdfData = new Uint8Array(event.target.result);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

            let pdfText = '';

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const pageText = await page.getTextContent();
                pageText.items.forEach(item => {
                    pdfText += item.str + ' ';
                });
            }

            textToSpeech(pdfText);
        };

        fileReader.readAsArrayBuffer(selectedFile);
    }
});




// preview of pdf file
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('pdfInput');
const preview = document.getElementById('preview');

// Prevent the default behavior for drag-and-drop
dropArea.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dropArea.style.border = '2px dashed #007bff';
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.border = '2px dashed #ccc';
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.border = '2px dashed #ccc';

    const file = e.dataTransfer.files[0];
    handleFile(file);
});

// Handle file input change event
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleFile(file);
});

function handleFile(file) {
    if (file && file.type === 'application/pdf') {
        const pdfURL = URL.createObjectURL(file);

        // Display the PDF using an <iframe> element
        preview.style.display = 'block';
        preview.src = pdfURL;
    } else {
        // Reset the preview if the selected file is not a PDF
        preview.style.display = 'none';
        alert('Please select a valid PDF file.');
    }
}



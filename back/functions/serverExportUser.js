const xl = require('excel4node');
const fs = require('fs').promises;
const path = require('path');
const masterPath = require('../config/config');

module.exports = async function expExcel(dados, res, hrnow, teste1) {
    const wb = new xl.Workbook();
    //const ws = wb.addWorksheet('usuarios');

    let sheetIndex = 1; // Contador de abas
    let ws = wb.addWorksheet(`Sheet${sheetIndex}`); // Criando a primeira aba

    const headingColumnNames = [
        "codUsuario", "codTipoPessoa", "descCPFCNPJ", "descNome", "descEmail", "senha",
         "codTipoUsuario",  "codUf", "codCidade", "dtCadastro",  "ativo"
    ];

    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
        ws.cell(1, headingColumnIndex++).string(heading);
    });

    let rowIndex = 2;
    dados.forEach((record, index) => {

     /*    if ((index + 1) % 5000 === 0) {
            sheetIndex++;
            ws = wb.addWorksheet(`Sheet${sheetIndex}`); // Cria uma nova aba
            rowIndex = 2; // Reseta a contagem de linhas para a nova aba
        } */


        let columnIndex = 1;
        Object.keys(record).forEach(columnName => {
            let value = record[columnName];

            if(record[columnName] == 1) {
                value = 'Ativo';
            } else if(record[columnName] == 2) {
                value = 'MASTER';
            } else if(record[columnName] == 3) {
                value = 'ANUNCIANTE';
            } else if(record[columnName] == 4) {
                value = 'PREFEITURA';
            }

            if(columnIndex == 10) {
                const date = new Date(value);
                const formattedDate = date.toISOString().split('T')[0];
                console.log(formattedDate)
                value = formattedDate;
            }
    
            
            if (value === null || value === undefined) {
                ws.cell(rowIndex, columnIndex++).string("0");
            } else if (typeof value === "string") {
                ws.cell(rowIndex, columnIndex++).string(value);
            } else if (typeof value === "number") {
                ws.cell(rowIndex, columnIndex++).number(value);
            } else {
                ws.cell(rowIndex, columnIndex++).string(value.toString());
            }
        });
        rowIndex++;
    });

    console.log("Gerando", teste1);

    const directoryPath = path.join(__dirname, `../public/export`);

    try {
        // Lê os arquivos existentes no diretório
        const files = await fs.readdir(directoryPath);
        console.log("Arquivos encontrados:", files);

        // Exclui o primeiro arquivo da lista, se existir
        if (files.length > 0) {
            const filePathToDelete = path.join(directoryPath, files[0]);
            await fs.unlink(filePathToDelete);
            console.log("Arquivo apagado:", filePathToDelete);
        }
    } catch (err) {
        console.error("Erro ao manipular arquivos:", err);
        return res.status(500).json({ success: false, message: "Erro ao processar a exportação." });
    }

    // Escreve o novo arquivo Excel
    const newFilePath = path.join(__dirname, `../public/export/arquivo.xlsx`);
    wb.write(newFilePath, function(err, stats) {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Erro ao gerar o arquivo." });
        } else {
            console.log("Arquivo gerado:", stats);
            return res.json({ success: true, message: "Exportação Finalizada", downloadUrl: `${masterPath.url}/export/arquivo.xlsx` });
        }
    });
}

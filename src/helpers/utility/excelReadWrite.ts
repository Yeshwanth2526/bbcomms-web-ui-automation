const writeXlsxFile = require('write-excel-file/node')
const readXlsxFile = require('read-excel-file/node')
class excelReadWrite  {
    data = [
    // Row #1
    [
      // Column #1
      {
        value: 'test',
        type: String,
      }
    ]
  ]
  async excelWrite() {
      console.log("write data",this.data)
    await writeXlsxFile(this.data, {
        
        filePath: 'data/Book1.xlsx'
  });
  }

  async excelRead() {
    await readXlsxFile('data/Book1.xlsx').then((1),{
     
      })
      console.log("read data",await readXlsxFile('data/Book1.xlsx').then((1),{
       
      }))
}
}
export default new excelReadWrite();
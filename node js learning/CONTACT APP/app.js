// const {Tulispertayaan, simpanContacts} = require('./contacts')
const contact = require('./contacts')



const main = async () => {
    const nama = await contact.Tulispertayaan("Masukan Nama Anda : ")
    const email = await contact.Tulispertayaan("Masukan Email Anda :")
    const umur = await contact.Tulispertayaan("Masukan Umur Anda : ")
   

    contact.simpanContacts(nama,email, umur)
}



main()


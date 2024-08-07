



const fs = require('fs')
const { resolve } = require('path')
const { argv } = require('process')
const chalk = require('chalk')
const validtor = require('validator')



const directory = './data'
if(!fs.existsSync(directory)){
    fs.mkdirSync(directory)
}


// membuat file contact.json jika belum ada
const dataPath = './data/contact.json'
if(!fs.existsSync(dataPath))[
    fs.writeFileSync(dataPath, '[]', 'utf-8')
]


const loadContact = () => {
    const file = fs.readFileSync('./data/contact.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
}

const simpanContacts = (nama,email,noHp) => {
    const contact = {nama,email, noHp}    
    const contacts = loadContact()
    // cek duplikat nama
    const duplikat = contacts.find((contact) => contact.nama === nama)
        if(duplikat){
        console.log(chalk.red.bold("Nama Sudah ada yang sama"))
        
        return false
    }

    if(email){
        if(!validtor.isEmail(email)){
            console.log(chalk.yellow.bold("email tidak valid"))
            return false
        }
    }

    if(!validtor.isMobilePhone(noHp, 'id-ID')){
        console.log(chalk.red.bold("Nomor HP tidak valid"))
        return false
    }


   

    // cek email

        
    contacts.push(contact)
    fs.writeFileSync('./data/contact.json', JSON.stringify(contacts, null, 2))
    console.log(chalk.green.bold("Nama Berhasil Tersimpan"))
        
}


const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.cyan.inverse("Daftar Nama Kontak"))
    contacts.forEach((contact, i) => {
        console.log(`${i + 1} . ${contact.nama} - ${contact.noHp}`)
    });
}


const detailContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if(!contact){
        console.log(chalk.red.inverse(`${nama} tidak ditemukan`))
        return false
    }
    
    console.log(chalk.cyan.inverse(contact.nama))
    if(contact.email){
        console.log(chalk.cyan.inverse(contact.email))
    }
    console.log(chalk.cyan.inverse(contact.noHp))
    
}


const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())
    console.log(newContacts)
    if(contacts.length === newContacts){
        console.log(chalk.red.inverse(`${nama} tidak ditemukan`))
        return false
    }
    fs.writeFileSync('./data/contact.json', JSON.stringify(newContacts, null, 2))
    console.log(chalk.green.bold(`data contact ${nama} berhasil dihapus`))
}

module.exports = {simpanContacts, listContact, detailContact, deleteContact}


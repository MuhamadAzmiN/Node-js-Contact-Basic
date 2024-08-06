



const fs = require('fs')
const { resolve } = require('path')

const readline = require('readline')
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
    
    
})

const directory = './data'
if(!fs.existsSync(directory)){
    fs.mkdirSync(directory)
}


// membuat file contact.json jika belum ada
const dataPath = './data/contact.json'
if(!fs.existsSync(dataPath))[
    fs.writeFileSync(dataPath, '[]', 'utf-8')
]

const Tulispertayaan = (pertayaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertayaan , (nama) => {
            resolve(nama)
        })
    })
}

const simpanContacts = (nama,email,umur) => {
    const contact = {nama,email, umur}    
    const file = fs.readFileSync('./data/contact.json', 'utf-8')
    const contacts = JSON.parse(file)
    contacts.push(contact)
    fs.writeFileSync('./data/contact.json', JSON.stringify(contacts, null, 2))
        
    rl.close()


}

module.exports = {Tulispertayaan, simpanContacts}



const yargs = require('yargs')
const contact = require('./contacts')

yargs.command({
    command: 'add',
    describe : "Menambahkan Kontak baru",
    builder : {
        nama: {
            describe : "Nama Lengkap",
            demandOption : true,
            type : 'string'
        },
        email : {
            describe : 'Email',
            demandOption : true,
            type : 'string'
        },
        noHp: {
            describe: "Masukan Umur anda ",
            demandCommand : true,
            type : 'string'
        }
    },

    handler(argv){
       contact.simpanContacts(argv.nama, argv.email, argv.noHp)

        
    }
}).demandCommand();

// menampilkan semua daftar kontak dengan nomor handphone
yargs.command({
    command: 'list',
    describe : "Menampilkan semua nama dan no hp",
    handler() {
        contact.listContact();
    }
})

yargs.command({
    command: 'detail',
    describe : "Menampilkan detail kontak berdasarkan nama",
    builder : {
        nama: {
            describe : "Nama Lengkap",
            demandOption : true,
            type : 'string'
        },
    },
    handler(argv) {
        contact.detailContact(argv.nama);
    },
    
})


yargs.command({
    command: 'delete',
    describe : "Menghapus Contact Berdasarkan nama",
    builder : {
        nama: {
            describe : "Nama Lengkap",
            demandOption : true,
            type : 'string'
        },
    },
    handler(argv) {
        contact.deleteContact(argv.nama);
    },
    
})




yargs.parse()



import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// import { reactI18nextModule } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
// import {  } from "react-i18next";

// import translationEN from './assets/locales/en/translation.json';
// import translationID from './assets/locales/id/translation.json';
// import translationID from '../public/locales/id/translation.json';

// const resources = {
//   en: {
//     translation: translationEN
//   },
//   id: {
//     translation: translationID
//   }
// };

// i18n
// .use(LanguageDetector)
// // .use(reactI18nextModule) // passes i18n down to react-i18next
// .init({
//   resources,
//   fallbackLng: "en", // use en if detected lng is not available

//   keySeparator: false, // we do not use keys in form messages.welcome

//   interpolation: {
//     escapeValue: false // react already safes from xss
//   },
//   useSuspense: true,
// });

i18n
.use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          landing: {
            working:{
              museum:{
                part1:"Select Museum",
                part2:"Select Museum First"
              },
              kategori:{
                part1:"Select Category",
                part2:"Select Category First"
              },
              tanggal:"Select Date",
              pesan:'Booking Ticket'
            },
            judul: 'Ticket Reservation',
            panduan: {
              judul:'Ticket Reservation Guide',
              desc: 'Ticket reservation instructions can be seen here'
            },
            faq:'Collection of Frequently Asked Questions',
            harga:{
              judul:'Price List Ticket',
              desc:'Information on museum ticket reservation prices can be read here'
            },
            about:{
              part1:'Solo is one of the cities frequently visited by tourists. Tourist attractions in Solo are also very diverse. One of the tourist attractions in Solo is the Museum. There are many museums in Solo because Solo is also an area that has a rich history',
              part2:'Solo is one of the cities frequently visited by tourists. Tourist attractions in Solo are also very diverse. One of the tourist attractions in Solo is the Museum. There are many museums in Solo because Solo is also an area that has a rich history',
            },
            footer:'Museum Ticket Reservation aims to make it easier for visitors to order tickets online',
            // :'',
          },
          about:{
            desc:'Describe the UPT Museum Surakarta',
            isi:{
              part1:'Solo is one of the cities frequently visited by tourists. Tourist attractions in Solo are also very diverse. One of the tourist attractions in Solo is the Museum. There are many museums in Solo because Solo is also an area that has a rich history.',
              part2:'The Keris Nusantara Museum and Radya Pustaka are museums managed by the Solo government. Both have their own charm.',
              part3:'The Keris Nusantara Museum is a museum built by the Directorate General of Culture, Ministry of Education and Culture through the Directorate of Preservation of Cultural Heritage and Museums since 2013 and was inaugurated by the President of the Republic of Indonesia, Joko Widodo on August 9.',
              part4:'Radya Pustaka Museum, the Oldest Museum in Indonesia. Founded by Kanjeng Raden Adipati Sosrodiningrat IV on October 18, 1890, this is the oldest museum in Indonesia.',
            },
          },
          panduan: {
            judul:'Reservation Museum Guide',
            desc:'Procedure for ordering tickets online at the UPT Museum.'
          },
          faq:{
            desc:'Find your question'
          },
          harga:{
            judul:'Price List Ticket Museum',
            desc:'List of ticket prices of each available Museum. The price could changes every time  .',
            biasa:"Weekday",
            libur:"Weekend"
          },
          formInput:{
            desc:{
              isi: 'The UPT Museum manages the Keris Nusantara Museum and the Radya Pustaka Museum as tourist destinations for people around and outside the city. The Keris Nusantara Museum and the Radya Pustaka Museum have their own charms. Visitors will be presented with the beauty of cultural heritage as well as learn about history.',
              tggl: 'Visit Date',
              biasa: 'Weekend Prices',
              libur: 'Weekday Prices',
            },
            input:{
              nama:'Name',
              kota:'Home Town',
              no:'Phone Number',
              jumlah:'Number of People',
            },
            syarat:{
              judul:'Visitor Terms and Conditions',
              part1:'1. It is forbidden to bring food and drink while inside the Keris Museum,',
              part2:'2. It is forbidden to hold property in the Keris Museum,',
              part3:'3. Do not litter',
              checkbox:'I agree with the Terms and Conditions',
            },
            tombol:'Next to Payment'
          },
          pembayaran:{
            judul:'Payment',
            identitas:{
              judul:'Visitor Identity',
              nama:'Name',
              no:'Phone Number',
              kota:'Home town',
            },
            metode:{
              judul:'Choose a Payment Method',
              cash:'Cash',
              pilih:'Payment',
            },
            detail:{
              judul:'Order Detail',
              museum:'Order Ticket on',
              tgl:'Order Date',
              kategori:'Category',
              jumlah:'Qty'
            },
            total:{
              judul:'Total Payment',
              total:'',
            },
            tombol:'Next'
          }
        }
      },
      id: {
        translation: {
          landing: {
            working:{
              museum:{
                part1:"Pilih Museum",
                part2:"Pilih Museum Dulu"
              },
              kategori:{
                part1:"Pilih Kategori",
                part2:"Pilih Kategori Dulu"
              },
              tanggal:"Pilih Tanggal",
              pesan:'Pesan Tiket'
            },
            judul: 'Reservasi Tiket',
            panduan: {
              judul:'Panduan Reservasi Tiket',
              desc: 'Petunjuk reservasi tiket dapat dilihat disini'
            },
            faq:'Kumpulan Pertanyaan yang sering dipertanyakan',
            harga:{
              judul:'Harga Tiket',
              desc:'Kumpulan Info harga reservasi tiket museum dapat dibaca disini'
            },
            about:{
              part1:'Solo merupakan salah satu kota yang sering dikunjungi oleh para wisatawan. Tempat wisata yang ada di Solo juga sangat beragam. Salah satu tempat wisata yang ada di Solo yaitu Museum. Banyak museum yang terdapat di Solo karena Solo juga merupakan daerah yang memiliki sejarah yang melimpah ',
              part2:'Solo merupakan salah satu kota yang sering dikunjungi oleh para wisatawan. Tempat wisata yang ada di Solo juga sangat beragam. Salah satu tempat wisata yang ada di Solo yaitu Museum. Banyak museum yang terdapat di Solo karena Solo juga merupakan daerah yang memiliki sejarah yang melimpah ',
            },
            footer:'Reservasi Tiket Museum bertujuan untuk memudahkan para pengunjung dalam memesan tiket secara online',
            // :'',
            // :'',
          },
          about:{
            desc:'Mendeskripsikan mengenai UPT Museum Surakarta',
            isi:{
              part1:'Solo merupakan salah satu kota yang sering dikunjungi oleh para wisatawan. Tempat wisata yang ada di Solo juga sangat beragam. Salah satu tempat wisata yang ada di Solo yaitu Museum. Banyak museum yang terdapat di Solo karena Solo juga merupakan daerah yang memiliki sejarah yang melimpah.',
              part2:'Museum Keris Nusantara dan Radya Pustaka merupakan museum yang dikelola oleh pemerintah Solo. Keduanya memiliki daya tarik sendiri.',
              part3:'Museum Keris Nusantara merupakan sebuah museum yang dibangun oleh Di rektorat Jenderal Kebudayaan, Kementerian Pendidikan dan Kebudayaan melalui Direktorat Pelestarian Cagar Budaya dan Permuseuman sejak 2013 lalu diresmikan oleh Presiden Republik Indonesia, Joko Widodo pada tanggal 9 Agustus.',
              part4:'Museum Radya Pustaka, Museum Tertua di Indonesia. Didirikan oleh Kanjeng Raden Adipati Sosrodiningrat IV pada 18 Oktober 1890 ini merupakan museum tertua yang ada di Indonesia.',
            },
          },
          panduan: {
            judul:'Panduan Reservasi Museum',
            desc:'Tata cara untuk memesa tiket online di UPT Museum  .'
          },
          faq:{
            desc:'Cari Pertanyaan Anda'
          },
          harga:{
            judul:'Harga Tiket Museum',
            desc:'Daftar harga tiket dari setiap Museum yang tersedia. Harga dapat berubah sewaktu-waktu.',
            biasa:"Hari Biasa",
            libur:"Hari Libur"
          },
          formInput:{
            desc:{
              isi: 'UPT Museum mengelola Museum Keris Nusantara dan Museum Radya Pustaka sebagai destinasi wisata bagi masyarakat sekitar dan luar kota. Museum Keris Nusantara dan Museum Radya Pustaka memiliki daya tarik masing-masing. Pengunjung akan disuguhkan oleh keindahan  peninggalan budaya sekaligus belajar mengenai sejarah.',
              tggl: 'Tanggal Kunjungan',
              biasa: 'Harga Hari Biasa',
              libur: 'Harga Hari Libur',
            },
            input:{
              nama:'Nama',
              kota:'Asal Kota',
              no:'Nomor Handpone',
              jumlah:'Jumlah Orang',
            },
            syarat:{
              judul:'Syarat dan Ketentuan Pengunjung',
              part1:'1. Dilarang membawa makan dan minuman selama didalam Museum Keris',
              part2:'2. Dilarang memegang  Properti didalam Museum Keris',
              part3:'3. Dilarang membuang sampah sembarangan',
              checkbox:'Saya setuju dengan Syarat dan Ketentuan',
            },
            tombol:'Lanjut Pembayaran'
          },
          pembayaran:{
            judul:'Pembayaran',
            identitas:{
              judul:'Identitas Diri',
              nama:'Nama',
              no:'Nomor Hp',
              kota:'Asal Kota',
            },
            metode:{
              judul:'Pilih Metode Pembayaran',
              cash:'Tunai',
              pilih:'Pembayaran',
            },
            detail:{
              judul:'Detail Pesanan',
              museum:'Pesanan Tiket Pada',
              tgl:'Tanggal Pemesanan',
              kategori:'Kategori',
              jumlah:'Jumlah Tiket'
            },
            total:{
              judul:'Total Pembayaran',
              total:'',
            },
            tombol:'Selanjutnya'
          }
        }
      }
    }
  });

export default i18n;

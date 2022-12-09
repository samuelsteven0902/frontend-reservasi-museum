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
          logo:"en",
          navbar:'Reservation Information ',
          navbar_lg:'Language',
          landing: {
            judul:'TICKET RESERVATION',
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
              part1:'UPT Museum is an agency under the supervision of the Surakarta City Culture and Tourism Office. The UPT Museum was established to protect cultural heritage, especially in the city of Solo where there are abundant relics',
              part2:'VISION OF UPT MUSEUM SURAKARTA Realization of a global historical and cultural tourist destination. MISSION OF UPT MUSEUM SURAKARTA To make the museum a competitive place of education, source of knowledge and recreation. Maintain Cultural Heritage Objects and Buildings. Preserving and publicizing the rich collection of cultural heritage to the domestic and foreign communities.',
            },
            footer:'Museum Ticket Reservation aims to make it easier for visitors to order tickets online',
            // :'',
          },
          about:{
            desc:'Describe the UPT Museum Surakarta',
            isi:{
              part1:'UPT Museum is an agency under the supervision of the Surakarta City Culture and Tourism Office. The UPT Museum was established to protect cultural heritage, especially in the city of Solo where there are abundant relics',
              part2:'VISION OF UPT MUSEUM SURAKARTA Realization of a global historical and cultural tourist destination. MISSION OF UPT MUSEUM SURAKARTA To make the museum a competitive place of education, source of knowledge and recreation. Maintain Cultural Heritage Objects and Buildings. Preserving and publicizing the rich collection of cultural heritage to the domestic and foreign communities.',
              part3:'The Keris Nusantara Museum and Radya Pustaka are museums managed by the Solo government. Both have their own charm.',
              part4:'The Keris Nusantara Museum is a museum built by the Directorate General of Culture, Ministry of Education and Culture through the Directorate of Preservation of Cultural Heritage and Museums since 2013. It was inaugurated on Tuesday Wage, 15 Maulud Dal 1890, 9 August 2017 at the initiative of the 16th Mayor of Solo, Mr. H. Ir. Joko Widodo. The Keris Museum stands above the Sriwedari Cultural Park area. At the inauguration, the Keris Museum was officially under UPT Museum Surakarta.',
              part5:'The keris as a world cultural heritage was recognized by UNESCO on November 25, 2005 in Paris, France. Through this recognition, the keris gains recognition in the eyes of the world as a masterpiece that has high philosophical value and shows cultural excellence.',
              part6:'Museum Radya Pustaka, Museum Tertua di Indonesia. Didirikan oleh Kanjeng Raden Adipati Sosrodiningrat IV pada 18 Oktober 1890 ini merupakan museum tertua yang ada di Indonesia.',
              part7:'The Radya Pustaka Museum stands on the Main Street area of ​​Surakarta City, precisely on Jalan Slamet Riyadi, which is the first and oldest museum in Indonesia. The museum is the pride of the people of Surakarta which has its own uniqueness compared to other old museums, namely with a collection of various ancient objects, ranging from stone statues, bronze statues, daily necessities from ancient kings, gifts from emperors or kings. from other nations and ancient fiber books by poets of the ancient Kingdom which were stored neatly in the royal library and are also still much sought after by students, students, humanists and intellectuals today to look for data and for the sake of Literature, especially related to Literature Java.',
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
            desc1:'List of ticket prices of each available Museum. The price could changes every time  .',
            desc2:'Perda Number 5 of 2016 about RETRIBUSI DAERAH TIKET MASUK MUSEUM KERIS NUSANTARA KOTA SURAKARTA.',
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
          logo:"id",
          navbar:'Informasi Reservasi',
          navbar_lg:'Bahasa',
          landing: {
            judul:'RESERVASI TIKET',
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
              part1:'UPT Museum adalah Dinas yang berada dalam pengawasan Dinas Kebudayaan dan Pariwisata Kota Surakarta. UPT Museum berdiri untuk menjaga cagar budaya yang terlebih di dalam kota solo terdapat peninggalan yang sangat melimpah.',
              part2:'VISI UPT MUSEUM SURAKARTA Terwujudnya destinasi wisata sejarah dan budaya yang mendunia. MISI UPT MUSEUM SURAKARTA Mewujudkan museum menjadi tempat edukasi, sumber pengetahuan dan rekreasi yang kompetitif. Memelihara Benda dan Bangunan Cagar Budaya. Melestarikan dan mempublikasikan kekayaan koleksi warisan budaya kepada masyarakat domestik maupun mancanegara.',
            },
            footer:'Reservasi Tiket Museum bertujuan untuk memudahkan para pengunjung dalam memesan tiket secara online',
            // :'',
            // :'',
          },
          about:{
            desc:'Mendeskripsikan mengenai UPT Museum Surakarta',
            isi:{
              part1:'UPT Museum adalah Dinas yang berada dalam pengawasan Dinas Kebudayaan dan Pariwisata Kota Surakarta. UPT Museum berdiri untuk menjaga cagar budaya yang terlebih di dalam kota solo terdapat peninggalan yang sangat melimpah.',
              part2:'VISI UPT MUSEUM SURAKARTA Terwujudnya destinasi wisata sejarah dan budaya yang mendunia. MISI UPT MUSEUM SURAKARTA Mewujudkan museum menjadi tempat edukasi, sumber pengetahuan dan rekreasi yang kompetitif. Memelihara Benda dan Bangunan Cagar Budaya. Melestarikan dan mempublikasikan kekayaan koleksi warisan budaya kepada masyarakat domestik maupun mancanegara.',
              part3:'Museum Keris Nusantara dan Radya Pustaka merupakan museum yang dikelola oleh pemerintah Solo. Keduanya memiliki daya tarik sendiri.',
              part4:'Museum Keris Nusantara merupakan sebuah museum yang dibangun oleh Direktorat Jenderal Kebudayaan, Kementerian Pendidikan dan Kebudayaan melalui Direktorat Pelestarian Cagar Budaya dan Permuseuman sejak 2013 lalu. Diresmikan pada hari Selasa Wage, 15 Maulud Dal 1890, 9 Agustus 2017 atas prakarsa Walikota Solo yang Ke – 16 Bapak H. Ir. Joko Widodo. Museum Keris ini berdiri di atas kawasan Taman Budaya Sriwedari. Pada peresmian itu pula secara resmi Museum Keris berada di bawah UPT Museum Surakarta.',
              part5:'Keris sebagai warisan budaya dunia mulai diakui oleh UNESCO pada tanggal 25 November 2005 di Paris, Perancis. Melalui pengakuan ini, keris mendapatkan pengakuan di mata dunia sebagai karya agung yang memiliki nilai filosofis tinggi, dan menunjukkan keunggulan budaya.',
              part6:'Museum Radya Pustaka, Museum Tertua di Indonesia. Didirikan oleh Kanjeng Raden Adipati Sosrodiningrat IV pada 18 Oktober 1890 ini merupakan museum tertua yang ada di Indonesia.',
              part7:'Museum Radya Pustaka berdiri di daerah Jalan Utama Kota Surakarta tepatnya adalah Jalan Slamet Riyadi, yang mana merupakan Museum pertama dan tertua di Indonesia. Museum tersebut merupakan Museum kebanggaan masyarakat kota Surakarta yang mana memiliki keunikan tersendiri dibanding Museum-Museum Tua lainnya yakni dengan Koleksi benda Kunonya yang beragam dari mulai Arca Batu, Arca Perunggu, benda keperluan sehari hari dari Raja zaman dahulu, hadiah-hadiah dari Kaisar atau Raja dari bangsa lain dan Buku-Buku serat kuno karya Pujangga Kerajaan zaman dahulu yang tersimpan rapi di perpustakaan kerajaan dan juga masih banyak dicari oleh para mahasiswa, pelajar, budayawan serta para Intelektual saat ini untuk mencari data-data dan untuk kepentingan Sastra terutama berkaitan dengan Sastra Jawa.',
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
            desc1:'Daftar harga tiket dari setiap Museum yang tersedia. Harga dapat berubah sewaktu-waktu.',
            desc2:'Perda No.5 Tahun 2016 Tentang RETRIBUSI DAERAH TIKET MASUK MUSEUM KERIS NUSANTARA KOTA SURAKARTA',
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

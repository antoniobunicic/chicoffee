// Pravne stranice za webshop (HR/EN).
//
// ⚠️  Tekstove — posebno Opće uvjete i Privatnost — prije objave neka pregleda
// odvjetnik ili knjigovođa. Ovo su usklađeni predlošci, ne pravni savjet.
// Podaci o dostavi (cijena/rok) su standardne vrijednosti — potvrditi s klijentom.

// Zajednički podaci o trgovcu (obrt) — mijenjaj samo ovdje.
export const COMPANY = {
  name: 'Obrt CHI COFFEE, obrt za ugostiteljstvo i usluge, vl. Josip Mijatović',
  owner: 'Josip Mijatović',
  address: 'Budislavićeva 3A, 21220 Trogir, Hrvatska',
  oib: '52587700243',
  vat: 'HR52587700243',
  email: 'chi_coffee@yahoo.com',
  phone: '097 6695344',
}

// Redoslijed i slugovi — koristi ih i router i footer.
export const LEGAL_PAGES = [
  { key: 'uvjeti', slug: '/uvjeti-koristenja' },
  { key: 'dostava', slug: '/dostava-i-povrat' },
  { key: 'privatnost', slug: '/privatnost-i-kolacici' },
  { key: 'impressum', slug: '/impressum' },
]

const ODR_URL = 'https://ec.europa.eu/consumers/odr'
const AZOP_URL = 'https://azop.hr'

export const legal = {
  hr: {
    updatedLabel: 'Zadnje ažurirano',
    updatedDate: '06.07.2026.',

    uvjeti: {
      title: 'Opći uvjeti poslovanja',
      intro:
        'Ovim uvjetima uređuje se prodaja proizvoda putem CHI Coffee webshopa te prava i obveze kupca i prodavatelja. Kupnjom potvrđujete da ste ih pročitali i da ih prihvaćate.',
      sections: [
        {
          heading: '1. Prodavatelj',
          body: [
            `Prodavatelj je ${COMPANY.name}, ${COMPANY.address}, OIB: ${COMPANY.oib}. Kontakt: ${COMPANY.email}, ${COMPANY.phone}. Potpuni podaci nalaze se na stranici Impressum.`,
          ],
        },
        {
          heading: '2. Proizvodi i cijene',
          body: [
            'Cijene su izražene u eurima (EUR), uključuju PDV i vrijede u trenutku narudžbe. Fotografije su ilustrativne. Zadržavamo pravo promjene cijena, no promjena ne utječe na već potvrđene narudžbe.',
          ],
        },
        {
          heading: '3. Narudžba i sklapanje ugovora',
          body: [
            'Ugovor je sklopljen kada zaprimite potvrdu narudžbe e-mailom. Molimo unesite točne podatke za dostavu. Zadržavamo pravo otkazati narudžbu u slučaju očite pogreške u cijeni ili nedostupnosti proizvoda, uz povrat uplaćenog iznosa.',
          ],
        },
        {
          heading: '4. Plaćanje i dostava',
          body: [
            'Plaćanje se obavlja na način prikazan pri narudžbi (npr. kartično ili bankovnim transferom). Uvjeti, rokovi i troškovi dostave opisani su na stranici Dostava i povrat.',
          ],
        },
        {
          heading: '5. Raskid, povrat i reklamacije',
          body: [
            'Ako ste potrošač, imate pravo na jednostrani raskid ugovora u roku od 14 dana te pravo na reklamaciju zbog materijalnog nedostatka. Uvjeti, iznimke i obrazac opisani su na stranici Dostava i povrat.',
          ],
        },
        {
          heading: '6. Privatnost',
          body: [
            'Osobne podatke obrađujemo u skladu s GDPR-om. Detalji su na stranici Privatnost i kolačići.',
          ],
        },
        {
          heading: '7. Rješavanje sporova',
          body: [
            `Prigovore rješavamo sporazumno; pisani prigovor možete poslati na ${COMPANY.email}. Spor možete pokrenuti i putem EU platforme za online rješavanje sporova (ODR): ${ODR_URL}. Za ostale sporove nadležan je sud u Republici Hrvatskoj, uz primjenu hrvatskog prava.`,
          ],
        },
      ],
    },

    dostava: {
      title: 'Dostava i povrat',
      intro:
        'Uvjeti dostave te pravo potrošača na jednostrani raskid ugovora (povrat u 14 dana) i postupak reklamacije zbog materijalnog nedostatka.',
      sections: [
        {
          heading: '1. Područje i način dostave',
          body: [
            'Dostavljamo na području Republike Hrvatske i u ostale zemlje Europske unije putem dostavne službe (kurira).',
          ],
        },
        {
          heading: '2. Troškovi i rok',
          body: ['Trošak dostave prikazuje se u košarici prije potvrde narudžbe.'],
          list: [
            'Hrvatska — standardna dostava: 4,90 EUR; besplatna dostava za narudžbe iznad 50 EUR.',
            'Ostale zemlje EU — trošak dostave ovisi o odredištu i prikazuje se u košarici.',
            'Narudžbe obrađujemo u roku od 1–2 radna dana; dostava traje 1–3 radna dana za Hrvatsku, odnosno 3–7 radnih dana za ostatak EU.',
          ],
        },
        {
          heading: '3. Preuzimanje pošiljke',
          body: [
            `Pri preuzimanju provjerite je li pošiljka oštećena u transportu i vidljiva oštećenja odmah prijavite dostavljaču i nama na ${COMPANY.email}.`,
          ],
        },
        {
          heading: '4. Pravo na jednostrani raskid (14 dana)',
          body: [
            `Kao potrošač možete raskinuti ugovor u roku od 14 dana od primitka robe, bez navođenja razloga. O odluci nas obavijestite prije isteka roka e-mailom na ${COMPANY.email} ili poštom na ${COMPANY.address} (možete koristiti obrazac niže).`,
          ],
        },
        {
          heading: '5. Iznimke od prava na raskid',
          body: ['Pravo na raskid ne primjenjuje se, među ostalim, na:'],
          list: [
            'lako pokvarljivu robu i hranu (npr. peciva);',
            'zapečaćene proizvode otvorene nakon dostave, kad povrat nije prikladan iz higijenskih razloga (npr. otvorena kava);',
            'robu izrađenu po vašim specifikacijama.',
          ],
        },
        {
          heading: '6. Povrat robe i novca',
          body: [
            'Robu vratite najkasnije 14 dana od obavijesti o raskidu; izravni trošak povrata snosi kupac (osim ako je proizvod neispravan). Uplaćeni iznos (uključujući osnovnu dostavu) vraćamo najkasnije 14 dana od primitka obavijesti, istim sredstvom plaćanja. Povrat možemo zadržati dok ne primimo robu ili dokaz o slanju.',
          ],
        },
        {
          heading: '7. Reklamacije (materijalni nedostatak)',
          body: [
            `Odgovaramo za materijalne nedostatke sukladno zakonu. Pisani prigovor pošaljite na ${COMPANY.email} ili na ${COMPANY.address}, uz broj narudžbe i opis nedostatka; odgovorit ćemo u roku od 15 dana.`,
          ],
        },
        {
          heading: '8. Obrazac za jednostrani raskid',
          body: [
            `Prema — ${COMPANY.name}, ${COMPANY.address}, ${COMPANY.email}:`,
            'Ja _______________ izjavljujem da raskidam ugovor o kupnji sljedeće robe: _______________, naručene _______________, primljene _______________.',
            'Ime i prezime: _______________\nAdresa: _______________\nDatum: _______________\nPotpis (ako se obrazac dostavlja na papiru): _______________',
          ],
        },
      ],
    },

    privatnost: {
      title: 'Privatnost i kolačići',
      intro:
        'Objašnjava koje osobne podatke prikupljamo, u koje svrhe i koja su vaša prava prema GDPR-u te kako koristimo kolačiće.',
      sections: [
        {
          heading: '1. Voditelj obrade',
          body: [
            `Voditelj obrade je ${COMPANY.name}, ${COMPANY.address}, OIB: ${COMPANY.oib}. Kontakt: ${COMPANY.email}.`,
          ],
        },
        {
          heading: '2. Koje podatke i zašto',
          body: [
            'Prikupljamo podatke koje unesete pri narudžbi (ime, adresa, e-mail, telefon) te podatke o narudžbi. Plaćanje obrađuje ovlašteni pružatelj usluge naplate; ne pohranjujemo cjelovite podatke o kartici. Podatke obrađujemo radi:',
          ],
          list: [
            'izvršenja ugovora — obrade i isporuke narudžbe (čl. 6(1)(b) GDPR-a);',
            'zakonskih obveza — računovodstvo i porez (čl. 6(1)(c));',
            'legitimnog interesa — sigurnost i odgovaranje na upite (čl. 6(1)(f));',
            'privole — newsletter/marketing, koju možete povući u svakom trenutku (čl. 6(1)(a)).',
          ],
        },
        {
          heading: '3. Primatelji i čuvanje',
          body: [
            'Podatke dijelimo samo u nužnoj mjeri s izvršiteljima obrade (dostava, naplata, hosting, računovodstvo), koji su obvezani na povjerljivost. Čuvamo ih onoliko koliko je potrebno za svrhu i zakonske rokove (npr. računi prema poreznim propisima), a podatke po privoli do njezina povlačenja.',
          ],
        },
        {
          heading: '4. Vaša prava',
          body: [
            `Imate pravo na pristup, ispravak, brisanje, ograničenje i prenosivost podataka te na prigovor i povlačenje privole. Zahtjev pošaljite na ${COMPANY.email}.`,
          ],
        },
        {
          heading: '5. Nadzorno tijelo',
          body: [
            `Pritužbu možete podnijeti Agenciji za zaštitu osobnih podataka (AZOP), ${AZOP_URL}, no rado ćemo prvo pokušati riješiti vaš upit izravno.`,
          ],
        },
        {
          heading: '6. Kolačići',
          body: [
            'Naša stranica koristi isključivo nužnu, funkcionalnu pohranu potrebnu za osnovni rad stranice (npr. pamćenje odabranog jezika i vašeg izbora privole). Ti podaci ostaju na vašem uređaju.',
            'Ne koristimo analitičke ni marketinške kolačiće niti alate za praćenje (npr. Google Analytics, Meta Pixel) i ne prikupljamo podatke o vašem ponašanju u svrhu oglašavanja.',
          ],
        },
        {
          heading: '7. Kolačići pri plaćanju (Shopify)',
          body: [
            'Kupnja i plaćanje odvijaju se na Shopifyjevoj stranici za naplatu (checkout), gdje Shopify može postaviti vlastite kolačiće nužne za obradu narudžbe i sigurnost plaćanja. Njima upravlja Shopify u skladu sa svojom politikom kolačića.',
          ],
        },
        {
          heading: '8. Upravljanje kolačićima',
          body: [
            'Kolačiće i lokalnu pohranu možete u svakom trenutku izbrisati ili blokirati putem postavki svog preglednika. Napomena: onemogućavanje funkcionalne pohrane može utjecati na rad stranice (npr. pamćenje jezika).',
          ],
        },
      ],
    },

    impressum: {
      title: 'Impressum',
      intro: 'Podaci o pružatelju usluge sukladno Zakonu o elektroničkoj trgovini.',
      sections: [
        {
          heading: 'Podaci o obrtu',
          list: [
            `Naziv: ${COMPANY.name}`,
            `Sjedište: ${COMPANY.address}`,
            `Vlasnik: ${COMPANY.owner}`,
            `OIB: ${COMPANY.oib}`,
            `PDV ID: ${COMPANY.vat}`,
            'Obrt je upisan u Obrtni registar Republike Hrvatske.',
          ],
        },
        {
          heading: 'Kontakt',
          list: [`E-mail: ${COMPANY.email}`, `Telefon: ${COMPANY.phone}`],
        },
      ],
    },
  },

  en: {
    updatedLabel: 'Last updated',
    updatedDate: 'July 6, 2026',

    uvjeti: {
      title: 'Terms & Conditions',
      intro:
        'These terms govern the sale of products through the CHI Coffee webshop and the rights and obligations of the customer and seller. By purchasing, you confirm you have read and accept them.',
      sections: [
        {
          heading: '1. Seller',
          body: [
            `The seller is ${COMPANY.name}, ${COMPANY.address}, OIB: ${COMPANY.oib}. Contact: ${COMPANY.email}, ${COMPANY.phone}. Full details are on the Legal notice page.`,
          ],
        },
        {
          heading: '2. Products and prices',
          body: [
            'Prices are shown in euros (EUR), include VAT and apply at the time of ordering. Photographs are illustrative. We may change prices, but changes do not affect confirmed orders.',
          ],
        },
        {
          heading: '3. Order and contract',
          body: [
            'The contract is concluded when you receive an order confirmation by e-mail. Please enter accurate delivery details. We may cancel an order in case of an obvious pricing error or unavailability, with a refund of any amount paid.',
          ],
        },
        {
          heading: '4. Payment and delivery',
          body: [
            'Payment is made as shown at checkout (e.g. card or bank transfer). Delivery terms, timeframes and costs are on the Delivery & returns page.',
          ],
        },
        {
          heading: '5. Withdrawal, returns and complaints',
          body: [
            'If you are a consumer, you have the right to withdraw within 14 days and to complain about a defect. Conditions, exceptions and the form are on the Delivery & returns page.',
          ],
        },
        {
          heading: '6. Privacy',
          body: ['We process personal data in line with the GDPR. See the Privacy & cookies page.'],
        },
        {
          heading: '7. Dispute resolution',
          body: [
            `We resolve complaints amicably; send written complaints to ${COMPANY.email}. You may also use the EU Online Dispute Resolution (ODR) platform: ${ODR_URL}. Otherwise, the competent court in Croatia has jurisdiction, under Croatian law.`,
          ],
        },
      ],
    },

    dostava: {
      title: 'Delivery & returns',
      intro:
        'Delivery terms, the consumer’s right of withdrawal (14-day return) and the complaint procedure for defects.',
      sections: [
        {
          heading: '1. Area and method',
          body: [
            'We deliver within Croatia and to other European Union countries via a courier service.',
          ],
        },
        {
          heading: '2. Costs and timeframe',
          body: ['The delivery cost is shown in the cart before you confirm your order.'],
          list: [
            'Croatia — standard delivery: EUR 4.90; free delivery for orders over EUR 50.',
            'Other EU countries — the delivery cost depends on the destination and is shown in the cart.',
            'Orders are processed within 1–2 business days; delivery takes 1–3 business days for Croatia and 3–7 business days for the rest of the EU.',
          ],
        },
        {
          heading: '3. Receiving your parcel',
          body: [
            `On receipt, check whether the parcel was damaged in transit and report visible damage to the courier and to us at ${COMPANY.email} immediately.`,
          ],
        },
        {
          heading: '4. Right of withdrawal (14 days)',
          body: [
            `As a consumer, you may withdraw within 14 days of receiving the goods, without giving a reason. Notify us before the deadline by e-mail at ${COMPANY.email} or by post to ${COMPANY.address} (you may use the form below).`,
          ],
        },
        {
          heading: '5. Exceptions',
          body: ['The right of withdrawal does not apply, among others, to:'],
          list: [
            'perishable goods and food (e.g. pastries);',
            'sealed goods unsealed after delivery where return is unsuitable for hygiene reasons (e.g. opened coffee);',
            'goods made to your specifications.',
          ],
        },
        {
          heading: '6. Returning goods and refund',
          body: [
            'Return the goods no later than 14 days after notifying us; the direct cost of return is borne by the customer (unless the product is defective). We refund the amount paid (including basic delivery) within 14 days of receiving your notice, using the same payment method. We may withhold the refund until we receive the goods or proof of dispatch.',
          ],
        },
        {
          heading: '7. Complaints (defects)',
          body: [
            `We are liable for defects under the law. Send a written complaint to ${COMPANY.email} or ${COMPANY.address} with your order number and a description of the defect; we will respond within 15 days.`,
          ],
        },
        {
          heading: '8. Withdrawal form',
          body: [
            `To — ${COMPANY.name}, ${COMPANY.address}, ${COMPANY.email}:`,
            'I _______________ hereby withdraw from the contract of sale of the following goods: _______________, ordered on _______________, received on _______________.',
            'Name: _______________\nAddress: _______________\nDate: _______________\nSignature (only if submitted on paper): _______________',
          ],
        },
      ],
    },

    privatnost: {
      title: 'Privacy & cookies',
      intro:
        'Explains what personal data we collect, for what purposes, your rights under the GDPR, and how we use cookies.',
      sections: [
        {
          heading: '1. Data controller',
          body: [
            `The data controller is ${COMPANY.name}, ${COMPANY.address}, OIB: ${COMPANY.oib}. Contact: ${COMPANY.email}.`,
          ],
        },
        {
          heading: '2. What data and why',
          body: [
            'We collect the data you enter when ordering (name, address, e-mail, phone) and order details. Payments are handled by an authorised payment provider; we do not store full card details. We process data for:',
          ],
          list: [
            'performance of a contract — processing and delivering your order (Art. 6(1)(b) GDPR);',
            'legal obligations — accounting and tax (Art. 6(1)(c));',
            'legitimate interest — security and answering enquiries (Art. 6(1)(f));',
            'consent — newsletter/marketing, which you can withdraw at any time (Art. 6(1)(a)).',
          ],
        },
        {
          heading: '3. Recipients and retention',
          body: [
            'We share data only as necessary with processors (delivery, payment, hosting, accounting) bound to confidentiality. We keep it as long as needed for the purpose and statutory periods (e.g. invoices under tax law), and consent-based data until consent is withdrawn.',
          ],
        },
        {
          heading: '4. Your rights',
          body: [
            `You have the right to access, rectify, erase, restrict and port your data, and to object and withdraw consent. Send requests to ${COMPANY.email}.`,
          ],
        },
        {
          heading: '5. Supervisory authority',
          body: [
            `You may lodge a complaint with the Croatian Personal Data Protection Agency (AZOP), ${AZOP_URL}, though we’re happy to resolve your query directly first.`,
          ],
        },
        {
          heading: '6. Cookies',
          body: [
            'Our site uses only essential, functional storage needed for the site to work (e.g. remembering your chosen language and your cookie choice). This data stays on your device.',
            'We do not use analytics or marketing cookies, nor any tracking tools (e.g. Google Analytics, Meta Pixel), and we do not collect data about your behaviour for advertising.',
          ],
        },
        {
          heading: '7. Cookies at checkout (Shopify)',
          body: [
            'Purchases and payments take place on Shopify’s checkout page, where Shopify may set its own cookies necessary to process the order and secure the payment. These are managed by Shopify in line with its own cookie policy.',
          ],
        },
        {
          heading: '8. Managing cookies',
          body: [
            'You can delete or block cookies and local storage at any time through your browser’s settings. Note: disabling functional storage may affect how the site works (e.g. remembering your language).',
          ],
        },
      ],
    },

    impressum: {
      title: 'Legal notice',
      intro: 'Service provider details in accordance with the Electronic Commerce Act.',
      sections: [
        {
          heading: 'Business details',
          list: [
            `Name: ${COMPANY.name}`,
            `Registered office: ${COMPANY.address}`,
            `Owner: ${COMPANY.owner}`,
            `OIB: ${COMPANY.oib}`,
            `VAT ID: ${COMPANY.vat}`,
            'Registered in the Croatian Crafts Register (Obrtni registar).',
          ],
        },
        {
          heading: 'Contact',
          list: [`E-mail: ${COMPANY.email}`, `Phone: ${COMPANY.phone}`],
        },
      ],
    },
  },
}

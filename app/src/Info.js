import React from 'react';
import "./css/style.css"
import sl from './css/img/image1.jpg'
import sl1 from './css/img/image2.jpg'
import sl3 from "./css/img/img5.jpg"
class Info extends React.Component{

render(){
    return(
        <>
          
  <section id="hero">
    <div class="hero container">
      <div>
        <h1>Zdravo debateri, <span></span></h1>
        <h1>Dobrodošli na Vašu <span></span></h1>
        <h1>omiljenu platformu <span></span></h1>
        <a href="#projects" type="button" class="cta">T E M E</a>
      </div>
    </div>
  </section>


  <section id="services">
    <div class="services container">
      <div class="service-top">
        <h1 class="section-title">MISIJA</h1>
        <p>Naša misija je zasnovana na čvrstoj želji da pružimo mogućnost osobama koje žele da razvijaju svoju vještinu diskutovanja kroz zanimljive teme da budu dio udruženja koje ima za cilj upravo jačanje retorike.</p>
      </div>
      <div class="service-bottom">
        <div class="service-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/services.png" /></div>
          <h2>NAUČI VIŠE</h2>
          <p>Znanje se uvijek može nadograđivati. Kroz debatovanje na razne teme otvara ti se put ka novim informacijama, kao i novim idejama kad je u pitanju data tema.  </p>
        </div>
        <div class="service-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/services.png" /></div>
          <h2>OJAČAJ SVOJE SLABOSTI</h2>
          <p>Kroz diskutovanje ćeš  uvidjeti gdje ti je "slabost" u iznošenju tvog stava.  Svakom novom debatom imaš mogućnost da popraviš dio svog izlaganja za koji si uvidio da zaostaje.</p>
        </div>
        <div class="service-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/services.png" /></div>
          <h2>IZGRADI SVOJE SAMOPOUZDANJE</h2>
          <p>Kroz iznošenje svog mišljenja shvataš koliko vrijedi tvoja riječ i koliko je bitno da se i tvoj glas čuje, a pogotovo ako je ta riječ dio grupe - tj. ako imaš podršku svog tima.</p>
        </div>

        <div class="service-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/services.png" /></div>
          <h2>NAUČI DA SLUŠAŠ DRUGE</h2>
          <p>Da bi osoba uspješno pobijedila drugu stranu svojim argumentima, mora da je dobro saslušati da bi odabrala prave argumente i time ih učinila svrsishodnim.</p>
        </div>
      </div>
    </div>
  </section>
 
  <section id="projects">
    <div class="projects container">
      <div class="projects-header">
        <h1 class="section-title">RAZNE <span>TEME</span></h1>
      </div>
      <div class="all-projects">
        <div class="project-item">
          <div class="project-info">
            <h1>Tema 1</h1>
            <h2>Kloniranje ljudi</h2>
            <p>U ovom trenutku, živa debata u Sjedinjenim Državama je previše kloniranje ljudskih embriona. Naučnici se generalno slažu da bi bilo neodgovorno klonirati ljudsko biće dok se kloniranje ne usavrši, s obzirom da će se klonirani čovjek verovatno suočiti sa ozbiljnim i na kraju kraćim zdravstvenim problemima. Koje je tvoje mišljenje?</p>
          </div>
          <div class="project-img">
            <img class="img" src={sl} alt="img"/>
          </div>
        </div>
        <div class="project-item">
          <div class="project-info">
            <h1>Tema 2</h1>
            <h2>Da li su video igre nasilne?</h2>
            <p>Američka psihološka asocijacija objavila je u 2015. godini izjavu koja kaže da postoji jasna veza između agresije i nasilja video igrica. Ovo je zasnovano na pregledu istraživanja radne grupe sprovedene između 2005. i 2013. godine. Radna grupa izveštava da nasilne video igrice dovode do smanjene empatije i smanjenog prosocialnog ponašanja. Koje je tvoje mišljenje? </p>
          </div>
          <div class="project-img">
            <img class="img" src={sl1} alt="img"/>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="about">
    <div class="about container">
    
      <div class="col-right">
        <h1 class="section-title">O <span>nama</span></h1>
        <h2>ONLINE PLATFORMA ZA DISKUSIJU</h2>
        <p>Pozdrav svima, mi smo predstavnici platforme koja želi da okupi sve debatere. Na našoj stranici možete kreirati teme, pridružiti se već postojećim kao i družiti se sa članovima. Uz poštovanje uslova korišenja i pravila ponašanja, garantujemo sigurnost i zaštitu ličnih informacija.</p>
      
      </div>
    </div>
  </section>

  <section id="contact">
    <div class="contact container">
      <div>
        <h1 class="section-title">Kontakt <span>info</span></h1>
      </div>
      <div class="contact-items">
        <div class="contact-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/phone.png" /></div>
          <div class="contact-info">
            <h1>Telefon</h1>
            <h2>+382 68 787 878</h2>
          
          </div>
        </div>
        <div class="contact-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/new-post.png" /></div>
          <div class="contact-info">
            <h1>Email</h1>
            <h2>debatuj_mo@gmail.com</h2>
           
          </div>
        </div>
        <div class="contact-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/map-marker.png" /></div>
          <div class="contact-info">
            <h1>Adresa</h1>
            <h2>Cetinjski put br.2</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
  <script src="./app1.js"></script>
        </>
    )
}

}

export default Info;
/**
 * Site copy in French (source), English and German.
 * Inline emphasis is marked with **double asterisks** and rendered by <RichText/>.
 * Structural data (icons, ids, prices, hrefs) stays in the components — only
 * translatable text lives here, aligned by array index.
 */

export const LANG_LABELS = { fr: "FR", en: "EN", de: "DE" };

export const TRANSLATIONS = {
  /* ============================ FRANÇAIS ============================ */
  fr: {
    nav: {
      about: "À propos",
      coach: "Coach",
      promo: "Promotion",
      tarifs: "Tarifs",
      contact: "Contact",
      agenda: "Agenda",
      reglement: "Règlement",
    },
    hero: {
      eyebrow: "Accompagnement 100% individuel",
      titleA: "La boxe.",
      titleB: "Votre thérapie.",
      subtitle:
        "Une méthode claire et progressive, sans jugement. Un coach, un élève : vous.",
      ctaBook: "Réserver une séance",
      ctaDiscover: "Découvrir le Premium",
      stats: [
        { num: "10 ans", lab: "D'expérience" },
        { num: "250+", lab: "Membres en cours collectif" },
        { num: "300+", lab: "Élèves formés en privé" },
        { num: "400 m²", lab: "Salle d'entraînement" },
      ],
    },
    premium: {
      eyebrow: "Le Premium",
      titleA: "Votre boxe. Votre rythme.",
      titleB: "Rien que pour vous.",
      para1:
        "Beaucoup de personnes rêvent de boxer… mais n'osent pas franchir la porte d'une salle. La peur du **regard des autres**, l'anxiété, le sentiment de ne pas être à la hauteur. En cours collectif, le coach partage son attention entre des dizaines d'élèves : difficile de prendre le temps pour chacun.",
      para2:
        "C'est exactement pour cela qu'est né le cours **Premium**. Un espace pensé pour vous — seul face au coach, ou accompagné d'un ami, en duo, à trois ou en petit groupe. Quelle que soit la formule choisie, chaque séance reste centrée sur vous : corriger vos lacunes, progresser à votre rythme et révéler votre plein potentiel, dans un cadre toujours bienveillant et sans jugement.",
      features: [
        {
          title: "Sans jugement",
          text: "Pas de regard des autres, pas de pression. Vous progressez dans un cadre rassurant.",
        },
        {
          title: "100% sur vous",
          text: "Le coach n'a qu'un seul élève : vous. Toute son attention sur chaque détail.",
        },
        {
          title: "Plein potentiel",
          text: "Un programme adapté à votre niveau et vos objectifs, pour aller plus loin.",
        },
      ],
      quote:
        "Vous serez coaché par un professeur **passionné et patient**, qui avance **à votre rythme, sans pression**.",
      cta: "Réserver ma séance",
    },
    coach: {
      eyebrow: "Le Professeur",
      name: "Evariste",
      photoPlaceholder: "Ta photo ici",
      bio: [
        "La boxe a commencé comme un moyen de me défendre. Elle est devenue ma thérapie, puis ma vocation.",
        "Je pratique la boxe depuis l'âge de 12 ans. Au départ, je voulais simplement apprendre à me défendre face aux moqueries et aux humiliations. Mais dès ma première salle, j'ai ressenti autre chose : un apaisement profond. La boxe n'était plus un sport, c'était un équilibre.",
        "Au fil de mon parcours, j'ai mené une belle carrière en amateur dans le circuit suisse, qui m'a permis d'affiner ma technique et de comprendre la boxe de l'intérieur — comme compétiteur, avant de devenir coach.",
        "Pendant le Covid, j'ai continué à m'entraîner avec discipline et à partager ma passion sur les réseaux. Des amis sont venus, puis des amis d'amis. Sans salle, sans douche, dehors, par tous les temps. En quelques mois, nous sommes passés de 5 à 50 élèves.",
        "Porté par ma famille, mes amis et mes proches, j'ai ouvert une première salle de 140 m². Six mois plus tard, le club comptait déjà 150 membres. Aujourd'hui, c'est une salle de 400 m² qui accueille plus de 250 passionnés.",
        "Au fil des années, j'ai enseigné la boxe à de nombreuses personnes — et certaines ont à leur tour ouvert leurs propres salles de boxe. C'est ma plus grande fierté. À ce jour, j'ai accompagné plus de 300 personnes en cours privé.",
        "J'enseigne avec patience et passion : ce sont mes deux moteurs. Et je n'arrête jamais d'apprendre. À travers mes voyages, j'enseigne la boxe mais j'apprends aussi des autres coachs, pour offrir à mes élèves la meilleure qualité d'entraînement possible.",
      ],
      stats: [
        { num: "10 ans", lab: "D'expérience" },
        { num: "250+", lab: "Membres en cours collectif" },
        { num: "300+", lab: "Élèves formés en privé" },
        { num: "400 m²", lab: "Salle d'entraînement" },
      ],
    },
    agenda: {
      eyebrow: "Agenda",
      title: "Réservez votre séance",
      subtitle: "Choisissez la date et l'heure qui vous conviennent.",
      openExternal: "Ouvrir le calendrier de réservation",
      step1: "Choisissez la date",
      step2: "Choisissez l'heure",
      step3: "Vos coordonnées",
      selectDateFirst: "Sélectionnez d'abord une date.",
      fields: {
        name: "Nom complet",
        namePh: "Prénom et nom",
        phone: "Numéro de téléphone",
        phonePh: "+41 79 000 00 00",
        email: "Adresse email",
        emailPh: "votre@email.com",
      },
      errMissing: "Merci de remplir votre nom, téléphone et email.",
      errEmail: "Merci d'entrer une adresse email valide.",
      recapLabel: "Votre sélection",
      recapEmpty: "Rien de sélectionné",
      recapChooseHour: "Choisissez une heure",
      at: "à",
      confirm: "Confirmer",
      adminToggle: "Espace coach",
      adminToggleActive: "Espace coach (activé)",
      adminTitle: "Espace coach — Mes absences",
      adminHelp:
        "Sélectionnez une date dans le calendrier, puis bloquez la journée entière ou des heures précises. Les créneaux bloqués ne sont plus réservables.",
      blockDay: "Bloquer la journée",
      unblockDay: "Débloquer",
      blockHoursLabel: "Ou bloquez des heures précises :",
      adminClose: "Fermer l'espace coach",
      promptCode: "Code coach :",
      wrongCode: "Code incorrect.",
      pickDateFirst: "Sélectionnez d'abord une date.",
    },
    tarifs: {
      eyebrow: "Tarifs",
      titleA: "Nos ",
      titleB: "formules",
      lead: "Plus vous vous engagez, plus vous économisez. Chaque cours, c'est 1h d'accompagnement individuel.",
      packs: [
        {
          title: "Pack 5 cours",
          subtitle: "Pour progresser régulièrement",
          per: "soit 100 CHF / cours",
          save: "Économisez 100 CHF",
          cta: "Choisir ce pack",
        },
        {
          title: "Pack 10 cours",
          subtitle: "Pour un vrai suivi sur la durée",
          per: "soit 95 CHF / cours",
          save: "Économisez 250 CHF",
          cta: "Choisir ce pack",
          ribbon: "Le plus avantageux",
        },
      ],
      studentText:
        "Réduction **étudiants** et **moins de 18 ans** sur tous les cours et packs. Sur présentation d'un justificatif.",
      note: "Prix en francs suisses (CHF). Paiement par virement (IBAN) ou espèces à la salle. Toute séance doit être annulée au moins 24h à l'avance.",
    },
    grouprates: {
      eyebrow: "Tarifs",
      titleA: "Nos ",
      titleB: "tarifs",
      lead: "Venez seul ou à plusieurs : plus vous êtes nombreux, plus le tarif par personne baisse.",
      ribbon: "Populaire",
      note: "Prix en francs suisses (CHF) par séance d'1h. Réduction étudiants et moins de 18 ans sur présentation d'un justificatif.",
      tiers: [
        { tier: "Solo", persons: "1 personne", sub: "la séance", badge: "Tarif de base", cta: "Réserver" },
        { tier: "Duo", persons: "2 personnes", sub: "soit 100 / pers.", badge: "−17% / pers.", cta: "Réserver" },
        { tier: "Trio", persons: "3 personnes", sub: "soit 93 / pers.", badge: "−22% / pers.", cta: "Réserver" },
        { tier: "Groupe", persons: "4 personnes", sub: "soit 85 / pers.", badge: "−29% / pers.", cta: "Réserver" },
      ],
    },
    payment: {
      eyebrow: "Paiement",
      titleA: "Votre ",
      titleB: "commande",
      pack: "Formule choisie",
      amount: "Montant",
      holder: "Bénéficiaire",
      intro:
        "Réglez votre commande par l'un des moyens ci-dessous. Dès que votre paiement est confirmé, vous recevez un **email de confirmation de votre pack** — vous pouvez ensuite réserver vos séances une par une, quand vous le souhaitez.",
      methods: [
        {
          title: "Virement bancaire",
          badge: "IBAN",
          description:
            "Effectuez le virement sur le compte ci-dessous (indiquez votre nom + la formule en communication) :",
        },
        {
          title: "Espèces à la salle",
          description:
            "Vous pouvez aussi régler en cash directement à la salle, avec le coach : Rue Saint-Pierre 6B, 1700 Fribourg.",
        },
      ],
      notice:
        "**Après réception de votre paiement**, vous recevrez un email de confirmation avec votre crédit de séances. Vous pourrez alors réserver vos dates ci-dessous.",
      ctaBook: "Réserver mes séances",
      back: "Retour aux tarifs",
    },
    contact: {
      eyebrow: "Contact",
      titleA: "Nous ",
      titleB: "trouver",
      cards: [
        { title: "Adresse", lines: ["Rue Saint-Pierre 6B", "1700 Fribourg", "Suisse"] },
        { title: "Téléphone", lines: ["078 320 05 83"] },
        { title: "Email", lines: ["boxingtherapiepremium@gmail.com"] },
        {
          title: "Déplacements",
          lead: "Disponible dans le monde entier.",
          body: "Cours privés à domicile ou en déplacement, sur demande, où que vous soyez.",
        },
      ],
      cta: "Réserver une séance",
    },
    reglement: {
      eyebrow: "Règlement",
      titleA: "Conditions & ",
      titleB: "règlement",
      lead: "En réservant une séance ou un pack, chaque participant accepte le règlement ci-dessous.",
      rules: [
        {
          title: "Annulation 24 heures à l'avance",
          body: "Toute séance doit être annulée au minimum **24 heures à l'avance**. Passé ce délai, la séance est considérée comme due et ne pourra être ni remboursée, ni reportée.",
        },
        {
          title: "Aptitude médicale",
          body: "Avant de commencer, chaque participant s'engage à vérifier son **aptitude à pratiquer la boxe**, si nécessaire auprès de son médecin ou de son assurance. La pratique se fait en pleine connaissance de son état de santé.",
        },
        {
          title: "Assurance obligatoire",
          body: "Chaque participant doit disposer de sa propre **assurance responsabilité civile (RC)** et d'une **assurance accident** valable. En cas de blessure, les frais relèvent de l'assurance personnelle du participant.",
        },
        {
          title: "Responsabilité",
          body: "La pratique de la boxe comporte des risques. Chaque participant pratique **sous sa propre responsabilité**. Boxing Therapie Premium et son coach ne peuvent être tenus responsables des blessures, accidents ou dommages survenant pendant ou après les séances.",
        },
        {
          title: "Paiement",
          body: "Les séances et packs se règlent par **virement bancaire (IBAN)** ou en **espèces à la salle**. L'accès aux réservations est confirmé une fois le paiement reçu. Les packs ne sont pas remboursables.",
        },
        {
          title: "Respect & consignes",
          body: "Chaque participant s'engage à respecter les consignes du coach, le matériel et les autres pratiquants. Le coach se réserve le droit de refuser ou d'interrompre une séance en cas de comportement inapproprié ou de risque pour la sécurité.",
        },
      ],
      note: "En réservant, vous reconnaissez avoir lu et accepté l'ensemble de ces conditions.",
    },
    footer: {
      tagline:
        "La boxe, votre thérapie. Un accompagnement 100% individuel, à votre rythme et sans jugement.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      links: [
        { id: "about", label: "Le Premium" },
        { id: "coach", label: "Le Coach" },
        { id: "agenda", label: "Agenda" },
        { id: "promo", label: "Formules" },
        { id: "tarifs", label: "Tarifs" },
        { id: "contact", label: "Contact" },
        { id: "reglement", label: "Règlement" },
      ],
      contactLines: [
        ["Rue Saint-Pierre 6B", "1700 Fribourg, Suisse"],
        ["078 320 05 83"],
        ["boxingtherapiepremium@gmail.com"],
      ],
      rights: "Fribourg, Suisse. Tous droits réservés.",
    },
    modal: {
      title: "Réservation confirmée",
      note: "Merci **{name}**, un **email de confirmation** a été envoyé à **{email}**.",
      place: "Lieu du cours",
      howToPay: "Comment payer votre cours",
      transfer: "Virement bancaire",
      transferDesc:
        "Paiement sur le compte ci-dessous (indiquez votre nom + la date du cours) :",
      cash: "Espèces à la salle",
      cashDesc: "Vous pouvez aussi régler en cash le jour de votre séance.",
      cancel:
        "**Annulation :** toute séance doit être annulée au moins **24 heures à l'avance**. Passé ce délai, le cours est dû et non remboursé.",
      done: "Terminé",
    },
  },

  /* ============================= ENGLISH ============================ */
  en: {
    nav: {
      about: "About",
      coach: "Coach",
      promo: "Pricing",
      tarifs: "Rates",
      contact: "Contact",
      agenda: "Booking",
      reglement: "Terms",
    },
    hero: {
      eyebrow: "100% one-on-one coaching",
      titleA: "Boxing.",
      titleB: "Your therapy.",
      subtitle:
        "A clear, progressive method, free of judgment. One coach, one student: you.",
      ctaBook: "Book a session",
      ctaDiscover: "Discover Premium",
      stats: [
        { num: "10 years", lab: "Of experience" },
        { num: "250+", lab: "Members in group classes" },
        { num: "300+", lab: "Students trained privately" },
        { num: "400 m²", lab: "Training space" },
      ],
    },
    premium: {
      eyebrow: "The Premium",
      titleA: "Your boxing. Your pace.",
      titleB: "Just for you.",
      para1:
        "Many people dream of boxing… but don't dare step through the door of a gym. The fear of **being watched**, the anxiety, the feeling of not being good enough. In group classes, the coach splits attention between dozens of students: it's hard to take time for everyone.",
      para2:
        "That is exactly why the **Premium** class was born. A space designed for you — alone with the coach, or with a friend, as a duo, a trio or in a small group. Whatever option you choose, every session stays centered on you: correcting your weaknesses, progressing at your own pace and revealing your full potential, always in a caring, judgment-free environment.",
      features: [
        {
          title: "No judgment",
          text: "No one watching, no pressure. You progress in a reassuring environment.",
        },
        {
          title: "100% on you",
          text: "The coach has only one student: you. Full attention on every detail.",
        },
        {
          title: "Full potential",
          text: "A program tailored to your level and goals, to take you further.",
        },
      ],
      quote:
        "You will be coached by a **passionate and patient** instructor, who moves **at your pace, without pressure**.",
      cta: "Book my session",
    },
    coach: {
      eyebrow: "The Instructor",
      name: "Evariste",
      photoPlaceholder: "Your photo here",
      bio: [
        "Boxing started as a way to defend myself. It became my therapy, then my calling.",
        "I've practiced boxing since the age of 12. At first, I just wanted to learn how to defend myself against mockery and humiliation. But from my very first gym, I felt something else: a deep sense of calm. Boxing was no longer a sport, it was a balance.",
        "Along the way, I built a solid amateur career on the Swiss circuit, which let me refine my technique and understand boxing from the inside — as a competitor, before becoming a coach.",
        "During Covid, I kept training with discipline and sharing my passion online. Friends came, then friends of friends. No gym, no showers, outdoors, in all weather. Within a few months, we went from 5 to 50 students.",
        "Supported by my family, friends and loved ones, I opened a first 140 m² gym. Six months later, the club already had 150 members. Today, a 400 m² gym welcomes more than 250 enthusiasts.",
        "Over the years, I've taught boxing to many people — and some have gone on to open their own boxing gyms. That's my greatest pride. To date, I've coached more than 300 people in private lessons.",
        "I teach with patience and passion: these are my two driving forces. And I never stop learning. Through my travels, I teach boxing but also learn from other coaches, to offer my students the best possible training quality.",
      ],
      stats: [
        { num: "10 years", lab: "Of experience" },
        { num: "250+", lab: "Members in group classes" },
        { num: "300+", lab: "Students trained privately" },
        { num: "400 m²", lab: "Training space" },
      ],
    },
    agenda: {
      eyebrow: "Booking",
      title: "Book your session",
      subtitle: "Choose the date and time that suit you.",
      openExternal: "Open the booking calendar",
      step1: "Choose the date",
      step2: "Choose the time",
      step3: "Your details",
      selectDateFirst: "Please select a date first.",
      fields: {
        name: "Full name",
        namePh: "First and last name",
        phone: "Phone number",
        phonePh: "+41 79 000 00 00",
        email: "Email address",
        emailPh: "you@email.com",
      },
      errMissing: "Please fill in your name, phone and email.",
      errEmail: "Please enter a valid email address.",
      recapLabel: "Your selection",
      recapEmpty: "Nothing selected",
      recapChooseHour: "Choose a time",
      at: "at",
      confirm: "Confirm",
      adminToggle: "Coach area",
      adminToggleActive: "Coach area (active)",
      adminTitle: "Coach area — My absences",
      adminHelp:
        "Select a date in the calendar, then block the whole day or specific hours. Blocked slots can no longer be booked.",
      blockDay: "Block the day",
      unblockDay: "Unblock",
      blockHoursLabel: "Or block specific hours:",
      adminClose: "Close coach area",
      promptCode: "Coach code:",
      wrongCode: "Wrong code.",
      pickDateFirst: "Please select a date first.",
    },
    tarifs: {
      eyebrow: "Pricing",
      titleA: "Our ",
      titleB: "packages",
      lead: "The more you commit, the more you save. Each lesson is 1h of one-on-one coaching.",
      packs: [
        {
          title: "Pack of 5 lessons",
          subtitle: "To progress regularly",
          per: "i.e. 100 CHF / lesson",
          save: "Save 100 CHF",
          cta: "Choose this pack",
        },
        {
          title: "Pack of 10 lessons",
          subtitle: "For real long-term follow-up",
          per: "i.e. 95 CHF / lesson",
          save: "Save 250 CHF",
          cta: "Choose this pack",
          ribbon: "Best value",
        },
      ],
      studentText:
        "**Student** and **under-18** discount on all lessons and packs. On presentation of valid proof.",
      note: "Prices in Swiss francs (CHF). Payment by bank transfer (IBAN) or cash at the gym. Any session must be cancelled at least 24h in advance.",
    },
    grouprates: {
      eyebrow: "Rates",
      titleA: "Our ",
      titleB: "rates",
      lead: "Come alone or with others: the more of you there are, the lower the price per person.",
      ribbon: "Popular",
      note: "Prices in Swiss francs (CHF) per 1h session. Student and under-18 discount on presentation of valid proof.",
      tiers: [
        { tier: "Solo", persons: "1 person", sub: "per session", badge: "Base rate", cta: "Book" },
        { tier: "Duo", persons: "2 people", sub: "i.e. 100 / pers.", badge: "−17% / pers.", cta: "Book" },
        { tier: "Trio", persons: "3 people", sub: "i.e. 93 / pers.", badge: "−22% / pers.", cta: "Book" },
        { tier: "Group", persons: "4 people", sub: "i.e. 85 / pers.", badge: "−29% / pers.", cta: "Book" },
      ],
    },
    payment: {
      eyebrow: "Payment",
      titleA: "Your ",
      titleB: "order",
      pack: "Selected package",
      amount: "Amount",
      holder: "Beneficiary",
      intro:
        "Pay for your order using one of the methods below. As soon as your payment is confirmed, you receive a **pack confirmation email** — you can then book your sessions one by one, whenever you like.",
      methods: [
        {
          title: "Bank transfer",
          badge: "IBAN",
          description:
            "Make the transfer to the account below (include your name + the package in the reference):",
        },
        {
          title: "Cash at the gym",
          description:
            "You can also pay in cash directly at the gym, with the coach: Rue Saint-Pierre 6B, 1700 Fribourg.",
        },
      ],
      notice:
        "**Once your payment is received**, you will get a confirmation email with your session credit. You can then book your dates below.",
      ctaBook: "Book my sessions",
      back: "Back to pricing",
    },
    contact: {
      eyebrow: "Contact",
      titleA: "Find ",
      titleB: "us",
      cards: [
        { title: "Address", lines: ["Rue Saint-Pierre 6B", "1700 Fribourg", "Switzerland"] },
        { title: "Phone", lines: ["078 320 05 83"] },
        { title: "Email", lines: ["boxingtherapiepremium@gmail.com"] },
        {
          title: "Travel",
          lead: "Available worldwide.",
          body: "Private lessons at home or on the move, on request, wherever you are.",
        },
      ],
      cta: "Book a session",
    },
    reglement: {
      eyebrow: "Terms",
      titleA: "Terms & ",
      titleB: "conditions",
      lead: "By booking a session or a pack, each participant accepts the terms below.",
      rules: [
        {
          title: "Cancellation 24 hours in advance",
          body: "Any session must be cancelled at least **24 hours in advance**. After this deadline, the session is considered due and can neither be refunded nor postponed.",
        },
        {
          title: "Medical fitness",
          body: "Before starting, each participant agrees to check their **fitness to practice boxing**, if necessary with their doctor or insurer. Practice is done in full awareness of one's health.",
        },
        {
          title: "Mandatory insurance",
          body: "Each participant must have their own valid **personal liability insurance** and **accident insurance**. In case of injury, costs are covered by the participant's personal insurance.",
        },
        {
          title: "Responsibility",
          body: "Boxing involves risks. Each participant trains **at their own risk**. Boxing Therapie Premium and its coach cannot be held responsible for injuries, accidents or damage occurring during or after sessions.",
        },
        {
          title: "Payment",
          body: "Sessions and packs are paid by **bank transfer (IBAN)** or in **cash at the gym**. Access to bookings is confirmed once payment is received. Packs are non-refundable.",
        },
        {
          title: "Respect & instructions",
          body: "Each participant agrees to respect the coach's instructions, the equipment and other practitioners. The coach reserves the right to refuse or interrupt a session in case of inappropriate behavior or safety risk.",
        },
      ],
      note: "By booking, you acknowledge that you have read and accepted all of these conditions.",
    },
    footer: {
      tagline:
        "Boxing, your therapy. 100% one-on-one coaching, at your own pace and without judgment.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      links: [
        { id: "about", label: "The Premium" },
        { id: "coach", label: "The Coach" },
        { id: "agenda", label: "Booking" },
        { id: "promo", label: "Packs" },
        { id: "tarifs", label: "Rates" },
        { id: "contact", label: "Contact" },
        { id: "reglement", label: "Terms" },
      ],
      contactLines: [
        ["Rue Saint-Pierre 6B", "1700 Fribourg, Switzerland"],
        ["078 320 05 83"],
        ["boxingtherapiepremium@gmail.com"],
      ],
      rights: "Fribourg, Switzerland. All rights reserved.",
    },
    modal: {
      title: "Booking confirmed",
      note: "Thank you **{name}**, a **confirmation email** has been sent to **{email}**.",
      place: "Class location",
      howToPay: "How to pay for your class",
      transfer: "Bank transfer",
      transferDesc:
        "Payment to the account below (include your name + the class date):",
      cash: "Cash at the gym",
      cashDesc: "You can also pay in cash on the day of your session.",
      cancel:
        "**Cancellation:** any session must be cancelled at least **24 hours in advance**. After this deadline, the class is due and non-refundable.",
      done: "Done",
    },
  },

  /* ============================= DEUTSCH ============================ */
  de: {
    nav: {
      about: "Über uns",
      coach: "Coach",
      promo: "Preise",
      tarifs: "Tarife",
      contact: "Kontakt",
      agenda: "Termine",
      reglement: "Regeln",
    },
    hero: {
      eyebrow: "100% individuelles Coaching",
      titleA: "Boxen.",
      titleB: "Deine Therapie.",
      subtitle:
        "Eine klare, schrittweise Methode, ohne Wertung. Ein Coach, ein Schüler: du.",
      ctaBook: "Sitzung buchen",
      ctaDiscover: "Premium entdecken",
      stats: [
        { num: "10 Jahre", lab: "Erfahrung" },
        { num: "250+", lab: "Mitglieder im Gruppenkurs" },
        { num: "300+", lab: "Privat ausgebildete Schüler" },
        { num: "400 m²", lab: "Trainingsfläche" },
      ],
    },
    premium: {
      eyebrow: "Das Premium",
      titleA: "Dein Boxen. Dein Tempo.",
      titleB: "Nur für dich.",
      para1:
        "Viele Menschen träumen vom Boxen … trauen sich aber nicht, eine Halle zu betreten. Die Angst vor den **Blicken der anderen**, die Nervosität, das Gefühl, nicht gut genug zu sein. Im Gruppenkurs teilt der Coach seine Aufmerksamkeit auf Dutzende Schüler auf: Es ist schwer, für jeden Zeit zu nehmen.",
      para2:
        "Genau dafür wurde der **Premium**-Kurs geschaffen. Ein Raum, der für dich gedacht ist — allein mit dem Coach oder mit einem Freund, zu zweit, zu dritt oder in einer kleinen Gruppe. Welche Variante du auch wählst, jede Sitzung bleibt auf dich ausgerichtet: deine Schwächen ausbessern, in deinem Tempo vorankommen und dein volles Potenzial entfalten — immer in einem wohlwollenden Rahmen, ohne Wertung.",
      features: [
        {
          title: "Ohne Wertung",
          text: "Keine Blicke, kein Druck. Du machst Fortschritte in einem sicheren Rahmen.",
        },
        {
          title: "100% auf dich",
          text: "Der Coach hat nur einen Schüler: dich. Volle Aufmerksamkeit für jedes Detail.",
        },
        {
          title: "Volles Potenzial",
          text: "Ein auf dein Niveau und deine Ziele abgestimmtes Programm, um weiter zu kommen.",
        },
      ],
      quote:
        "Du wirst von einem **leidenschaftlichen und geduldigen** Trainer gecoacht, der **in deinem Tempo, ohne Druck** vorgeht.",
      cta: "Meine Sitzung buchen",
    },
    coach: {
      eyebrow: "Der Trainer",
      name: "Evariste",
      photoPlaceholder: "Dein Foto hier",
      bio: [
        "Boxen begann als Mittel zur Selbstverteidigung. Es wurde zu meiner Therapie, dann zu meiner Berufung.",
        "Ich boxe seit meinem 12. Lebensjahr. Anfangs wollte ich mich nur gegen Spott und Demütigungen verteidigen lernen. Doch schon in meiner ersten Halle spürte ich etwas anderes: eine tiefe Ruhe. Boxen war kein Sport mehr, es war ein Gleichgewicht.",
        "Im Lauf meines Werdegangs habe ich eine schöne Amateurkarriere im Schweizer Circuit absolviert, die mir erlaubt hat, meine Technik zu verfeinern und das Boxen von innen zu verstehen — als Wettkämpfer, bevor ich Coach wurde.",
        "Während Covid trainierte ich weiter mit Disziplin und teilte meine Leidenschaft online. Freunde kamen, dann Freunde von Freunden. Ohne Halle, ohne Dusche, draußen, bei jedem Wetter. Innerhalb weniger Monate wuchsen wir von 5 auf 50 Schüler.",
        "Getragen von meiner Familie, meinen Freunden und Angehörigen eröffnete ich eine erste Halle von 140 m². Sechs Monate später zählte der Club bereits 150 Mitglieder. Heute empfängt eine Halle von 400 m² über 250 Begeisterte.",
        "Über die Jahre habe ich vielen Menschen das Boxen beigebracht — und einige haben ihrerseits eigene Boxhallen eröffnet. Das ist mein größter Stolz. Bis heute habe ich über 300 Personen im Privatunterricht begleitet.",
        "Ich unterrichte mit Geduld und Leidenschaft: das sind meine beiden Antriebe. Und ich höre nie auf zu lernen. Auf meinen Reisen unterrichte ich Boxen, lerne aber auch von anderen Coaches, um meinen Schülern die bestmögliche Trainingsqualität zu bieten.",
      ],
      stats: [
        { num: "10 Jahre", lab: "Erfahrung" },
        { num: "250+", lab: "Mitglieder im Gruppenkurs" },
        { num: "300+", lab: "Privat ausgebildete Schüler" },
        { num: "400 m²", lab: "Trainingsfläche" },
      ],
    },
    agenda: {
      eyebrow: "Termine",
      title: "Buche deine Sitzung",
      subtitle: "Wähle Datum und Uhrzeit, die dir passen.",
      openExternal: "Buchungskalender öffnen",
      step1: "Datum wählen",
      step2: "Uhrzeit wählen",
      step3: "Deine Angaben",
      selectDateFirst: "Bitte zuerst ein Datum wählen.",
      fields: {
        name: "Vollständiger Name",
        namePh: "Vor- und Nachname",
        phone: "Telefonnummer",
        phonePh: "+41 79 000 00 00",
        email: "E-Mail-Adresse",
        emailPh: "du@email.com",
      },
      errMissing: "Bitte Name, Telefon und E-Mail ausfüllen.",
      errEmail: "Bitte eine gültige E-Mail-Adresse eingeben.",
      recapLabel: "Deine Auswahl",
      recapEmpty: "Nichts ausgewählt",
      recapChooseHour: "Wähle eine Uhrzeit",
      at: "um",
      confirm: "Bestätigen",
      adminToggle: "Coach-Bereich",
      adminToggleActive: "Coach-Bereich (aktiv)",
      adminTitle: "Coach-Bereich — Meine Abwesenheiten",
      adminHelp:
        "Wähle ein Datum im Kalender und blockiere dann den ganzen Tag oder einzelne Stunden. Blockierte Zeitfenster sind nicht mehr buchbar.",
      blockDay: "Tag blockieren",
      unblockDay: "Freigeben",
      blockHoursLabel: "Oder einzelne Stunden blockieren:",
      adminClose: "Coach-Bereich schließen",
      promptCode: "Coach-Code:",
      wrongCode: "Falscher Code.",
      pickDateFirst: "Bitte zuerst ein Datum wählen.",
    },
    tarifs: {
      eyebrow: "Preise",
      titleA: "Unsere ",
      titleB: "Pakete",
      lead: "Je mehr du dich bindest, desto mehr sparst du. Jede Stunde ist 1 Std. individuelles Coaching.",
      packs: [
        {
          title: "5er-Paket",
          subtitle: "Um regelmäßig Fortschritte zu machen",
          per: "d.h. 100 CHF / Stunde",
          save: "Spare 100 CHF",
          cta: "Dieses Paket wählen",
        },
        {
          title: "10er-Paket",
          subtitle: "Für echte langfristige Begleitung",
          per: "d.h. 95 CHF / Stunde",
          save: "Spare 250 CHF",
          cta: "Dieses Paket wählen",
          ribbon: "Bestes Angebot",
        },
      ],
      studentText:
        "**Studenten-** und **Unter-18-Rabatt** auf alle Stunden und Pakete. Gegen Vorlage eines Nachweises.",
      note: "Preise in Schweizer Franken (CHF). Zahlung per Überweisung (IBAN) oder bar in der Halle. Jede Sitzung muss mindestens 24 Std. im Voraus storniert werden.",
    },
    grouprates: {
      eyebrow: "Tarife",
      titleA: "Unsere ",
      titleB: "Tarife",
      lead: "Komm allein oder zu mehreren: je mehr ihr seid, desto niedriger der Preis pro Person.",
      ribbon: "Beliebt",
      note: "Preise in Schweizer Franken (CHF) pro 1-Std.-Sitzung. Studenten- und Unter-18-Rabatt gegen Vorlage eines Nachweises.",
      tiers: [
        { tier: "Solo", persons: "1 Person", sub: "pro Sitzung", badge: "Basispreis", cta: "Buchen" },
        { tier: "Duo", persons: "2 Personen", sub: "d.h. 100 / Pers.", badge: "−17% / Pers.", cta: "Buchen" },
        { tier: "Trio", persons: "3 Personen", sub: "d.h. 93 / Pers.", badge: "−22% / Pers.", cta: "Buchen" },
        { tier: "Gruppe", persons: "4 Personen", sub: "d.h. 85 / Pers.", badge: "−29% / Pers.", cta: "Buchen" },
      ],
    },
    payment: {
      eyebrow: "Zahlung",
      titleA: "Deine ",
      titleB: "Bestellung",
      pack: "Gewähltes Paket",
      amount: "Betrag",
      holder: "Begünstigter",
      intro:
        "Bezahle deine Bestellung über eine der folgenden Methoden. Sobald deine Zahlung bestätigt ist, erhältst du eine **Paket-Bestätigungs-E-Mail** — danach kannst du deine Sitzungen einzeln buchen, wann immer du möchtest.",
      methods: [
        {
          title: "Banküberweisung",
          badge: "IBAN",
          description:
            "Überweise auf das untenstehende Konto (gib deinen Namen + das Paket im Verwendungszweck an):",
        },
        {
          title: "Bar in der Halle",
          description:
            "Du kannst auch bar direkt in der Halle beim Coach bezahlen: Rue Saint-Pierre 6B, 1700 Fribourg.",
        },
      ],
      notice:
        "**Nach Eingang deiner Zahlung** erhältst du eine Bestätigungs-E-Mail mit deinem Sitzungsguthaben. Danach kannst du deine Termine unten buchen.",
      ctaBook: "Meine Sitzungen buchen",
      back: "Zurück zu den Preisen",
    },
    contact: {
      eyebrow: "Kontakt",
      titleA: "So findest ",
      titleB: "du uns",
      cards: [
        { title: "Adresse", lines: ["Rue Saint-Pierre 6B", "1700 Fribourg", "Schweiz"] },
        { title: "Telefon", lines: ["078 320 05 83"] },
        { title: "E-Mail", lines: ["boxingtherapiepremium@gmail.com"] },
        {
          title: "Unterwegs",
          lead: "Weltweit verfügbar.",
          body: "Privatunterricht zu Hause oder unterwegs, auf Anfrage, wo immer du bist.",
        },
      ],
      cta: "Sitzung buchen",
    },
    reglement: {
      eyebrow: "Regeln",
      titleA: "Bedingungen & ",
      titleB: "Regeln",
      lead: "Mit der Buchung einer Sitzung oder eines Pakets akzeptiert jeder Teilnehmer die untenstehenden Regeln.",
      rules: [
        {
          title: "Stornierung 24 Stunden im Voraus",
          body: "Jede Sitzung muss mindestens **24 Stunden im Voraus** storniert werden. Nach dieser Frist gilt die Sitzung als fällig und kann weder erstattet noch verschoben werden.",
        },
        {
          title: "Medizinische Eignung",
          body: "Vor dem Start verpflichtet sich jeder Teilnehmer, seine **Eignung zum Boxen** zu prüfen, bei Bedarf bei seinem Arzt oder seiner Versicherung. Die Ausübung erfolgt in vollem Bewusstsein des eigenen Gesundheitszustands.",
        },
        {
          title: "Versicherungspflicht",
          body: "Jeder Teilnehmer muss über eine eigene gültige **Haftpflichtversicherung** und **Unfallversicherung** verfügen. Im Verletzungsfall trägt die persönliche Versicherung des Teilnehmers die Kosten.",
        },
        {
          title: "Verantwortung",
          body: "Boxen birgt Risiken. Jeder Teilnehmer übt **auf eigene Verantwortung** aus. Boxing Therapie Premium und sein Coach haften nicht für Verletzungen, Unfälle oder Schäden während oder nach den Sitzungen.",
        },
        {
          title: "Zahlung",
          body: "Sitzungen und Pakete werden per **Banküberweisung (IBAN)** oder **bar in der Halle** bezahlt. Der Zugang zu Buchungen wird nach Zahlungseingang bestätigt. Pakete sind nicht erstattungsfähig.",
        },
        {
          title: "Respekt & Anweisungen",
          body: "Jeder Teilnehmer verpflichtet sich, die Anweisungen des Coaches, das Material und die anderen Teilnehmer zu respektieren. Der Coach behält sich das Recht vor, eine Sitzung bei unangemessenem Verhalten oder Sicherheitsrisiko abzulehnen oder abzubrechen.",
        },
      ],
      note: "Mit der Buchung bestätigst du, alle diese Bedingungen gelesen und akzeptiert zu haben.",
    },
    footer: {
      tagline:
        "Boxen, deine Therapie. 100% individuelles Coaching, in deinem Tempo und ohne Wertung.",
      navTitle: "Navigation",
      contactTitle: "Kontakt",
      links: [
        { id: "about", label: "Das Premium" },
        { id: "coach", label: "Der Coach" },
        { id: "agenda", label: "Termine" },
        { id: "promo", label: "Pakete" },
        { id: "tarifs", label: "Tarife" },
        { id: "contact", label: "Kontakt" },
        { id: "reglement", label: "Regeln" },
      ],
      contactLines: [
        ["Rue Saint-Pierre 6B", "1700 Fribourg, Schweiz"],
        ["078 320 05 83"],
        ["boxingtherapiepremium@gmail.com"],
      ],
      rights: "Fribourg, Schweiz. Alle Rechte vorbehalten.",
    },
    modal: {
      title: "Buchung bestätigt",
      note: "Danke **{name}**, eine **Bestätigungs-E-Mail** wurde an **{email}** gesendet.",
      place: "Kursort",
      howToPay: "So bezahlst du deinen Kurs",
      transfer: "Banküberweisung",
      transferDesc:
        "Zahlung auf das untenstehende Konto (gib deinen Namen + das Kursdatum an):",
      cash: "Bar in der Halle",
      cashDesc: "Du kannst auch bar am Tag deiner Sitzung bezahlen.",
      cancel:
        "**Stornierung:** jede Sitzung muss mindestens **24 Stunden im Voraus** storniert werden. Nach dieser Frist ist der Kurs fällig und nicht erstattungsfähig.",
      done: "Fertig",
    },
  },
};

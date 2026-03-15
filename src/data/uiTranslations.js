// ---------------------------------------------------------------
// Central UI translation dictionary
// ---------------------------------------------------------------
// Every user-facing label / message that appears outside of
// lesson body text lives here.  Components import `uiTranslations`
// and read  `uiTranslations[language].<key>`.
// ---------------------------------------------------------------

export const uiTranslations = {

  /* ---- English (default) ---- */
  en: {
    // Lesson page
    playVoice:      'Play Voice Guide',
    playingVoice:   'Playing voice guide…',
    takeQuiz:       'Take the Quiz →',

    // Quiz page – chrome
    quickQuiz:      '✦ Quick Quiz',
    questionOf:     'Question {current} of {total}',
    scoreLbl:       'Score',
    submitAnswer:   'Submit Answer',
    nextQuestion:   'Next Question →',
    seeResults:     'See Results →',

    // Quiz page – feedback
    correct:        'Correct! Well done.',
    wrong:          "Not quite — here's why:",

    // Quiz page – results screen
    lessonComplete: 'Lesson Complete!',
    keepLearning:   'Keep Learning!',
    resultPass:     "Excellent work! You've mastered the basics. You're ready for the next module.",
    resultFail:     'You did your best! Review the lesson and try again to build your confidence.',
    viewProgress:   'View My Progress →',
    exploreModules: 'Explore More Modules',
  },

  /* ---- Hindi ---- */
  hi: {
    playVoice:      'आवाज़ मार्गदर्शिका चलाएँ',
    playingVoice:   'आवाज़ मार्गदर्शिका चल रही है…',
    takeQuiz:       'क्विज़ शुरू करें →',

    quickQuiz:      '✦ क्विक क्विज़',
    questionOf:     'प्रश्न {current} / {total}',
    scoreLbl:       'स्कोर',
    submitAnswer:   'उत्तर जमा करें',
    nextQuestion:   'अगला प्रश्न →',
    seeResults:     'परिणाम देखें →',

    correct:        'सही! बहुत बढ़िया।',
    wrong:          'सही नहीं — कारण देखें:',

    lessonComplete: 'पाठ पूरा हुआ!',
    keepLearning:   'सीखते रहें!',
    resultPass:     'शानदार! आपने मूल बातें सीख लीं। अगले मॉड्यूल के लिए तैयार हैं।',
    resultFail:     'आपने अच्छा प्रयास किया! पाठ दोबारा पढ़ें और फिर से कोशिश करें।',
    viewProgress:   'मेरी प्रगति देखें →',
    exploreModules: 'और मॉड्यूल देखें',
  },

  /* ---- Telugu ---- */
  te: {
    playVoice:      'వాయిస్ గైడ్ ప్లే చేయండి',
    playingVoice:   'వాయిస్ గైడ్ ప్లే అవుతోంది…',
    takeQuiz:       'క్విజ్ ప్రారంభించండి →',

    quickQuiz:      '✦ క్విక్ క్విజ్',
    questionOf:     'ప్రశ్న {current} / {total}',
    scoreLbl:       'స్కోర్',
    submitAnswer:   'జవాబు సమర్పించండి',
    nextQuestion:   'తదుపరి ప్రశ్న →',
    seeResults:     'ఫలితాలు చూడండి →',

    correct:        'సరైనది! బాగా చేశారు.',
    wrong:          'సరికాదు — కారణం చూడండి:',

    lessonComplete: 'పాఠం పూర్తయింది!',
    keepLearning:   'నేర్చుకుంటూ ఉండండి!',
    resultPass:     'అద్భుతం! మీరు ప్రాథమిక అంశాలు నేర్చుకున్నారు. తదుపరి మాడ్యూల్‌కు సిద్ధంగా ఉన్నారు.',
    resultFail:     'మీరు మంచి ప్రయత్నం చేశారు! పాఠాన్ని మళ్లీ చదివి ప్రయత్నించండి.',
    viewProgress:   'నా ప్రగతి చూడండి →',
    exploreModules: 'మరిన్ని మాడ్యూల్స్ చూడండి',
  },
}

// ---------------------------------------------------------------
// Quiz questions — per language
// ---------------------------------------------------------------

export const quizQuestions = {

  en: [
    {
      id: 1,
      question: 'Which of the following should you NEVER share with anyone?',
      options: [
        'Your full name',
        'Your UPI PIN or OTP',
        'Your UPI ID',
        'Your phone number',
      ],
      correct: 1,
      explanation:
        'Your UPI PIN and OTP are secret codes that protect your money. Never share them with anyone — not even bank officials or customer care.',
    },
    {
      id: 2,
      question: 'To receive money on UPI, what do you need to do?',
      options: [
        'Enter your PIN',
        'Share your OTP',
        'Just share your UPI ID — no PIN needed',
        'Call your bank first',
      ],
      correct: 2,
      explanation:
        'To receive money, you only need to share your UPI ID or QR code. You never need to enter your PIN to receive payments.',
    },
    {
      id: 3,
      question:
        'You receive a call saying your account will be blocked and you need to share your OTP. What should you do?',
      options: [
        'Share the OTP quickly to avoid blocking',
        'Ask for their employee ID first, then share',
        'Hang up — this is a scam',
        'Send the OTP over WhatsApp instead',
      ],
      correct: 2,
      explanation:
        'This is a classic fraud call. Real bank employees will never ask for your OTP. Always hang up and call your bank on the official number.',
    },
  ],

  hi: [
    {
      id: 1,
      question: 'निम्न में से कौन सी चीज़ आपको कभी किसी के साथ साझा नहीं करनी चाहिए?',
      options: [
        'आपका पूरा नाम',
        'आपका UPI PIN या OTP',
        'आपकी UPI ID',
        'आपका फ़ोन नंबर',
      ],
      correct: 1,
      explanation:
        'आपका UPI PIN और OTP गुप्त कोड हैं जो आपके पैसे की सुरक्षा करते हैं। इन्हें कभी किसी के साथ साझा न करें — बैंक अधिकारियों या कस्टमर केयर के साथ भी नहीं।',
    },
    {
      id: 2,
      question: 'UPI पर पैसे प्राप्त करने के लिए आपको क्या करना होगा?',
      options: [
        'अपना PIN दर्ज करें',
        'अपना OTP साझा करें',
        'बस अपनी UPI ID साझा करें — PIN की ज़रूरत नहीं',
        'पहले अपने बैंक को कॉल करें',
      ],
      correct: 2,
      explanation:
        'पैसे प्राप्त करने के लिए आपको सिर्फ़ अपनी UPI ID या QR कोड साझा करना होगा। पैसे प्राप्त करने के लिए कभी PIN दर्ज करने की ज़रूरत नहीं होती।',
    },
    {
      id: 3,
      question:
        'आपको एक कॉल आता है कि आपका अकाउंट ब्लॉक हो जाएगा और आपको OTP साझा करना होगा। आपको क्या करना चाहिए?',
      options: [
        'ब्लॉक होने से बचने के लिए जल्दी OTP साझा करें',
        'पहले उनकी एम्प्लॉई ID पूछें, फिर साझा करें',
        'फ़ोन काट दें — यह एक धोखाधड़ी है',
        'WhatsApp पर OTP भेजें',
      ],
      correct: 2,
      explanation:
        'यह एक क्लासिक धोखाधड़ी कॉल है। असली बैंक कर्मचारी कभी आपसे OTP नहीं माँगेंगे। हमेशा फ़ोन काटें और आधिकारिक नंबर पर बैंक को कॉल करें।',
    },
  ],

  te: [
    {
      id: 1,
      question: 'కింది వాటిలో మీరు ఎప్పుడూ ఎవరితోనూ షేర్ చేయకూడనిది ఏది?',
      options: [
        'మీ పూర్తి పేరు',
        'మీ UPI PIN లేదా OTP',
        'మీ UPI ID',
        'మీ ఫోన్ నంబర్',
      ],
      correct: 1,
      explanation:
        'మీ UPI PIN మరియు OTP మీ డబ్బును రక్షించే రహస్య కోడ్‌లు. వాటిని ఎవరితోనూ షేర్ చేయకండి — బ్యాంక్ అధికారులు లేదా కస్టమర్ కేర్‌తో కూడా కాదు.',
    },
    {
      id: 2,
      question: 'UPI ద్వారా డబ్బు స్వీకరించడానికి మీరు ఏం చేయాలి?',
      options: [
        'మీ PIN నమోదు చేయండి',
        'మీ OTP షేర్ చేయండి',
        'మీ UPI ID షేర్ చేస్తే చాలు — PIN అవసరం లేదు',
        'ముందు మీ బ్యాంక్‌కు కాల్ చేయండి',
      ],
      correct: 2,
      explanation:
        'డబ్బు స్వీకరించడానికి మీరు మీ UPI ID లేదా QR కోడ్ మాత్రమే షేర్ చేయాలి. చెల్లింపులు స్వీకరించడానికి PIN నమోదు చేయవలసిన అవసరం ఎప్పుడూ లేదు.',
    },
    {
      id: 3,
      question:
        'మీ ఖాతా బ్లాక్ అవుతుందని, OTP షేర్ చేయమని ఒక కాల్ వస్తుంది. మీరు ఏం చేయాలి?',
      options: [
        'బ్లాక్ కాకుండా ఉండేందుకు వెంటనే OTP షేర్ చేయండి',
        'ముందు వారి ఎంప్లాయీ ID అడగండి, తర్వాత షేర్ చేయండి',
        'ఫోన్ పెట్టేయండి — ఇది మోసం',
        'WhatsApp లో OTP పంపండి',
      ],
      correct: 2,
      explanation:
        'ఇది ఒక సాధారణ మోసపూరిత కాల్. నిజమైన బ్యాంక్ ఉద్యోగులు ఎప్పుడూ మీ OTP అడగరు. ఎల్లప్పుడూ ఫోన్ పెట్టేసి, అధికారిక నంబర్‌కు బ్యాంక్‌కు కాల్ చేయండి.',
    },
  ],
}

const leagues = {
    "England": [
        { "Premier League": "الدوري الإنجليزي الممتاز" },
        { "EFL Championship": "دوري البطولة الإنجليزية" }
    ],
    "Spain": [
        { "La Liga": "الدوري الإسباني" },
        { "Segunda División": "الدرجة الثانية الإسبانية" }
    ],
    "Germany": [
        { "Bundesliga": "الدوري الألماني" },
        { "2. Bundesliga": "الدرجة الثانية الألمانية" }
    ],
    "Italy": [
        { "Serie A": "الدوري الإيطالي" },
        { "Serie B": "الدرجة الثانية الإيطالية" }
    ],
    "France": [
        { "Ligue 1": "الدوري الفرنسي" },
        { "Ligue 2": "الدرجة الثانية الفرنسية" }
    ],
    "Portugal": [
        { "Primeira Liga": "الدوري البرتغالي الممتاز" },
        { "Liga Portugal 2": "الدوري البرتغالي الدرجة الثانية" }
    ],
    "Netherlands": [
        { "Eredivisie": "الدوري الهولندي الممتاز" },
        { "Eerste Divisie": "الدوري الهولندي الدرجة الثانية" }
    ],
    "Belgium": [
        { "Pro League": "الدوري البلجيكي الممتاز" },
        { "Challenger Pro League": "الدوري البلجيكي الدرجة الثانية" }
    ],
    "Russia": [
        { "Premier League": "الدوري الروسي الممتاز" },
        { "First League": "الدوري الروسي الدرجة الأولى" }
    ],
    "Turkey": [
        { "Süper Lig": "الدوري التركي الممتاز" },
        { "First League": "الدوري التركي الدرجة الأولى" }
    ],
    "Greece": [
        { "Super League": "الدوري اليوناني الممتاز" },
        { "Super League 2": "الدوري اليوناني الدرجة الثانية" }
    ],
    "Sweden": [
        { "Allsvenskan": "الدوري السويدي الممتاز" },
        { "Superettan": "الدوري السويدي الدرجة الثانية" }
    ],
    "Norway": [
        { "Eliteserien": "الدوري النرويجي الممتاز" },
        { "OBOS-ligaen": "الدوري النرويجي الدرجة الثانية" }
    ],
    "Denmark": [
        { "Superliga": "الدوري الدنماركي الممتاز" },
        { "1st Division": "الدوري الدنماركي الدرجة الأولى" }
    ],
    "Switzerland": [
        { "Super League": "الدوري السويسري الممتاز" },
        { "Challenge League": "الدوري السويسري الدرجة الثانية" }
    ],
    "Austria": [
        { "Bundesliga": "الدوري النمساوي الممتاز" },
        { "2. Liga": "الدوري النمساوي الدرجة الثانية" }
    ],
    "Poland": [
        { "Ekstraklasa": "الدوري البولندي الممتاز" },
        { "I liga": "الدوري البولندي الدرجة الأولى" }
    ],
    "Czech Republic": [
        { "First League": "الدوري التشيكي الممتاز" },
        { "National Football League": "الدوري التشيكي الدرجة الثانية" }
    ],
    "Ukraine": [
        { "Premier League": "الدوري الأوكراني الممتاز" },
        { "First League": "الدوري الأوكراني الدرجة الأولى" }
    ],
    "Romania": [
        { "Liga I": "الدوري الروماني الممتاز" },
        { "Liga II": "الدوري الروماني الدرجة الثانية" }
    ],
    "Serbia": [
        { "SuperLiga": "الدوري الصربي الممتاز" },
        { "First League": "الدوري الصربي الدرجة الأولى" }
    ],
    "Croatia": [
        { "Prva HNL": "الدوري الكرواتي الممتاز" },
        { "Druga HNL": "الدوري الكرواتي الدرجة الثانية" }
    ],
    "Hungary": [
        { "Nemzeti Bajnokság I": "الدوري المجري الممتاز" },
        { "Nemzeti Bajnokság II": "الدوري المجري الدرجة الثانية" }
    ],
    "Bulgaria": [
        { "First Professional Football League": "الدوري البلغاري الممتاز" },
        { "Second Professional Football League": "الدوري البلغاري الدرجة الثانية" }
    ],
    "Slovakia": [
        { "Fortuna Liga": "الدوري السلوفاكي الممتاز" },
        { "2. Liga": "الدوري السلوفاكي الدرجة الثانية" }
    ],
    "Slovenia": [
        { "PrvaLiga": "الدوري السلوفيني الممتاز" },
        { "2. SNL": "الدوري السلوفيني الدرجة الثانية" }
    ],
    "Bosnia and Herzegovina": [
        { "Premier League": "الدوري البوسني الممتاز" },
        { "First League of the Federation": "الدوري البوسني الدرجة الأولى - الاتحاد" }
    ],
    "Albania": [
        { "Kategoria Superiore": "الدوري الألباني الممتاز" },
        { "Kategoria e Parë": "الدوري الألباني الدرجة الأولى" }
    ],
    "North Macedonia": [
        { "First Football League": "الدوري المقدوني الممتاز" },
        { "Second Football League": "الدوري المقدوني الدرجة الثانية" }
    ],
    "Montenegro": [
        { "First League": "الدوري المونتينيغري الممتاز" },
        { "Second League": "الدوري المونتينيغري الدرجة الثانية" }
    ],
    "Kosovo": [
        { "Superleague": "الدوري الكوسوفي الممتاز" },
        { "First Football League": "الدوري الكوسوفي الدرجة الأولى" }
    ],
    "Iceland": [
        { "Úrvalsdeild karla": "الدوري الأيسلندي الممتاز" },
        { "1. deild karla": "الدوري الأيسلندي الدرجة الأولى" }
    ],
    "Finland": [
        { "Veikkausliiga": "الدوري الفنلندي الممتاز" },
        { "Ykkönen": "الدوري الفنلندي الدرجة الأولى" }
    ],
    "Estonia": [
        { "Meistriliiga": "الدوري الإستوني الممتاز" },
        { "Esiliiga": "الدوري الإستوني الدرجة الأولى" }
    ],
    "Latvia": [
        { "Virslīga": "الدوري اللاتفي الممتاز" },
        { "1. līga": "الدوري اللاتفي الدرجة الأولى" }
    ],
    "Lithuania": [
        { "A Lyga": "الدوري الليتواني الممتاز" },
        { "I Lyga": "الدوري الليتواني الدرجة الأولى" }
    ],
    "Belarus": [
        { "Premier League": "الدوري البيلاروسي الممتاز" },
        { "First League": "الدوري البيلاروسي الدرجة الأولى" }
    ],
    "Georgia": [
        { "Erovnuli Liga": "الدوري الجورجي الممتاز" },
        { "Erovnuli Liga 2": "الدوري الجورجي الدرجة الثانية" }
    ],
    "Armenia": [
        { "Premier League": "الدوري الأرميني الممتاز" },
        { "First League": "الدوري الأرميني الدرجة الأولى" }
    ],
    "Azerbaijan": [
        { "Premier League": "الدوري الأذربيجاني الممتاز" },
        { "First Division": "الدوري الأذربيجاني الدرجة الأولى" }
    ],
    "Kazakhstan": [
        { "Premier League": "الدوري الكازاخستاني الممتاز" },
        { "First Division": "الدوري الكازاخستاني الدرجة الأولى" }
    ],
    "Saudi Arabia": [
        { "Professional League": "دوري المحترفين السعودي" },
        { "First Division League": "دوري الدرجة الأولى السعودي" }
    ],
    "United Arab Emirates": [
        { "Pro League": "دوري المحترفين الإماراتي" },
        { "First Division League": "دوري الدرجة الأولى الإماراتي" }
    ],
    "Qatar": [
        { "Stars League": "دوري نجوم قطر" },
        { "Second Division": "دوري الدرجة الثانية القطري" }
    ],
    "Kuwait": [
        { "Premier League": "الدوري الكويتي الممتاز" },
        { "Division One": "الدوري الكويتي الدرجة الأولى" }
    ],
    "Bahrain": [
        { "Premier League": "الدوري البحريني الممتاز" },
        { "Second Division": "الدوري البحريني الدرجة الثانية" }
    ],
    "Oman": [
        { "Professional League": "الدوري العماني للمحترفين" },
        { "First Division League": "دوري الدرجة الأولى العماني" }
    ],
    "Jordan": [
        { "Pro League": "الدوري الأردني للمحترفين" },
        { "League Division 1": "الدوري الأردني الدرجة الأولى" }
    ],
    "Lebanon": [
        { "Premier League": "الدوري اللبناني الممتاز" },
        { "Second Division": "الدوري اللبناني الدرجة الثانية" }
    ],
    "Syria": [
        { "Premier League": "الدوري السوري الممتاز" },
        { "League 1st Division": "الدوري السوري الدرجة الأولى" }
    ],
    "Iraq": [
        { "Premier League": "الدوري العراقي الممتاز" },
        { "Division One": "الدوري العراقي الدرجة الأولى" }
    ],
    "Palestine": [
        { "West Bank Premier League": "دوري الضفة الغربية الممتاز" },
        { "West Bank First League": "دوري الضفة الغربية الدرجة الأولى" }
    ],
    "Yemen": [
        { "League": "الدوري اليمني الممتاز" },
        { "Second Division": "الدوري اليمني الدرجة الثانية" }
    ],
    "Iran": [
        { "Pro League": "دوري الخليج الفارسي للمحترفين" },
        { "Azadegan League": "دوري آزادغان (الدرجة الأولى)" }
    ],
    "Egypt": [
        { "Premier League": "الدوري المصري الممتاز" },
        { "Second Division A": "الدوري المصري الدرجة الثانية (أ)" }
    ],
    "Algeria": [
        { "Ligue Professionnelle 1": "الرابطة الجزائرية المحترفة الأولى" },
        { "Ligue 2": "الرابطة الجزائرية الثانية" }
    ],
    "Morocco": [
        { "Botola Pro": "البطولة المغربية الاحترافية" },
        { "Botola 2": "البطولة الوطنية القسم الثاني" }
    ],
    "Tunisia": [
        { "Ligue Professionnelle 1": "الرابطة التونسية المحترفة الأولى" },
        { "Ligue Professionnelle 2": "الرابطة التونسية المحترفة الثانية" }
    ],
    "Libya": [
        { "Premier League": "الدوري الليبي الممتاز" },
        { "First Division": "الدوري الليبي الدرجة الأولى" }
    ],
    "Sudan": [
        { "Premier League": "الدوري السوداني الممتاز" },
        { "First Division": "الدوري السوداني الدرجة الأولى" }
    ],
    "Mauritania": [
        { "Super D1": "الدوري الموريتاني الممتاز" },
        { "Second Division": "الدوري الموريتاني الدرجة الثانية" }
    ],
    "Somalia": [
        { "Premier League": "الدوري الصومالي الممتاز" },
        { "Second Division": "الدوري الصومالي الدرجة الثانية" }
    ],
    "Djibouti": [
        { "Premier League": "الدوري الجيبوتي الممتاز" },
        { "Division 2": "الدوري الجيبوتي الدرجة الثانية" }
    ],
    "Comoros": [
        { "Premier League": "الدوري القمري الممتاز" },
        { "Second Division": "الدوري القمري الدرجة الثانية" }
    ],
    "Brazil": [
        { "Série A": "الدوري البرازيلي - الدرجة الأولى" },
        { "Série B": "الدوري البرازيلي - الدرجة الثانية" }
    ],
    "Argentina": [
        { "Primera División": "الدوري الأرجنتيني الممتاز" },
        { "Primera Nacional": "الدرجة الثانية الأرجنتينية" }
    ],
    "Japan": [
        { "J1 League": "دوري الدرجة الأولى الياباني" },
        { "J2 League": "دوري الدرجة الثانية الياباني" }
    ],
    "China": [
        { "Super League": "الدوري الصيني الممتاز" },
        { "League One": "الدوري الصيني - الدرجة الأولى" }
    ]
    ,
  "World": [
    {"FIFA World Cup": "كأس العالم"},
    {"UEFA European Championship": "بطولة أمم أوروبا"},    
      {"Copa América": "كوبا أمريكا"}
    ,    
      {"AFC Asian Cup": "كأس آسيا"}
    ,    
      {"CAF Africa Cup of Nations": "كأس الأمم الأفريقية"}
    ,    
      {"CONCACAF Gold Cup": "كأس الكونكاكاف الذهبية"}
    ,    
      {"OFC Nations Cup": "كأس أمم أوقيانوسيا"}
    ,    
      {"UEFA Nations League": "دوري أمم أوروبا"}
    ,    
      {"FIFA Confederations Cup": "كأس القارات"}
    ,    
      {"Olympic Football Tournament": "بطولة كرة القدم الأولمبية"}
    ,    
      {"FIFA Club World Cup": "كأس العالم للأندية"}
    ,    
      {"UEFA Champions League": "دوري أبطال أوروبا"}
    ,
        {"Promotion - Champions League (Play Offs: 1/8-finals)": "الترقية - دوري أبطال أوروبا (ملحق: دور الـ 16)"}
    ,
        {"Promotion - Champions League (Play Offs: 1/16-finals)": "الترقية - دوري أبطال أوروبا (ملحق: دور الـ 32)"}
    ,  
        {"UEFA Europa League": "الدوري الأوروبي"}
    ,    
      {"Europa Conference League": "دوري المؤتمر الأوروبي"}
    ,    
      {"Copa Libertadores": "كوبا ليبرتادوريس"}
    ,    
      {"Copa Sudamericana": "كوبا سود أمريكانا"}
    ,    
      {"AFC Champions League": "دوري أبطال آسيا"}
    ,    
      {"CAF Champions League": "دوري أبطال أفريقيا"}
    ,    
      {"CONCACAF Champions Cup": "كأس أبطال الكونكاكاف"}
    ,
      {"AFC Cup": "كأس الاتحاد الآسيوي"}
    ,    
      {"CAF Confederation Cup": "كأس الكونفدرالية الأفريقية"}
      ,
      {"Relegation": "الهبوط"}
  ]

}

const rounds = {
    "Championship Round":"مرحلة البطولة",
    "Relegation Round": "مرحلة الهبوط",
    "Regular Season": "الأسبوع",
    "1st Qualifying Round": "الجولة التأهيلية الأولى",
    "2nd Qualifying Round": "الجولة التأهيلية الثانية",
    "3rd Qualifying Round": "الجولة التأهيلية الثالثة",
    "4th Qualifying Round": "الجولة التأهيلية الرابعة",
    "Leage Stage - 1": "مرحلة الدوري - 1",
    "Leage Stage - 2": "مرحلة الدوري - 2",
    "Leage Stage - 3": "مرحلة الدوري - 3",
    "Leage Stage - 4": "مرحلة الدوري - 4",
    "Leage Stage - 5": "مرحلة الدوري - 5",
    "Leage Stage - 6": "مرحلة الدوري - 6",
    "Leage Stage - 7": "مرحلة الدوري - 7",
    "Leage Stage - 8": "مرحلة الدوري - 8",
    "Leage Stage - 9": "مرحلة الدوري - 9",
    "Leage Stage - 10": "مرحلة الدوري - 10",
    "Playoffs": "مرحلة الترقي",
    "Final": "النهائي",
    "Group Stage": "مرحلة المجموعات",
    "Knockout Stage" : "مرحلة الإقصائيات",
    "Round of 16": "دور ال 16",
    "Quarter-finals": "دور ربع النهائي",
    "Semi-finals": "دور قبل النهائي ",
    "Group A": "مجموعة 1",
    "Group B": "مجموعة 2",
    "Group C": "مجموعة 3",
    "Group D": "مجموعة 4",
    "Group E": "مجموعة 5",
    "Group F": "مجموعة 6",
    "Group G": "مجموعة 7",
    "Group H": "مجموعة 8",
    "Group I": "مجموعة 9",
    "Group J": "مجموعة 10",
    "Group K": "مجموعة 11",
    "Group L": "مجموعة 12"
}
export function getLeagueTranslationByCountry(country,league) {
    let leagueName = "";
    leagues[country]?.map((elem)=>{
        if (Object.keys(elem)[0] === league) {
          leagueName =  elem[league];
        }
        return leagueName
    });
   return leagueName;
}
export function getRoundTranslation(round){
    let roundName = "";
    Object.keys(rounds).map((elem)=>{
        if (elem === round.slice(0,round.indexOf('-')-1)) {
            roundName =  rounds[elem] + ' ' + round.slice(round.indexOf('-'),round.length);
        }
        else if(elem === round) {
            roundName =  rounds[elem]
        }
        return roundName
    });
   return roundName;
}
 

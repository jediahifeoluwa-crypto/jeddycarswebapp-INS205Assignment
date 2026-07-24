// vehicle inventory — swap this for a real API call once the backend is wired up

// pulling these from wikimedia commons for now, keyed by vehicle id
const WIKI_IMG = {
  "mb-gle-coupe": ["https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_GLE_43_Coupe_1Y7A4927.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Benz_GLE_Coup%C3%A9_(C167)_(48820352726).jpg?width=1200"],
  "mb-c-class": ["https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Benz_C_200_4MATIC_AVANTGARDE_(W206)_front.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Benz_C_200_4MATIC_AVANTGARDE_(W206)_interior.jpg?width=1200"],
  "mb-s-class": ["https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Benz_W223_1X7A7340.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/MERCEDES-BENZ_S-CLASS_(W223)_China_(21).jpg?width=1200"],
  "mb-g-wagon": ["https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_G_63_(W464)_front.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-AMG_G_63_Genf_2018.jpg?width=1200"],
  "toyota-corolla": ["https://commons.wikimedia.org/wiki/Special:FilePath/Toyota_Corolla_(E180)_sedan_facelift_1X7A0305.jpg?width=1200"],
  "toyota-camry": ["https://commons.wikimedia.org/wiki/Special:FilePath/Toyota_Camry_Hybrid_XSE_XV70_FL_Precious_Metal_(5).jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/TOYOTA_CAMRY_HYBRID_(XV70)_China_(6).jpg?width=1200"],
  "toyota-prado": ["https://commons.wikimedia.org/wiki/Special:FilePath/Toyota_Land_Cruiser_Prado_150.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/Toyota_LAND_CRUISER_PRADO_TX_(CBA-TRJ150W-GKTEK)_front.jpg?width=1200"],
  "toyota-land-cruiser": ["https://commons.wikimedia.org/wiki/Special:FilePath/2023_Toyota_Land_Cruiser_J300_3.4_GR_Sport_V6_Twin_Turbo_in_Attitude_Black_Mica%2C_front_left%2C_05-24-2024.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/Toyota_Land_Cruiser_300_4x4_VXR_2023_(5).jpg?width=1200"],
  "dodge-hellcat": ["https://commons.wikimedia.org/wiki/Special:FilePath/Dodge_Challenger_SRT_Hellcat_front_(20418607854).jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/Dodge_Challenger_SRT_Hellcat_(40232378470).jpg?width=1200"],
  "dodge-charger": ["https://commons.wikimedia.org/wiki/Special:FilePath/2019_Dodge_Charger_R-T_IMG_5381.jpg?width=1200"],
  "changan-uniz": ["https://commons.wikimedia.org/wiki/Special:FilePath/Changan_UNI-Z_001.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/Changan_UNI-Z_002.jpg?width=1200"],
  "bmw-m4": ["https://commons.wikimedia.org/wiki/Special:FilePath/2024_BMW_M4_(G82)_Competition_IMG_9375.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/2024_BMW_M4_(G82)_Competition_DSC_7856.jpg?width=1200"],
  "bmw-x7": ["https://commons.wikimedia.org/wiki/Special:FilePath/BMW_G07_X7_xDrive40i_Design_Pure_Excellence_Black_Sapphire_Metallic_(6).jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/BMW_G07_(2022)_1X7A6450.jpg?width=1200"],
  "lexus-rx": ["https://commons.wikimedia.org/wiki/Special:FilePath/2023_Lexus_RX_350_(front).jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/2023_Lexus_RX_350_Executive_Package_in_Iridium%2C_Front_Left%2C_01-16-2023.jpg?width=1200"],
  "lexus-lx": ["https://commons.wikimedia.org/wiki/Special:FilePath/2023_Lexus_LX_600%2C_front_6.13.24.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/2023_Lexus_LX_600%2C_rear_6.14.24.jpg?width=1200"],
  "porsche-cayenne": ["https://commons.wikimedia.org/wiki/Special:FilePath/2023_Porsche_Cayenne_S_IMG_0521.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/2023_Porsche_Cayenne_S_IAA_2023_1X7A0025.jpg?width=1200"],
  "tesla-model-s": ["https://commons.wikimedia.org/wiki/Special:FilePath/Tesla_Model_S_Plaid_Autofr%C3%BChling_Ulm_IMG_9278.jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/Tesla_Model_S_(28898945604).jpg?width=1200"],
  "range-rover-sport": ["https://commons.wikimedia.org/wiki/Special:FilePath/Land_Rover_Range_Rover_Sport_L461_Varesine_Blue_(13).jpg?width=1200","https://commons.wikimedia.org/wiki/Special:FilePath/Land_Rover_Range_Rover_Sport_P400_Autobiography_L461_Fuji_White_(15).jpg?width=1200"],
};

function gallery(...imgs){ return imgs; }

const VEHICLES = [
  {
    id:"mb-gle-coupe", brand:"Mercedes-Benz", model:"GLE Coupe", year:2024, price:78500,
    body:"SUV Coupe", condition:"New", mileage:120, fuel:"Petrol", transmission:"9G-Tronic Automatic",
    engine:"3.0L Inline-6 Turbo", horsepower:375, drivetrain:"AWD (4MATIC)",
    exterior:"Obsidian Black Metallic", interior:"Espresso Brown Nappa Leather",
    vin:"WDC2539842A123456", status:"available", tag:"new", featured:true, bestseller:false,
    images: WIKI_IMG["mb-gle-coupe"],
    features:["Panoramic Sunroof","Burmester 3D Sound","Air Body Control","360° Camera","Adaptive Cruise Control","Heated & Ventilated Seats","Ambient Lighting","Wireless CarPlay"],
    description:"The GLE Coupe blends SUV command with saloon elegance — a coupé silhouette wrapped around Mercedes' most advanced cabin tech, tuned for effortless high-speed touring."
  },
  {
    id:"mb-c-class", brand:"Mercedes-Benz", model:"C-Class", year:2023, price:44900,
    body:"Sedan", condition:"Used", mileage:12500, fuel:"Petrol", transmission:"9-Speed Automatic",
    engine:"2.0L Inline-4 Turbo", horsepower:255, drivetrain:"RWD",
    exterior:"Polar White", interior:"Black MB-Tex",
    vin:"WDD2050462F654321", status:"available", tag:"", featured:true, bestseller:true,
    images: WIKI_IMG["mb-c-class"],
    features:["MBUX Infotainment","Keyless Go","LED Headlamps","Lane Keep Assist","Heated Seats","Rear Camera"],
    description:"A benchmark compact executive sedan — precise, quiet, and effortlessly composed for the daily commute or the open highway."
  },
  {
    id:"mb-s-class", brand:"Mercedes-Benz", model:"S-Class", year:2024, price:118900,
    body:"Sedan", condition:"New", mileage:80, fuel:"Petrol", transmission:"9G-Tronic Automatic",
    engine:"3.0L Inline-6 Turbo Hybrid", horsepower:429, drivetrain:"AWD (4MATIC)",
    exterior:"Diamond White Bright", interior:"Macchiato Beige Nappa Leather",
    vin:"WDD2223612A789012", status:"reserved", tag:"bestseller", featured:true, bestseller:true,
    images: WIKI_IMG["mb-s-class"],
    features:["Executive Rear Seats","MBUX Hyperscreen","Burmester 4D Sound","Active Ambient Lighting","Massage Seats","Rear-Wheel Steering","Night Vision Assist"],
    description:"The S-Class remains the reference point for the modern luxury flagship — a rolling first-class cabin engineered down to the last millimetre."
  },
  {
    id:"mb-g-wagon", brand:"Mercedes-Benz", model:"G-Wagon (G 63 AMG)", year:2024, price:189900,
    body:"SUV", condition:"New", mileage:200, fuel:"Petrol", transmission:"9-Speed AMG Speedshift",
    engine:"4.0L V8 Biturbo", horsepower:577, drivetrain:"AWD (4MATIC)",
    exterior:"AMG Green Hell Magno", interior:"Black Nappa Leather w/ Red Stitching",
    vin:"WDCYC7HJ0GX123987", status:"available", tag:"bestseller", featured:true, bestseller:true,
    images: WIKI_IMG["mb-g-wagon"],
    features:["G-Manettes","3 Locking Differentials","Portal Axles","AMG Sport Exhaust","Burmester Sound","Off-Road Package"],
    description:"Boxy, brutal, and unmistakably iconic — the G-Wagon delivers true off-road hardware wrapped in unapologetic luxury."
  },
  {
    id:"toyota-corolla", brand:"Toyota", model:"Corolla", year:2023, price:23400,
    body:"Sedan", condition:"Used", mileage:18000, fuel:"Petrol", transmission:"CVT Automatic",
    engine:"2.0L Inline-4", horsepower:169, drivetrain:"FWD",
    exterior:"Celestite Grey Metallic", interior:"Black Fabric",
    vin:"JTDBAMFE9P3123456", status:"available", tag:"", featured:false, bestseller:true,
    images: WIKI_IMG["toyota-corolla"],
    features:["Toyota Safety Sense 3.0","Apple CarPlay","Adaptive Cruise Control","Blind Spot Monitor"],
    description:"Dependable, efficient, and refined — the Corolla remains the smartest entry point into everyday premium motoring."
  },
  {
    id:"toyota-camry", brand:"Toyota", model:"Camry", year:2024, price:29800,
    body:"Sedan", condition:"New", mileage:50, fuel:"Hybrid", transmission:"e-CVT",
    engine:"2.5L Hybrid Inline-4", horsepower:225, drivetrain:"FWD",
    exterior:"Wind Chill Pearl", interior:"Macadamia Leather",
    vin:"4T1C11AK7PU456789", status:"available", tag:"new", featured:true, bestseller:false,
    images: WIKI_IMG["toyota-camry"],
    features:["JBL Premium Audio","Wireless Charging","Digital Rearview Mirror","Adaptive Cruise Control"],
    description:"The Camry Hybrid pairs class-leading efficiency with a genuinely upscale cabin — comfort tuned for long-distance composure."
  },
  {
    id:"toyota-prado", brand:"Toyota", model:"Land Cruiser Prado", year:2023, price:52900,
    body:"SUV", condition:"Used", mileage:9800, fuel:"Diesel", transmission:"6-Speed Automatic",
    engine:"2.8L Turbo Diesel", horsepower:201, drivetrain:"4WD",
    exterior:"Graphite Metallic", interior:"Sand Beige Leather",
    vin:"JTEBU5JR9P5654321", status:"available", tag:"", featured:false, bestseller:true,
    images: WIKI_IMG["toyota-prado"],
    features:["Multi-Terrain Select","Crawl Control","3rd Row Seating","KDSS Suspension"],
    description:"Legendary go-anywhere capability with a genuinely comfortable, family-ready cabin — the Prado is built to outlast everything else in the garage."
  },
  {
    id:"toyota-land-cruiser", brand:"Toyota", model:"Land Cruiser 300", year:2024, price:84500,
    body:"SUV", condition:"New", mileage:300, fuel:"Diesel", transmission:"10-Speed Automatic",
    engine:"3.3L Twin-Turbo V6 Diesel", horsepower:305, drivetrain:"4WD",
    exterior:"Precious White Pearl", interior:"Black Semi-Aniline Leather",
    vin:"JTMHV05J104112233", status:"available", tag:"bestseller", featured:true, bestseller:true,
    images: WIKI_IMG["toyota-land-cruiser"],
    features:["E-KDSS","Multi-Terrain Monitor","10.1-inch Touchscreen","JBL Premium Sound","Adaptive Variable Suspension"],
    description:"The full-size Land Cruiser returns with a lighter body, a torquier heart, and the unbreakable reputation the nameplate is built on."
  },
  {
    id:"dodge-hellcat", brand:"Dodge", model:"Challenger SRT Hellcat", year:2023, price:74900,
    body:"Coupe", condition:"Used", mileage:4200, fuel:"Petrol", transmission:"8-Speed Automatic",
    engine:"6.2L Supercharged V8", horsepower:717, drivetrain:"RWD",
    exterior:"Pitch Black", interior:"Black/Ruby Red Laguna Leather",
    vin:"2C3CDZC9XPH789456", status:"available", tag:"bestseller", featured:true, bestseller:true,
    images: WIKI_IMG["dodge-hellcat"],
    features:["Supercharged HEMI V8","Launch Control","Line Lock","Performance Exhaust","Brembo Brakes"],
    description:"717 horsepower of unfiltered American muscle — the Hellcat is theatre, violence, and nostalgia in equal measure."
  },
  {
    id:"dodge-charger", brand:"Dodge", model:"Charger R/T", year:2023, price:46200,
    body:"Sedan", condition:"Used", mileage:15600, fuel:"Petrol", transmission:"8-Speed Automatic",
    engine:"5.7L HEMI V8", horsepower:370, drivetrain:"RWD",
    exterior:"TorRed", interior:"Black Cloth/Leather",
    vin:"2C3CDXCT7PH321654", status:"available", tag:"", featured:false, bestseller:false,
    images: WIKI_IMG["dodge-charger"],
    features:["HEMI V8 Soundtrack","Sport Mode","Adaptive Damping Suspension","Uconnect 5"],
    description:"A four-door muscle car that still snarls like one — the Charger R/T is old-school swagger with modern infotainment."
  },
  {
    id:"changan-uniz", brand:"Changan", model:"UNI-Z", year:2024, price:31200,
    body:"SUV Coupe", condition:"New", mileage:60, fuel:"Petrol", transmission:"8-Speed Automatic",
    engine:"2.0L Turbo Inline-4", horsepower:227, drivetrain:"AWD",
    exterior:"Nebula Blue", interior:"Cognac Leatherette",
    vin:"LS5A3ABB9RA112244", status:"available", tag:"new", featured:false, bestseller:false,
    images: WIKI_IMG["changan-uniz"],
    features:["Panoramic Display","L2 Driver Assist","Ambient Lighting","Wireless Charging"],
    description:"A bold coupe-SUV silhouette and a tech-first cabin at a genuinely accessible price — the UNI-Z punches well above its class."
  },
  {
    id:"bmw-m4", brand:"BMW", model:"M4 Competition", year:2024, price:96900,
    body:"Coupe", condition:"New", mileage:150, fuel:"Petrol", transmission:"8-Speed M Steptronic",
    engine:"3.0L Twin-Turbo Inline-6", horsepower:503, drivetrain:"RWD",
    exterior:"Isle of Man Green Metallic", interior:"Black Merino Leather w/ Contrast Stitching",
    vin:"WBS43AZ0XPCE554433", status:"available", tag:"bestseller", featured:true, bestseller:true,
    images: WIKI_IMG["bmw-m4"],
    features:["M Carbon Bucket Seats","Adaptive M Suspension","M Carbon Ceramic Brakes","Harman Kardon Audio","Drift Analyzer"],
    description:"Razor-sharp, rear-driven, and endlessly adjustable — the M4 Competition is BMW's most focused road-legal weapon."
  },
  {
    id:"bmw-x7", brand:"BMW", model:"X7", year:2024, price:104500,
    body:"SUV", condition:"New", mileage:90, fuel:"Petrol", transmission:"8-Speed Automatic",
    engine:"4.4L Twin-Turbo V8", horsepower:523, drivetrain:"AWD (xDrive)",
    exterior:"Carbon Black Metallic", interior:"Ivory White Merino Leather",
    vin:"5UX23EM0XP9L667788", status:"available", tag:"new", featured:true, bestseller:false,
    images: WIKI_IMG["bmw-x7"],
    features:["3rd Row Captain Seats","Sky Lounge Panoramic Roof","Executive Lounge Seating","Bowers & Wilkins Sound","Air Suspension"],
    description:"BMW's flagship SUV seats seven in first-class comfort, with the road presence and cabin hush to match the price tag."
  },
  {
    id:"lexus-rx", brand:"Lexus", model:"RX 350", year:2024, price:54900,
    body:"SUV", condition:"New", mileage:110, fuel:"Petrol", transmission:"8-Speed Automatic",
    engine:"2.4L Turbo Inline-4", horsepower:275, drivetrain:"AWD",
    exterior:"Nori Green Pearl", interior:"Palomino Semi-Aniline Leather",
    vin:"2T2HZMDA8RC998877", status:"available", tag:"", featured:false, bestseller:true,
    images: WIKI_IMG["lexus-rx"],
    features:["Mark Levinson Audio","Panoramic View Monitor","Lexus Safety System+","Heated/Ventilated Seats"],
    description:"Quiet, plush, and impeccably built — the RX continues to define the modern luxury crossover experience."
  },
  {
    id:"lexus-lx", brand:"Lexus", model:"LX 600", year:2024, price:129900,
    body:"SUV", condition:"New", mileage:70, fuel:"Petrol", transmission:"10-Speed Automatic",
    engine:"3.4L Twin-Turbo V6", horsepower:409, drivetrain:"4WD",
    exterior:"Sonic Titanium", interior:"Black Semi-Aniline Leather",
    vin:"JTJHY7AX7R4556699", status:"reserved", tag:"bestseller", featured:true, bestseller:true,
    images: WIKI_IMG["lexus-lx"],
    features:["Executive Class Rear Seats","Adaptive Variable Suspension","Mark Levinson 3D Audio","Crawl Control","Multi-Terrain Select"],
    description:"Body-on-frame toughness dressed in first-class trim — the LX is the luxury off-roader that never breaks a sweat."
  },
  {
    id:"porsche-cayenne", brand:"Porsche", model:"Cayenne", year:2024, price:97800,
    body:"SUV", condition:"New", mileage:130, fuel:"Petrol", transmission:"8-Speed Tiptronic S",
    engine:"3.0L Turbo V6", horsepower:348, drivetrain:"AWD",
    exterior:"Jet Black Metallic", interior:"Bordeaux Red Leather",
    vin:"WP1AA2AY9RDA33221", status:"available", tag:"new", featured:true, bestseller:false,
    images: WIKI_IMG["porsche-cayenne"],
    features:["Sport Chrono Package","Air Suspension","Bose Surround Sound","Panoramic Roof","PASM Sport Suspension"],
    description:"A Porsche first, an SUV second — the Cayenne carries genuine sports-car reflexes into daily practicality."
  },
  {
    id:"tesla-model-s", brand:"Tesla", model:"Model S Plaid", year:2024, price:112900,
    body:"Sedan", condition:"New", mileage:40, fuel:"Electric", transmission:"Single-Speed Direct Drive",
    engine:"Tri-Motor Electric", horsepower:1020, drivetrain:"AWD",
    exterior:"Pearl White Multi-Coat", interior:"Black/White Vegan Leather",
    vin:"5YJSA1E20RF445566", status:"available", tag:"bestseller", featured:true, bestseller:true,
    images: WIKI_IMG["tesla-model-s"],
    features:["17-inch Cinematic Display","FSD Capability","Yoke Steering Option","405mi Range","Bioweapon Defense Mode"],
    description:"1020 horsepower, sub-2-second sprints, and near-400 miles of range — the Model S Plaid rewrites what a luxury sedan can do."
  },
  {
    id:"range-rover-sport", brand:"Range Rover", model:"Sport", year:2024, price:108900,
    body:"SUV", condition:"New", mileage:95, fuel:"Petrol Hybrid", transmission:"8-Speed Automatic",
    engine:"3.0L Inline-6 MHEV", horsepower:395, drivetrain:"AWD",
    exterior:"Santorini Black Metallic", interior:"Ebony Windsor Leather",
    vin:"SALGS2SE9RA778899", status:"available", tag:"bestseller", featured:true, bestseller:true,
    images: WIKI_IMG["range-rover-sport"],
    features:["Adaptive Air Suspension","Terrain Response 2","Meridian Signature Sound","Executive Class Seating","Active Noise Cancellation"],
    description:"Effortless on-road refinement backed by genuine off-road capability — the Sport is the connoisseur's Range Rover."
  }
];

// helpers used across pages
function fmtPrice(n){ return '$' + n.toLocaleString('en-US'); }
function fmtMileage(n){ return n===0 ? 'New' : n.toLocaleString('en-US') + ' mi'; }
function findVehicle(id){ return VEHICLES.find(v=>v.id===id); }
function similarVehicles(v, count=4){
  return VEHICLES.filter(x=>x.id!==v.id && (x.body===v.body || x.brand===v.brand)).slice(0,count);
}
const BRANDS = [...new Set(VEHICLES.map(v=>v.brand))];
const BODY_TYPES = [...new Set(VEHICLES.map(v=>v.body))];

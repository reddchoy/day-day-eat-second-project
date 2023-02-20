import { Knex } from "knex";
import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export async function seed(knex: Knex): Promise<void> {
  const trx = await knex.transaction();

  try {
    const users = [
      {
        username: "user1",
        password: await bcrypt.hash("1234", SALT_ROUNDS),
        email: "123@gmail.com",
        profile_pic: "review_pic-1671527714719-1.jpeg",
        mobile_number: "3333 4444",
      },
      {
        username: "user2",
        password: await bcrypt.hash("1234", SALT_ROUNDS),
        email: "123@gmail.com",
        profile_pic: "user2Icon.jpg",
        mobile_number: "5555 6666",
      },
    ];

    const restaurants = [
      {
        name: "焱丸水產",
        price: "$201-400",
        address: "尖沙咀棉登徑23號華楓大廈地下5&6號舖",
        phone_number: "26548200",
        description:
          "提供各種類和牛，刺身，壽司，不論是上等肉類或季節性時令食材皆選用高檔優質與水準。用餐環境舒適寬敞，令每一位顧客好好享受美味活水產。",
        business_hour: "12:15 - 15:00",
        mtr_station: "尖沙咀",
        rest_image: "https://static5.orstatic.com/userphoto2/photo/1W/1HZH/0ANWC8ACB89C3E7123314Btx.jpg",
        tag: "海鮮/壽司/刺身",
        view_number: 0,
      },
      {
        name: "八番屋",
        price: "$201-400",
        address: "大埔南運路9號新達廣場1樓012號舖",
        phone_number: "35858838",
        description:
          "日本接近30年歷史拉麵店，堅持日本元祖配方，自家熬煮濃厚豬骨湯底。每日人手製手工拉麵，特色微彎拉麵掛湯力十足，有Q彈粗麵、滑嫩幼麵2款選擇。必試招牌「豬軟骨野菜拉麵」、「極黑味玉野菜拉麵」、「吉列豬扒拉麵」。全場串燒即叫即燒，金黃微焦有炭香，同場丼飯、炸物、甜品都有。香港現有6間分店，包括八番屋、八番麵工房Deluxe、八番麵工房、八兆屋。想飲清酒慢食，推薦位於上水、居酒屋Feel的八番麵工房Deluxe。",
        business_hour: "11:00 - 22:00",
        mtr_station: "大埔墟",
        rest_image: "https://static8.orstatic.com/userphoto2/photo/18/Z27/06XBMJAFDA6AE8DFC89E63tx.jpg",
        tag: "拉麵",
        view_number: 0,
      },
      {
        name: "但馬屋",
        price: "$101-200",
        address: "葵芳興芳路223號新都會廣場2樓251-255號舖",
        phone_number: "24209381",
        description:
          "提供一人一鍋的和牛火鍋放題。有不少特色湯底選擇，包括女士至愛的骨膠原美肌鍋，還有Haagen Dazs雪糕任食。",
        business_hour: "12:00 - 22:00",
        mtr_station: "葵芳",
        rest_image: "https://static5.orstatic.com/userphoto/photo/Q/KPE/0438LK53A5A07848E7C846px.jpg)",
        tag: "涮涮鍋/火鍋",
        view_number: 0,
      },
      {
        name: "石鍋堂",
        price: " $51-100",
        address: "旺角通菜街2A-2P號鴻光大廈地下D號舖-255號舖",
        phone_number: "36895065",
        description:
          "石鍋堂是一間多元化日式小店除了主打的日式石鍋烏冬之外還有石頭鍋飯、串燒及其他日式料理滿足你對和食的多個願望帶給你味覺上多重享受！",
        business_hour: "12:00 - 16:00",
        mtr_station: "旺角",
        rest_image: "https://static5.orstatic.com/userphoto2/photo/1B/11N3/07FO60983B1111CA448B73lv.jpg",
        tag: "咖哩/烏冬/串燒",
      },
      {
        name: "天丼てんや",
        price: " $101-200",
        address: "青衣青敬路33號青衣城1期G02號舖",
        phone_number: "3905 4698",
        description:
          "天丼TENYA Hong Kong. 2022年10月27日󰞋󰟠. 【萬衆期待！屯門分店現已開幕 】 今次好多客人都估中我哋新分店位置 今日我哋隆重宣佈，屯門分店現已開幕！",
        business_hour: "12:00 - 16:00",
        mtr_station: "青衣",
        rest_image: "https://static5.orstatic.com/userphoto2/photo/1B/115F/07C6JG50B50F1FE8240562lv.jpg",
        tag: "天婦羅/丼飯",
      },
      {
        name: "殿大喜屋",
        price: "$201-400",
        address: "尖沙咀金巴利道26號1樓",
        phone_number: "36223000",
        description:
          "食物分類多達10種 包括：刺身、創作壽司、江戶前壽司、火炙壽司、卷物、軍艦、一品料理、串燒、燒物、炸物、天婦羅、蒸焗及鐵板、麵煱。",
        business_hour: "12:00 - 24:00",
        mtr_station: "尖沙咀",
        rest_image: "https://static5.orstatic.com/userphoto/doorphoto/B/8YB/01RNZ8BD9E58F14213B483lv.jpg",
        tag: "壽司/刺身/串燒/其他",
      },
      {
        name: "古今",
        price: "$201-400",
        address: "銅鑼灣軒尼詩道525號澳門逸園中心21樓",
        phone_number: "31889915",
        description:
          "餐廳供應多款日式料理，其中壽司卷系列更引入充滿創意、色彩豐富的美加風味。菜式定價合理，座位舒適，適合多人分享美食。",
        business_hour: "12:00 - 20:00",
        mtr_station: "銅鑼灣",
        rest_image: "https://static8.orstatic.com/userphoto2/photo/1I/16PH/08FPBRD53E5F50E85FF48Clv.jpg",
        tag: "壽司/刺身/拉麵",
      },
      {
        name: "初見",
        price: "$101-200",
        address: "荃灣海壩街22號華達樓地下F號舖",
        phone_number: "35904277",
        description:
          "荃灣人氣日本料理店，石燒香草吉列牛是必食之選，亦有日式火鍋及新鮮刺身。",
        business_hour: "12:00 - 22:00",
        mtr_station: "荃灣",
        rest_image: "https://static5.orstatic.com/userphoto2/photo/1O/1BLN/09EHWS881C2252C8DB7893lv.jpg",
        tag: "涮涮鍋/烤肉/壽司/刺身",
      },
      {
        name: "鳥山名",
        price: "$201-400",
        address: "荃灣青山公路荃灣段398號愉景新城1樓1025-1026號舖",
        phone_number: "23438666",
        description:
          "鳥山名1.醬油漬牛舌拉麵定食（特濃豚骨湯）$107（8/10）附沙律，前菜，茶碗蒸蛋及甜品。湯濃，食完唔會狂飲水！牛舌每舊係薄切，有11舊，超好味！",
        business_hour: "12:00 - 22:00",
        mtr_station: "荃灣",
        rest_image: "https://static7.orstatic.com/userphoto2/photo/X/QUP/05AYA64202095F5C906CE3lv.jpg",
        tag: "拉麵/壽司/刺身/烏冬/串燒",
      },
      {
        name: "一鳴拉麵",
        price: "$101-200",
        address: "大埔運頭街20-26號廣安大廈地下E舖",
        phone_number: "35655415",
        description:
          "拉麵主要有五款湯底，麵條及麵質均可自由選擇，另有各類小食提供",
        business_hour: "12:00 - 22:00",
        mtr_station: "大埔墟",
        rest_image: "https://static5.orstatic.com/userphoto/doorphoto/M/HPZ/03I0USFD778BAC60ED5EA0lv.jpg)",
        tag: "拉麵/烏冬/串燒",
      },


      {
        name: "御滿屋日本料理",
        price: "$201-400",
        address: "旺角彌敦道655號胡社生行1樓",
        phone_number: "24209381",
        description:
          "提供一人一鍋的和牛火鍋放題。有不少特色湯底選擇，包括女士至愛的骨膠原美肌鍋，還有Haagen Dazs雪糕任食。",
        business_hour: "12:00 - 23:00",
        mtr_station: "旺角",
        rest_image: "https://static7.orstatic.com/userphoto2/photo/1E/13ZX/07WFJI038BBB7547F39ADEpx.jpg",
        tag: "壽司/刺身/拉麵/烏冬/其他",
      },
  
      {
        name: "十和田總本店",
        price: "$201-400",
        address: "尖沙咀金馬倫道42號華懋金馬倫中心地下",
        phone_number: "26688791",
        description:
          "由擁有20多年經驗的資深日籍壽司師傅主理，務求用最傳統的手法，處理每天由日本空運到港的高級食材。",
        business_hour: "11:30 - 23:00",
        mtr_station: "尖沙咀",
        rest_image: "https://static6.orstatic.com/userphoto2/photo/1M/1A6M/094F0HA0D6564F3D498462px.jpg",
        tag: "壽司/刺身",
      },
  
      {
        name: "漁獲浜燒",
        price: "$201-400",
        address: "銅鑼灣軒尼詩道525號澳門逸園中心18樓",
        phone_number: "25755677",
        description:
          "浜燒指將海鮮在岸邊即捕即燒，而這間餐廳亦有三組魚池，裡面有由日本新鮮運到的不同海鮮，讓食客感受日式浜燒滋味。",
        business_hour: "12:00 - 22:00",
        mtr_station: "銅鑼灣",
        rest_image: "https://static7.orstatic.com/userphoto2/photo/U/NUY/04PO7Q4149BD1043EFF1EApx.jpg",
        tag: "壽司/刺身/烤肉/串燒/其他",
      },
      
      {
        name: "鉄人旨花",
        price: "$401或以上",
        address: "銅鑼灣謝斐道477-481號肇明大廈2樓",
        phone_number: "28928819",
        description:
          "日本高級鐵板燒店，燒牛扒、燒海鮮，看著大廚表演即叫即做。",
        business_hour: "12:00 - 22:00",
        mtr_station: "銅鑼灣",
        rest_image: "https://static5.orstatic.com/userphoto/photo/7/5QU/014UYC4B811130201CF02Epx.jpg",
        tag: "壽司/刺身/烤肉/串燒/其他",
      },
  
      {
        name: "天澗居酒屋",
        price: "$201-400",
        address: "元朗教育路79&81號地舖",
        phone_number: "34871160",
        description:
          "從日本直送時令食材，製作各款單點及拼盤菜式，鮮味十足。而榻榻米房間，及高私隱度的卡位，均予人舒適的感覺；想近距離觀賞師傅炮製菜式的話，則可選坐吧檯座位。",
        business_hour: "12:00 - 23:00",
        mtr_station: "元朗",
        rest_image: "https://static7.orstatic.com/userphoto2/photo/1V/1HB5/0AJ39M459CF62C32D20082px.jpg",
        tag: "壽司/刺身/烤肉/串燒/其他",
      },
  
      {
        name: "Jan Jan 串揚專門店 (鉅芝樓)",
        price: "$201-400",
        address: "灣仔皇后大道東100-102號鉅芝樓2樓",
        phone_number: "21571408",
        description:
          "餐廳總店來自大阪，是當地人氣串揚連鎖專門店，主打的串揚(Kushikatsu)是香港較少見的，kushi指串燒，katsu指吉列，招牌菜有牛串揚、海老串揚、雞胸肉紫蘇卷串揚及香港限定的咖喱飯串揚。",
        business_hour: "12:00 - 23:00",
        mtr_station: "灣仔",
        rest_image: "https://static7.orstatic.com/userphoto2/photo/Z/RRV/05HI7AE745ECBF026E66BBpx.jpg",
        tag: "串燒/其他",
      },
  
      {
        name: "活一鮮",
        price: "$101-200",
        address: "西環石塘咀皇后大道西503號地下",
        phone_number: "21684428",
        description:
          "⭐️性價比高日本菜⭐️,招牌菜:紅酒三文魚 粒粒魚生飯 網燒牛扒 雜錦魚生飯",
        business_hour: "12:00 - 22:00",
        mtr_station: "西營盤",
        rest_image: "https://static7.orstatic.com/userphoto2/photo/Z/RRV/05HI7AE745ECBF026E66BBpx.jpg",
        tag: "壽司/刺身/烏冬/串燒",
      },
  
      {
        name: "埠",
        price: "$401-800",
        address: "西灣河鯉景灣太康街西灣河碼頭",
        phone_number: "24935333",
        description:
          "位於碼頭旁，環境寧靜。整排落地玻璃，可望到碼頭海景。餐廳設有吧枱及普通座位，串燒用上一個熱石小爐盛載着上枱，保持熱度。串燒調味簡單為主。",
        business_hour: "12:00 - 22:00",
        mtr_station: "西灣河",
        rest_image: "https://static5.orstatic.com/userphoto2/photo/1A/10XE/07ALGK960AB837F5BF8277px.jpg",
        tag: "炸物/串燒/其他",
      },
  
      {
        name: "埠和氣食堂 (河畔花園)",
        price: "$101-200",
        address: "沙田大涌橋路20-30號河畔花園地下35號舖",
        phone_number: "26371800",
        description:
          "餐廳主打日式料理，包括壽司、丼飯、便當等，食材新鮮、豐富，深受食客歡迎。",
        business_hour: "11:30 - 23:15",
        mtr_station: "沙田圍",
        rest_image: "https://static5.orstatic.com/userphoto2/photo/19/ZQ2/0721BO1C320B57D45979F4px.jpg",
        tag: "壽司/刺身/烏冬/其他",
      },
  
      {
        name: "塚田農場",
        price: "$101-200",
        address: "沙田沙田正街18號新城市廣場1樓105號舖",
        phone_number: "24777266",
        description:
          "來自日本宮崎，於全國有超過150間分店的居酒屋。部分招牌菜是由日本直送，如美人鍋的湯底，蔬菜及日本走地雞。",
        business_hour: "11:30 - 23:15",
        mtr_station: "沙田圍",
        rest_image: "https://static7.orstatic.com/userphoto2/photo/1G/15OV/088GTQ3C9EAF41AB7B57C2px.jpg",
        tag: "壽司/刺身/拉麵/烏冬/丼飯/烤肉/咖哩/其他",
      },
  
    ];

    const [{ id: user1Id }, { id: user2Id }] = await trx("users")
      .insert(users)
      .returning("id");

    const [
      { id: restaurant1Id },
      { id: restaurant2Id },
      { id: restaurant3Id },
      { id: restaurant4Id },
      { id: restaurant5Id },
      { id: restaurant6Id },
      { id: restaurant7Id },
      { id: restaurant8Id },
      { id: restaurant9Id },
      { id: restaurant10Id },
      { id: restaurant11Id },
      { id: restaurant12Id },
      { id: restaurant13Id },
      { id: restaurant14Id },
      { id: restaurant15Id },
      { id: restaurant16Id },
      { id: restaurant17Id },
      { id: restaurant18Id }, 
      { id: restaurant19Id }, 
      { id: restaurant20Id }, 
    ] = await trx("restaurants").insert(restaurants).returning("id");

    const restaurantFoodImages = [
      { food_image: "https://static8.orstatic.com/userphoto2/photo/1W/1HZH/0ANWAJFACAD084462667B5sx.jpg", restaurant_id: restaurant1Id },
      { food_image: "https://static6.orstatic.com/userphoto2/photo/1W/1HZH/0ANWAHDEF24D0D2F60FDAFsx.jpg", restaurant_id: restaurant1Id },
      { food_image: "https://static8.orstatic.com/userphoto2/photo/1T/1G55/0AASJZC035ADF4254476ABsx.jpg", restaurant_id: restaurant2Id },
      { food_image: "https://static6.orstatic.com/userphoto2/photo/1T/1G55/0AASJXCC23697C3AB8E615sx.jpg)", restaurant_id: restaurant2Id },
      { food_image: "https://static5.orstatic.com/userphoto/photo/S/M85/04E20OF683AD458F1865A6tx.jpg", restaurant_id: restaurant3Id },
      { food_image: "https://static7.orstatic.com/userphoto2/photo/18/Z0G/06WZ9E4531D8DEE00380EBtx.jpg", restaurant_id: restaurant3Id },
      { food_image: "https://static7.orstatic.com/userphoto2/photo/1Y/1JRA/0B0I1E57F1037A226642EAtx.jpg", restaurant_id: restaurant4Id },
      { food_image: "https://static5.orstatic.com/userphoto2/photo/1Y/1JRA/0B0I1C564217CDC220A36Btx.jpg", restaurant_id: restaurant4Id },
      { food_image: "https://static5.orstatic.com/userphoto2/photo/20/1KZ7/0B969S29C9621AE6E90075tx.jpg", restaurant_id: restaurant5Id },
      { food_image: "https://static6.orstatic.com/userphoto2/photo/1Z/1KCK/0B4PCHC1D4FCA8B12636C9tx.jpg", restaurant_id: restaurant5Id },
      { food_image: "https://static8.orstatic.com/userphoto/photo/I/ELA/02VRCR484857B2FEB6C610tx.jpg", restaurant_id: restaurant6Id },
      { food_image: "https://static6.orstatic.com/userphoto/photo/I/ELA/02VRCT31AD94E10C10EF7Btx.jpg", restaurant_id: restaurant6Id },
      { food_image: "https://static6.orstatic.com/userphoto2/photo/1V/1H2Z/0AHH61E424F84A303FB95Dtx.jpg", restaurant_id: restaurant7Id },
      { food_image: "https://static8.orstatic.com/userphoto2/photo/1V/1H2Z/0AHH5ZED31581CF6AFBB46tx.jpg", restaurant_id: restaurant7Id },
      { food_image: "https://static6.orstatic.com/userphoto2/photo/1E/13MQ/07TTO5391926752533E473tx.jpg", restaurant_id: restaurant8Id },
      { food_image: "https://static8.orstatic.com/userphoto2/photo/17/YCY/06SC3757FBA6619251E38Dtx.jpg", restaurant_id: restaurant8Id },
      { food_image: "https://static5.orstatic.com/userphoto2/photo/1Y/1K30/0B2TEC4D0994B0A3F6F393tx.jpg", restaurant_id: restaurant9Id },
      { food_image: "https://static5.orstatic.com/userphoto2/photo/1Z/1K9I/0B43QW3B4433255D0E7195tx.jpg", restaurant_id: restaurant9Id },
      { food_image: "https://static5.orstatic.com/userphoto2/photo/1R/1EIX/09ZAPKCE94A83CC9FE1D4Ftx.jpg", restaurant_id: restaurant10Id },
      { food_image: "https://static5.orstatic.com/userphoto2/photo/1B/1161/07CAX0261B6CA8DA062E12tx.jpg", restaurant_id: restaurant10Id },
      { food_image: "https://static6.orstatic.com/userphoto2/photo/21/1M7I/0BHXHHF46C54BBA2ED0918px.jpg", restaurant_id: restaurant11Id },
      { food_image: "https://static8.orstatic.com/userphoto2/photo/21/1M71/0BHU1V646A8BF01D19BC2Epx.jpg", restaurant_id: restaurant11Id },
      { food_image: "https://static7.orstatic.com/userphoto2/photo/20/1LDV/0BC2M602FDBFD5829669B4px.jpg", restaurant_id: restaurant12Id },
      { food_image: "https://static6.orstatic.com/userphoto2/photo/20/1LKI/0BDDYD0E0934C78CDB6132px.jpg", restaurant_id: restaurant12Id },
      { food_image: "https://static5.orstatic.com/userphoto2/photo/1J/186S/08Q8BWBF790096EEC27977px.jpg", restaurant_id: restaurant13Id },
      { food_image: "https://static8.orstatic.com/userphoto2/photo/1J/186S/08Q8C3EF724741C272FF56px.jpg", restaurant_id: restaurant13Id },
      { food_image: "https://static8.orstatic.com/userphoto2/photo/1Z/1KJN/0B63QV8E74A315C7339C44px.jpg", restaurant_id: restaurant14Id },
      { food_image: "https://static7.orstatic.com/userphoto2/photo/1Z/1KIJ/0B5VRA160B5D20EE83105Fpx.jpg", restaurant_id: restaurant14Id },
      { food_image: "https://static6.orstatic.com/userphoto2/photo/1W/1I54/0AP0GL7B699E29BE2ABC34px.jpg", restaurant_id: restaurant15Id },
      { food_image: "https://static8.orstatic.com/userphoto2/photo/1W/1I54/0AP0GF48366E9CAF3169BFpx.jpg", restaurant_id: restaurant15Id },
      { food_image: "https://static7.orstatic.com/userphoto2/photo/1Z/1KEJ/0B53H2FE1258E741223BC6px.jpg", restaurant_id: restaurant16Id },
      { food_image: "https://static7.orstatic.com/userphoto2/photo/1X/1J0V/0AVAB684D54FC7D840175Dpx.jpg", restaurant_id: restaurant16Id },
      { food_image: "https://static6.orstatic.com/userphoto2/photo/1Z/1KHQ/0B5Q6P3E8B16C9FECBBB70px.jpg", restaurant_id: restaurant17Id },
      { food_image: "https://static7.orstatic.com/userphoto2/photo/1P/1CZE/09OBTA91F0C8DE98695E15px.jpg", restaurant_id: restaurant17Id },
      { food_image: "https://static6.orstatic.com/userphoto2/photo/20/1LHF/0BCRXL98986165D291E349px.jpg", restaurant_id: restaurant18Id },
      { food_image: "https://static7.orstatic.com/userphoto2/photo/1A/10XE/07ALGQ93C70D4457120360px.jpg", restaurant_id: restaurant18Id },
      { food_image: "https://static7.orstatic.com/userphoto2/photo/21/1M5J/0BHJFM06690EFE84326A78px.jpg", restaurant_id: restaurant19Id },
      { food_image: "https://static5.orstatic.com/userphoto2/photo/21/1M5J/0BHJFS0A50EF8FEDF23CDDpx.jpg", restaurant_id: restaurant19Id },
      { food_image: "https://static5.orstatic.com/userphoto2/photo/20/1L6S/0BAODW052AD6CA32B612A0px.jpg", restaurant_id: restaurant20Id },
      { food_image: "https://static7.orstatic.com/userphoto2/photo/1Z/1KS7/0B7SJEFB74F25122A5CD25px.jpg", restaurant_id: restaurant20Id },
    ];

    await trx("food_images").insert(restaurantFoodImages);

    await trx("reviews").insert([
      {
        food_rating: 5,
        environment_rating: 4,
        content: "so good",
        review_image: "review1.jpeg",
        view_number: 0,
        user_id: user1Id,
        restaurant_id: restaurant1Id,
      },
      {
        food_rating: 2,
        environment_rating: 3,
        content: "very good",
        review_image: "review2.jpeg",
        view_number: 0,
        user_id: user2Id,
        restaurant_id: restaurant1Id,
      },
      {
        food_rating: 0,
        environment_rating: 2,
        content: "so bad",
        review_image: "",
        view_number: 0,
        user_id: user1Id,
        restaurant_id: restaurant3Id,
      },
    ]);

    // await trx("restaurant_likes").insert([
    //   { user_id: user1Id, restaurant_id: restaurantAId },
    //   { user_id: user2Id, restaurant_id: restaurantBId },
    //   { user_id: user2Id, restaurant_id: restaurantAId },
    //   { user_id: user1Id, restaurant_id: restaurantCId },
    // ]);

    await trx.commit();
  } catch (error) {
    await trx.rollback();
  }
}

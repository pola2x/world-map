// 1. تهيئة الخريطة وتحديد مركزها الأولي ومستوى التكبير
const map = L.map('map').setView([20, 0], 2);

// 2. إضافة طبقة الخريطة الأساسية من OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 3. قاعدة بيانات بسيطة تحتوي على معلومات الدول
const countryInfo = {
    "Egypt": "أشهر معالمها الأهرامات وأبو الهول ونهر النيل. 🇪🇬",
    "Saudi Arabia": "تحتضن أقدس الأماكن الإسلامية، الكعبة المشرفة والمسجد النبوي. 🇸🇦",
    "France": "تشتهر ببرج إيفل ومتحف اللوفر وفن الطهي الراقي. 🇫🇷",
    "Japan": "تُعرف بـ 'أرض الشمس المشرقة'، وتشتهر بالتقنية المتقدمة وزهور الكرز. 🇯🇵",
    "Brazil": "أكبر دول أمريكا الجنوبية، تشتهر بكرة القدم ومهرجان ريو دي جانيرو وغابات الأمازون. 🇧🇷"
};

const infoBox = document.getElementById('info');

// 4. دالة لتحديث مربع المعلومات
function updateInfo(countryName) {
    const info = countryInfo[countryName];
    if (info) {
        infoBox.innerHTML = `<h2>${countryName}</h2><p>${info}</p>`;
    } else {
        infoBox.innerHTML = `<h2>${countryName}</h2><p>لا توجد معلومات متاحة لهذه الدولة حاليًا.</p>`;
    }
}

// 5. تحميل بيانات حدود الدول (GeoJSON) وإضافتها للخريطة
fetch('countries.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJson(data, {
            onEachFeature: function(feature, layer) {
                layer.on('click', function (e) {
                    const countryName = e.target.feature.properties.name;
                    updateInfo(countryName);
                    map.fitBounds(e.target.getBounds());
                });
            },
            style: {
                fillColor: "#007BFF",
                fillOpacity: 0.3,
                color: "#fff",
                weight: 1
            }
        }).addTo(map);
    });

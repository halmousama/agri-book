import type { Book } from "../types/book";

const book03Chapters = [
    { id: "chapter01", title: "الساعة البيولوجية (ساعات البرودة)", path: "/book-03-systems-engineering/chapter01" },
    { id: "chapter02", title: "عجز الضغط البخاري (VPD)", path: "/book-03-systems-engineering/chapter02" },
    { id: "chapter03", title: "التنفس الضوئي (C3 vs C4)", path: "/book-03-systems-engineering/chapter03" },
    { id: "chapter04", title: "التبخر-نتح (Evapotranspiration ETc)", path: "/book-03-systems-engineering/chapter04" },
    { id: "chapter05", title: "الزراعة المائية (Hydroponics)", path: "/book-03-systems-engineering/chapter05" },
    { id: "chapter06", title: "التسميد الورقي الإسعافي (Foliar)", path: "/book-03-systems-engineering/chapter06" },
    { id: "chapter07", title: "المستشعرات الذكية (Tensiometer)", path: "/book-03-systems-engineering/chapter07" },
    { id: "chapter08", title: "وحدات الحرارة المتراكمة (GDD)", path: "/book-03-systems-engineering/chapter08" },
    { id: "chapter09", title: "ميزانية الكربون (Source-Sink)", path: "/book-03-systems-engineering/chapter09" },
    { id: "chapter10", title: "معادلة الإنتاج (Rendement)", path: "/book-03-systems-engineering/chapter10" },
    { id: "chapter11", title: "نقطة التعادل (Break-Even)", path: "/book-03-systems-engineering/chapter11" },
    { id: "chapter12", title: "هندسة ما بعد الحصاد (Post-Harvest)", path: "/book-03-systems-engineering/chapter12" },
];

export const BOOKS: Record<string, Book> = {
    "book-01-nature-logic": {
        id: "book-01-nature-logic",
        title: "منطق الطبيعة",
        path: "/book-01-nature-logic",
        chapters: [
            { id: "chapter01", title: "السر الإلهي: الماء والحياة", path: "/book-01-nature-logic/chapter01" },
            { id: "chapter02", title: "سنة التوازن: الأسموزية", path: "/book-01-nature-logic/chapter02" },
            { id: "chapter03", title: "المضخة الربانية: النتح", path: "/book-01-nature-logic/chapter03" },
            { id: "chapter04", title: "مصنع الرزق: التركيب الضوئي", path: "/book-01-nature-logic/chapter04" },
            { id: "chapter05", title: "النمو: عنصر النيتروجين", path: "/book-01-nature-logic/chapter05" },
            { id: "chapter06", title: "الطاقة: عنصر الفوسفور", path: "/book-01-nature-logic/chapter06" },
            { id: "chapter07", title: "الجودة: عنصر البوتاسيوم", path: "/book-01-nature-logic/chapter07" },
            { id: "chapter08", title: "الخزنة: أنواع التربة", path: "/book-01-nature-logic/chapter08" },
            { id: "chapter09", title: "البوابات: الحموضة (pH)", path: "/book-01-nature-logic/chapter09" },
            { id: "chapter10", title: "سنن الدفاع: الوقاية", path: "/book-01-nature-logic/chapter10" },
            { id: "chapter11", title: "هندسة الشكل: التقليم", path: "/book-01-nature-logic/chapter11" },
            { id: "chapter12", title: "حساب الرزق: الحصاد", path: "/book-01-nature-logic/chapter12" },
        ],
    },
    "book-02-science-toolbox": {
        id: "book-02-science-toolbox",
        title: "العدة العلمية",
        path: "/book-02-science-toolbox",
        sections: [
            {
                title: "عالم المادة (الكيمياء)",
                chapters: [
                    { id: "chapter01", title: "المكعبات الصغيرة (الذرة)", path: "/book-02-science-toolbox/chapter01" },
                    { id: "chapter02", title: "الشحنات الخفية (الأيون)", path: "/book-02-science-toolbox/chapter02" },
                    { id: "chapter03", title: "عصير الطبيعة (المحاليل)", path: "/book-02-science-toolbox/chapter03" },
                ],
            },
            {
                title: "قوى الطبيعة (الموائع)",
                chapters: [
                    { id: "chapter04", title: "الدفع والشفط (الضغط)", path: "/book-02-science-toolbox/chapter04" },
                    { id: "chapter05", title: "الأنابيب والجريان", path: "/book-02-science-toolbox/chapter05" },
                    { id: "chapter06", title: "حالات الماء (التبخر)", path: "/book-02-science-toolbox/chapter06" },
                ],
            },
            {
                title: "الطاقة والضوء (الفيزياء)",
                chapters: [
                    { id: "chapter07", title: "ألوان الطيف (الضوء)", path: "/book-02-science-toolbox/chapter07" },
                    { id: "chapter08", title: "الحرارة والطاقة", path: "/book-02-science-toolbox/chapter08" },
                    { id: "chapter09", title: "حفظ الطاقة (التحولات)", path: "/book-02-science-toolbox/chapter09" },
                ],
            },
            {
                title: "لغة الأرقام (الرياضيات)",
                chapters: [
                    { id: "chapter10", title: "قياس الأرض (المساحات)", path: "/book-02-science-toolbox/chapter10" },
                    { id: "chapter11", title: "قياس الخزان (الأحجام)", path: "/book-02-science-toolbox/chapter11" },
                    { id: "chapter12", title: "النسب والخلط", path: "/book-02-science-toolbox/chapter12" },
                ],
            },
            {
                title: "العالم الخفي (الأحياء)",
                chapters: [
                    { id: "chapter13", title: "الأصدقاء والأعداء", path: "/book-02-science-toolbox/chapter13" },
                    { id: "chapter14", title: "وصفة الحياة (الوراثة)", path: "/book-02-science-toolbox/chapter14" },
                    { id: "chapter15", title: "دورة التدوير", path: "/book-02-science-toolbox/chapter15" },
                ],
            },
        ],
        chapters: [
            // flat list for easy navigation
            { id: "chapter01", title: "المكعبات الصغيرة (الذرة)", path: "/book-02-science-toolbox/chapter01" },
            { id: "chapter02", title: "الشحنات الخفية (الأيون)", path: "/book-02-science-toolbox/chapter02" },
            { id: "chapter03", title: "عصير الطبيعة (المحاليل)", path: "/book-02-science-toolbox/chapter03" },
            { id: "chapter04", title: "الدفع والشفط (الضغط)", path: "/book-02-science-toolbox/chapter04" },
            { id: "chapter05", title: "الأنابيب والجريان", path: "/book-02-science-toolbox/chapter05" },
            { id: "chapter06", title: "حالات الماء (التبخر)", path: "/book-02-science-toolbox/chapter06" },
            { id: "chapter07", title: "ألوان الطيف (الضوء)", path: "/book-02-science-toolbox/chapter07" },
            { id: "chapter08", title: "الحرارة والطاقة", path: "/book-02-science-toolbox/chapter08" },
            { id: "chapter09", title: "حفظ الطاقة (التحولات)", path: "/book-02-science-toolbox/chapter09" },
            { id: "chapter10", title: "قياس الأرض (المساحات)", path: "/book-02-science-toolbox/chapter10" },
            { id: "chapter11", title: "قياس الخزان (الأحجام)", path: "/book-02-science-toolbox/chapter11" },
            { id: "chapter12", title: "النسب والخلط", path: "/book-02-science-toolbox/chapter12" },
            { id: "chapter13", title: "الأصدقاء والأعداء", path: "/book-02-science-toolbox/chapter13" },
            { id: "chapter14", title: "وصفة الحياة (الوراثة)", path: "/book-02-science-toolbox/chapter14" },
            { id: "chapter15", title: "دورة التدوير", path: "/book-02-science-toolbox/chapter15" },
        ]
    },
    "book-03-systems-engineering": {
        id: "book-03-systems-engineering",
        title: "هندسة الأنظمة",
        path: "/book-03-systems-engineering",
        sections: [
            {
                title: "هندسة المناخ (Climate Engineering)",
                chapters: [
                    { id: "chapter01", title: "الساعة البيولوجية (ساعات البرودة)", path: "/book-03-systems-engineering/chapter01" },
                    { id: "chapter02", title: "عجز الضغط البخاري (VPD)", path: "/book-03-systems-engineering/chapter02" },
                    { id: "chapter03", title: "التنفس الضوئي (C3 vs C4)", path: "/book-03-systems-engineering/chapter03" },
                ],
            },
            {
                title: "الإدارة المائية والغذائية المتقدمة (Advanced Fertigation)",
                chapters: [
                    { id: "chapter04", title: "التبخر-نتح (Evapotranspiration ETc)", path: "/book-03-systems-engineering/chapter04" },
                    { id: "chapter05", title: "الزراعة المائية (Hydroponics)", path: "/book-03-systems-engineering/chapter05" },
                    { id: "chapter06", title: "التسميد الورقي الإسعافي (Foliar)", path: "/book-03-systems-engineering/chapter06" },
                ],
            },
            {
                title: "الزراعة الدقيقة والتوقع (Precision Agriculture)",
                chapters: [
                    { id: "chapter07", title: "المستشعرات الذكية (Tensiometer)", path: "/book-03-systems-engineering/chapter07" },
                    { id: "chapter08", title: "وحدات الحرارة المتراكمة (GDD)", path: "/book-03-systems-engineering/chapter08" },
                    { id: "chapter09", title: "ميزانية الكربون (Source-Sink)", path: "/book-03-systems-engineering/chapter09" },
                ],
            },
            {
                title: "اقتصاديات المهندس (Agri-Economics)",
                chapters: [
                    { id: "chapter10", title: "معادلة الإنتاج (Rendement)", path: "/book-03-systems-engineering/chapter10" },
                    { id: "chapter11", title: "نقطة التعادل (Break-Even)", path: "/book-03-systems-engineering/chapter11" },
                    { id: "chapter12", title: "هندسة ما بعد الحصاد (Post-Harvest)", path: "/book-03-systems-engineering/chapter12" },
                ],
            },
        ],
        chapters: book03Chapters,
    },
    "book-04-hardware-ai": {
        id: "book-04-hardware-ai",
        title: "هندسة الآلات والذكاء الاصطناعي",
        path: "/book-04-hardware-ai",
        chapters: [
            { id: "chapter01", title: "العيون الفضائية (NDVI & Drones)", path: "/book-04-hardware-ai/chapter01" },
            { id: "chapter02", title: "الرؤية الحاسوبية وفرز المحصول (AI Sorting)", path: "/book-04-hardware-ai/chapter02" },
            { id: "chapter03", title: "ميكانيكا التربة وانضغاطها (Soil Compaction)", path: "/book-04-hardware-ai/chapter03" },
            { id: "chapter04", title: "الري الآلي المحوري (Center Pivot)", path: "/book-04-hardware-ai/chapter04" },
            { id: "chapter05", title: "المزارع العمودية (Vertical Farming & Aeroponics)", path: "/book-04-hardware-ai/chapter05" },
            { id: "chapter06", title: "روبوتات السرب وإبادة الأعشاب (Swarm Robotics)", path: "/book-04-hardware-ai/chapter06" },
            { id: "chapter07", title: "تقنية المعدلات المتغيرة (VRT Sprayer)", path: "/book-04-hardware-ai/chapter07" },
            { id: "chapter08", title: "المستشعرات الصوتية للآفات (Acoustic Detection)", path: "/book-04-hardware-ai/chapter08" },
        ],
    },
    "book-05-ecosystems-export": {
        id: "book-05-ecosystems-export",
        title: "الأنظمة المتكاملة وهندسة التصدير",
        path: "/book-05-ecosystems-export",
        chapters: [
            { id: "chapter01", title: "أكوابونيك (Aquaponics)", path: "/book-05-ecosystems-export/chapter01" },
            { id: "chapter02", title: "الزراعة التجديدية (Regenerative Agriculture)", path: "/book-05-ecosystems-export/chapter02" },
            { id: "chapter03", title: "هندسة التصدير (MRL & PHI)", path: "/book-05-ecosystems-export/chapter03" },
            { id: "chapter04", title: "القيمة المضافة (Value Addition & ROI)", path: "/book-05-ecosystems-export/chapter04" },
            { id: "chapter05", title: "الزراعة الكهروضوئية (Agrivoltaics)", path: "/book-05-ecosystems-export/chapter05" },
            { id: "chapter06", title: "زراعة الكربون (Carbon Farming & Credits)", path: "/book-05-ecosystems-export/chapter06" },
            { id: "chapter07", title: "تكنولوجيا البلوكشين (Blockchain Traceability)", path: "/book-05-ecosystems-export/chapter07" },
            { id: "chapter08", title: "الزراعة الملحية (Biosaline Agriculture)", path: "/book-05-ecosystems-export/chapter08" },
        ],
    },
};

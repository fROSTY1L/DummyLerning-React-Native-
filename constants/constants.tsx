import { onboardingSwiperDataType, BannerDataTypes } from "@/types/global";
import { CoursesType } from '@/types/courses';

export const onboardingSwiperData: onboardingSwiperDataType[] = [
    {
        id: 1,
        title: "Начните свое учебное путешествие с веселья!",
        description: "Наши увлекательные обучающие видеоролики зажгут",
        sortDescription: "ваше любопытство и удовольствие",
        image: require("@/assets/onboarding/intro_1.png"),
    },
    {
        id: 2,
        title: "Раскройте свою страсть, повысьте свой профессиональный уровень",
        description: "Наши комплексные курсы и опытные преподаватели",
        sortDescription: "которые подскажут вам каждый шаг.",
        image: require("@/assets/onboarding/intro_2.png"),
    },
    {
        id: 3,
        title: "Получите онлайн-сертификат с необычными навыками",
        description: "Чтобы получить онлайн-сертификат, ",
        sortDescription: "необходимые курсы и оценку ",
        sortDescription2: "coursework & assessments.",
        image: require("@/assets/onboarding/intro_3.png"),
    },
    ];

export const bannerData: BannerDataTypes[] = [
    {
        bannerImageUrl: require("../assets/banner/1.jpg"),
    },
    {
        bannerImageUrl: require("../assets/banner/2.webp"),
    },
    {
        bannerImageUrl: require("../assets/banner/3.webp"),
    },
    {
        bannerImageUrl: require("../assets/banner/4.webp"),
    },
    ];

const demoReviews = [
  {
    user: {
      name: "Анна Петрова",
      email: "anna@example.com",
      avatar: {
        url: require("../assets/icons/User.png")
      }
    },
    rating: 5,
    comment: "Отличный курс! Материал подается очень доступно и интересно. Особенно понравились практические задания.",
    commentReplies: []
  },
  {
    user: {
      name: "Иван Сидоров",
      email: "ivan@example.com",
      avatar: {
        url: require("../assets/icons/User.png")
      }
    },
    rating: 4,
    comment: "Хороший кур��, но хотелось бы больше практических примеров. В целом, доволен результатом.",
    commentReplies: []
  },
  {
    user: {
      name: "Мария Иванова",
      email: "maria@example.com",
      avatar: {
        url: require("../assets/icons/User.png")
      }
    },
    rating: 5,
    comment: "Прекрасная подача материала! Преподаватель объясняет сложные вещи простым языком.",
    commentReplies: []
  }
];

export const coursesData: CoursesType[] = [
    {
        _id: "1",
        name: "JavaScript с нуля до профи",
        description: "Полный курс по JavaScript, включающий ES6+, асинхронное программирование, работу с DOM и многое другое",
        categories: "programming",
        price: 2999,
        estimatedPrice: 3999,
        thumbnail: {
            public_id: "js_thumb",
            url: require("../assets/banner/1.jpg")
        },
        tags: "Programming, JavaScript, Web Development, Frontend",
        level: "beginner",
        demoUrl: "demo_url_1",
        benefits: [
            { title: "Современный JavaScript" },
            { title: "Практические проекты" },
            { title: "Работа с реальными API" }
        ],
        prerequisites: [
            { title: "Базовые знания HTML и CSS" },
            { title: "Базовые навыки работы с компьютером" }
        ],
        reviews: demoReviews,
        courseData: [
            {
                _id: "lesson1",
                title: "Введение в JavaScript",
                description: "Основы языка",
                videoUrl: "video_url",
                videoThumbnail: {},
                videoSection: "Основы",
                videoLength: 30,
                videoPlayer: "youtube",
                links: [],
                suggestion: "",
                questions: []
            },
            {
                _id: "lesson2",
                title: "Работа с DOM",
                description: "Манипуляции с DOM",
                videoUrl: "video_url",
                videoThumbnail: {},
                videoSection: "Продв��нутые темы",
                videoLength: 45,
                videoPlayer: "youtube",
                links: [],
                suggestion: "",
                questions: []
            }
        ],
        ratings: 4.8,
        purchased: 1200
    },
    {
        _id: "2",
        name: "UI/UX Дизайн Мастер-класс",
        description: "Научитесь создавать привлекательные и удобные интерфейсы с помощью современных инструментов дизайна",
        categories: "design",
        price: 3999,
        estimatedPrice: 4999,
        thumbnail: {
            public_id: "design_thumb",
            url: require("../assets/banner/2.webp")
        },
        tags: "Design, UI/UX, Figma, Web Design, Interface",
        level: "intermediate",
        demoUrl: "demo_url_2",
        benefits: [
            { title: "Работа с Figma" },
            { title: "Принципы UI/UX" },
            { title: "Создание прототипов" }
        ],
        prerequisites: [
            { title: "Базовые знания дизайна" },
            { title: "Наличие компьютера с установленной Figma" }
        ],
        reviews: demoReviews,
        courseData: [
            {
                _id: "lesson1",
                title: "Основы UI дизайна",
                description: "Базовые принципы",
                videoUrl: "video_url",
                videoThumbnail: {},
                videoSection: "UI Основы",
                videoLength: 40,
                videoPlayer: "youtube",
                links: [],
                suggestion: "",
                questions: []
            }
        ],
        ratings: 4.7,
        purchased: 800
    },
    {
        _id: "3",
        name: "Python для Data Science",
        description: "Изучите Python для анализа данных, машинного обучения и визуализации",
        categories: "programming",
        price: 4999,
        estimatedPrice: 5999,
        thumbnail: {
            public_id: "python_thumb",
            url: require("../assets/banner/3.webp")
        },
        tags: "Programming, Python, Data Science, Machine Learning",
        level: "advanced",
        demoUrl: "demo_url_3",
        benefits: [
            { title: "Анализ данных с Python" },
            { title: "Машинное обучение" },
            { title: "Визуализация данных" }
        ],
        prerequisites: [
            { title: "Базовые знания программирования" },
            { title: "Основы математической статистики" }
        ],
        reviews: [],
        courseData: [
            {
                _id: "lesson1",
                title: "Введение в Data Science",
                description: "Основные концепции",
                videoUrl: "video_url",
                videoThumbnail: {},
                videoSection: "Основы DS",
                videoLength: 35,
                videoPlayer: "youtube",
                links: [],
                suggestion: "",
                questions: []
            }
        ],
        ratings: 4.9,
        purchased: 1500
    },
    {
        _id: "4",
        name: "Бизнес-аналитика для начинающих",
        description: "Научитесь анализировать бизнес-процес��ы и принимать data-driven решения",
        categories: "business",
        price: 3499,
        estimatedPrice: 4499,
        thumbnail: {
            public_id: "ba_thumb",
            url: require("../assets/banner/4.webp")
        },
        tags: "Business, Analytics, Excel, Data Analysis, Business Intelligence",
        level: "beginner",
        demoUrl: "demo_url_4",
        benefits: [
            { title: "Работа с данными в Excel" },
            { title: "Построение дашбордов" },
            { title: "Анализ бизнес-процессов" }
        ],
        prerequisites: [
            { title: "Базовые знания Excel" },
            { title: "Понимание бизнес-процессов" }
        ],
        reviews: [],
        courseData: [
            {
                _id: "lesson1",
                title: "Введение в бизнес-аналитику",
                description: "Основные понятия",
                videoUrl: "video_url",
                videoThumbnail: {},
                videoSection: "Основы BA",
                videoLength: 25,
                videoPlayer: "youtube",
                links: [],
                suggestion: "",
                questions: []
            }
        ],
        ratings: 4.6,
        purchased: 600
    }
];
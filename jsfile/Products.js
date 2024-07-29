/* 상품 목록 데이터 배열 */
const products = [  // 순서대로 항목 Id, Img, 제목, 저자, 출판사, 장르, 별점, 가격, 미리보기 이미지를 지정하도록
    {
        id: 'book_1', image: 'C:\\PJT_1\\book\\book_1.jpg', title: '나는 얼마짜리입니까', author: '6411의 목소리', publisher: '창비',
        style: '인권문제', star: '★☆☆☆☆', price: '18000', 
        previewPages: ['C:\\PJT_1\\book\\book_1_1.PNG', 'C:\\PJT_1\\book\\book_1_2.PNG', 'C:\\PJT_1\\book\\book_1_3.PNG', 'C:\\PJT_1\\book\\book_1_4.PNG', 'C:\\PJT_1\\book\\book_1_5.PNG'],
        summary: '책 소개 내용',
        description: '줄거리 내용',
        relatedArticles: [
            { title: '기사 제목 1', link: 'https://example.com/article1' },
            { title: '기사 제목 2', link: 'https://example.com/article2' },
            { title: '기사 제목 3', link: 'https://example.com/article3' }
        ]
    },

    {
        id: 'book_2', image: 'C:\\PJT_1\\book\\book_2.jpg', title: '개미 - 제1부 개미 -', author: '베르나르베르베르', publisher: '열린책들',
        style: '프랑스소설', star: '★★☆☆☆', price: '15800', 
        previewPages: ['C:\\PJT_1\\book\\book_2_1.PNG', 'C:\\PJT_1\\book\\book_2_2.PNG', 'C:\\PJT_1\\book\\book_2_3.PNG', 'C:\\PJT_1\\book\\book_2_4.PNG', 'C:\\PJT_1\\book\\book_2_5.PNG'],
        summary: '책 소개 내용',
        description: '줄거리 내용',
        relatedArticles: [
            { title: '기사 제목 1', link: 'https://example.com/article1' },
            { title: '기사 제목 2', link: 'https://example.com/article2' },
            { title: '기사 제목 3', link: 'https://example.com/article3' }
        ]
    },

    {
        id: 'book_3', image: 'C:\\PJT_1\\book\\book_3.jpg', title: '해리포터 -마법사의 돌-', author: 'J·K·롤링', publisher: '문학수첩',
        style: '외국판타지소설', star: '★★★★☆', price: '9000', 
        previewPages: ['C:\\PJT_1\\book\\book_3_1.PNG', 'C:\\PJT_1\\book\\book_3_2.PNG', 'C:\\PJT_1\\book\\book_3_3.PNG', 'C:\\PJT_1\\book\\book_3_4.PNG', 'C:\\PJT_1\\book\\book_3_5.PNG'],
        summary: '책 소개 내용',
        description: '줄거리 내용',
        relatedArticles: [
            { title: '기사 제목 1', link: 'https://example.com/article1' },
            { title: '기사 제목 2', link: 'https://example.com/article2' },
            { title: '기사 제목 3', link: 'https://example.com/article3' }
        ]
    },

    {
        id: 'book_4', image: 'C:\\PJT_1\\book\\book_4.jpg', title: '갈매기의 꿈', author: '리처드바크', publisher: '나무옆의자',
        style: '영미소설', star: '★★★★☆', price: '15800', 
        previewPages: ['C:\\PJT_1\\book\\book_4_1.PNG', 'C:\\PJT_1\\book\\book_4_2.PNG', 'C:\\PJT_1\\book\\book_4_3.PNG', 'C:\\PJT_1\\book\\book_4_4.PNG', 'C:\\PJT_1\\book\\book_4_5.PNG'],
        summary: '책 소개 내용',
        description: '줄거리 내용',
        relatedArticles: [
            { title: '기사 제목 1', link: 'https://example.com/article1' },
            { title: '기사 제목 2', link: 'https://example.com/article2' },
            { title: '기사 제목 3', link: 'https://example.com/article3' }
        ]
    },

    {
        id: 'book_5', image: 'C:\\PJT_1\\book\\book_5.jpg', title: '죽음을 보는 눈', author: '마이클 로리타', publisher: 'RHK',
        style: '액션/스릴러소설', star: '★★★☆☆', price: '14000', 
        previewPages: ['C:\\PJT_1\\book\\book_5_1.PNG', 'C:\\PJT_1\\book\\book_5_2.PNG', 'C:\\PJT_1\\book\\book_5_3.PNG', 'C:\\PJT_1\\book\\book_5_4.PNG', 'C:\\PJT_1\\book\\book_5_5.PNG'],
        summary: '책 소개 내용',
        description: '줄거리 내용',
        relatedArticles: [
            { title: '기사 제목 1', link: 'https://example.com/article1' },
            { title: '기사 제목 2', link: 'https://example.com/article2' },
            { title: '기사 제목 3', link: 'https://example.com/article3' }
        ]
    },

    {
        id: 'book_6', image: 'C:\\PJT_1\\book\\book_6.jpg', title: '크리피', author: '마에가와 유타카', publisher: '창해',
        style: '추리/미스테리소설', star: '★★★★★', price: '13500', 
        previewPages: ['C:\\PJT_1\\book\\book_6_1.PNG', 'C:\\PJT_1\\book\\book_6_2.PNG', 'C:\\PJT_1\\book\\book_6_3.PNG', 'C:\\PJT_1\\book\\book_6_4.PNG', 'C:\\PJT_1\\book\\book_6_5.PNG'],
        summary: '책 소개 내용',
        description: '줄거리 내용',
        relatedArticles: [
            { title: '기사 제목 1', link: 'https://example.com/article1' },
            { title: '기사 제목 2', link: 'https://example.com/article2' },
            { title: '기사 제목 3', link: 'https://example.com/article3' }
        ]
    },

    {
        id: 'book_7', image: 'C:\\PJT_1\\book\\book_7.jpg', title: '절대 잃지 않는 주식투자', author: '곽병열', publisher: '터닝페이지',
        style: '주식/펀드', star: '★★★★★', price: '19000', 
        previewPages: ['C:\\PJT_1\\book\\book_7_1.PNG', 'C:\\PJT_1\\book\\book_7_2.PNG', 'C:\\PJT_1\\book\\book_7_3.PNG', 'C:\\PJT_1\\book\\book_7_4.PNG', 'C:\\PJT_1\\book\\book_7_5.PNG'],
        summary: '책 소개 내용',
        description: '줄거리 내용',
        relatedArticles: [
            { title: '기사 제목 1', link: 'https://example.com/article1' },
            { title: '기사 제목 2', link: 'https://example.com/article2' },
            { title: '기사 제목 3', link: 'https://example.com/article3' }
        ]
    },

    {
        id: 'book_8', image: 'C:\\PJT_1\\book\\book_8.jpg', title: '마녀와의 7일', author: '히가시노 게이고', publisher: '현대문학',
        style: '추리/미스테리소설', star: '★★★★☆', price: '18800', 
        previewPages: ['C:\\PJT_1\\book\\book_8_1.PNG', 'C:\\PJT_1\\book\\book_8_2.PNG', 'C:\\PJT_1\\book\\book_8_3.PNG', 'C:\\PJT_1\\book\\book_8_4.PNG', 'C:\\PJT_1\\book\\book_8_5.PNG'],
        summary: '책 소개 내용',
        description: '줄거리 내용',
        relatedArticles: [
            { title: '기사 제목 1', link: 'https://example.com/article1' },
            { title: '기사 제목 2', link: 'https://example.com/article2' },
            { title: '기사 제목 3', link: 'https://example.com/article3' }
        ]
    },

    {
        id: 'book_9', image: 'C:\\PJT_1\\book\\book_9.jpg', title: '죽은자의 결혼식', author: '제이미 린 핸드릭스', publisher: '그늘',
        style: '액션/스릴러소설', star: '★★★☆☆', price: '18800', 
        previewPages: ['C:\\PJT_1\\book\\book_9_1.PNG', 'C:\\PJT_1\\book\\book_9_2.PNG', 'C:\\PJT_1\\book\\book_9_3.PNG', 'C:\\PJT_1\\book\\book_9_4.PNG', 'C:\\PJT_1\\book\\book_9_5.PNG'],
        summary: '책 소개 내용',
        description: '줄거리 내용',
        relatedArticles: [
            { title: '기사 제목 1', link: 'https://example.com/article1' },
            { title: '기사 제목 2', link: 'https://example.com/article2' },
            { title: '기사 제목 3', link: 'https://example.com/article3' }
        ]
    },

    {
        id: 'book_10', image: 'C:\\PJT_1\\book\\book_10.jpg', title: '멜라닌', author: '하승민', publisher: '한겨래출판',
        style: '한국소설', star: '★☆☆☆☆', price: '16800', 
        previewPages: ['C:\\PJT_1\\book\\book_10_1.PNG', 'C:\\PJT_1\\book\\book_10_2.PNG', 'C:\\PJT_1\\book\\book_10_3.PNG', 'C:\\PJT_1\\book\\book_10_4.PNG', 'C:\\PJT_1\\book\\book_10_5.PNG'],
        summary: '책 소개 내용',
        description: '줄거리 내용',
        relatedArticles: [
            { title: '기사 제목 1', link: 'https://example.com/article1' },
            { title: '기사 제목 2', link: 'https://example.com/article2' },
            { title: '기사 제목 3', link: 'https://example.com/article3' }
        ]
    }
];
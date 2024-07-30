/* 상품 목록 데이터 배열 */
const products = [  // 순서대로 항목 Id, Img, 제목, 저자, 출판사, 장르, 별점, 가격, 미리보기 이미지를 지정하도록
    {
        id: 'book_1', image: 'C:\\PJT_1\\book\\book_1.jpg', title: '나는 얼마짜리입니까', author: '6411의 목소리', publisher: '창비',
        style: '인권문제', star: '★☆☆☆☆', price: '18000', 
        previewPages: ['C:\\PJT_1\\book\\book_1_1.PNG', 'C:\\PJT_1\\book\\book_1_2.PNG', 'C:\\PJT_1\\book\\book_1_3.PNG', 'C:\\PJT_1\\book\\book_1_4.PNG', 'C:\\PJT_1\\book\\book_1_5.PNG'],
        summary: '어떤 소설보다 리얼하고, 어떤 시집보다 감동적인 문장들 사회를 바꾸는 우리들의 일터 이야기입니다.',
        description: '웹툰 작가, 물류센터 직원, 도축 검사원, 번역가, 대리운전 기사, 사회복지사, 전업주부, 예능작가, 헤어디자이너, 농부, 건설노동자 등 각자의 노동헌장에서 묵묵히 일하는 수많은 이들. 전국 방방곡곡 다양한 현장에서 땀 흘리는 일흔다섯 명의 노동자가 자신에게 익숙한 도구를 잠시 놓고 펜을 들었다. 그리고 각자가 일하며 겪은 이야기를 써 내려가기 시작했다.',
        relatedArticles: [
            { title: '[신간] 나는 얼마짜리입니까', link: 'https://www.newsis.com/view/NISX20240716_0002813595' }
        ]
    },

    {
        id: 'book_2', image: 'C:\\PJT_1\\book\\book_2.jpg', title: '개미 제1부 개미 -', author: '베르나르베르베르', publisher: '열린책들',
        style: '프랑스소설', star: '★★☆☆☆', price: '15800', 
        previewPages: ['C:\\PJT_1\\book\\book_2_1.PNG', 'C:\\PJT_1\\book\\book_2_2.PNG', 'C:\\PJT_1\\book\\book_2_3.PNG', 'C:\\PJT_1\\book\\book_2_4.PNG', 'C:\\PJT_1\\book\\book_2_5.PNG'],
        summary: '<개미>는 프랑스 작가 베르나르 베르베르가 쓴 소설로, 인간과 개미의 세계를 병행하여 그려낸 작품이다. 이 책은 인간의 시각에서 개미의 세계를 탐구하며, 개미의 사회 구조와 행동을 상세히 묘사한다. 주인공은 파리의 한 아파트를 상속받은 가족으로, 그 아파트의 지하실에서 벌어지는 신비로운 사건들을 조사하게 된다. 동시에 개미의 세계에서는 한 개미가 자신의 군락을 지키기 위해 다양한 도전을 겪게 된다. 이 두 이야기는 서로 얽히며 흥미진진한 전개를 이룬다.',
        description: '에드몽 웰스의 죽음으로 이사 온 조나탕은 삼촌의 유언에도 불구하고 금기된 지하실로의 탐험을 시작한다. 거기에서 그는 개미 왕국 [벨로캉]을 발견하게 되는데, 이곳에서 개미 사회의 체계적인 구조와 규칙, 역할에 따른 움직임이 드러난다. 그러나 어떤 사건을 계기로 벨로캉에서 균열이 발생하며 사회는 분열된다. 종이 다른 인간과 개미가 대화하는 설정 속에서 베르나르 베르베르의 작품처럼 대상에 대한 깊은 조사와 철학적 사유가 담긴 이야기는 흥미로움을 자아낸다.',
        relatedArticles: [
            { title: '베르나르 베르베르 인기 소설 [개미], 게임으로 만난다', link: 'https://www.dailygame.co.kr/view.php?ud=202310181239159207da2c546b3a_26' }
        ]
    },

    {
        id: 'book_3', image: 'C:\\PJT_1\\book\\book_3.jpg', title: '해리포터 -마법사의 돌-', author: 'J·K·롤링', publisher: '문학수첩',
        style: '외국판타지소설', star: '★★★★☆', price: '9000', 
        previewPages: ['C:\\PJT_1\\book\\book_3_1.PNG', 'C:\\PJT_1\\book\\book_3_2.PNG', 'C:\\PJT_1\\book\\book_3_3.PNG', 'C:\\PJT_1\\book\\book_3_4.PNG', 'C:\\PJT_1\\book\\book_3_5.PNG'],
        summary: '<해리 포터와 마법사의 돌>은 어린이와 어른 모두에게 사랑받는 작품으로, 마법의 세계와 친구들, 용기와 모험의 이야기를 통해 독자들에게 깊은 감동을 주는 소설이다.',
        description: '어둠의 마왕 볼드모트에게 부모를 잃고 홀로 살아남은 아이, 해리는 안전을 위해 마법사가 아닌 사람인 ‘머글’ 페투니아 이모와 버논 이모부 손에 길러지며 불우한 어린 시절을 보낸다. 열한 번째 생일날, 해그리드를 통해 자신이 마법사라는 사실을 알게 된 해리는 호그와트 마법학교에 입학해 헤르미온느 그레인저, 론 위즐리라는 친구들과 함께 영생을 주는 마법사의 돌을 찾는 엄청난 모험을 시작하게 된다.',
        relatedArticles: [
            { title: '‘해리포터와 마법사의 돌’ 초판 표지, 경매서 ‘26억’ 낙찰', link: 'https://m.jnilbo.com/74054191768#google_vignette' }
        ]
    },

    {
        id: 'book_4', image: 'C:\\PJT_1\\book\\book_4.jpg', title: '갈매기의 꿈', author: '리처드바크', publisher: '나무옆의자',
        style: '영미소설', star: '★★★★☆', price: '15800', 
        previewPages: ['C:\\PJT_1\\book\\book_4_1.PNG', 'C:\\PJT_1\\book\\book_4_2.PNG', 'C:\\PJT_1\\book\\book_4_3.PNG', 'C:\\PJT_1\\book\\book_4_4.PNG', 'C:\\PJT_1\\book\\book_4_5.PNG'],
        summary: '<갈매기의 꿈>은 자신만의 꿈을 추구하며 자아를 실현해 나가는 과정을 그린 감동적인 이야기로, 깊은 교훈과 영감을 제공하는 책이다.',
        description: '<갈매기의 꿈>은 갈매기인 조나단 리빙스턴의 이야기를 중심으로 전개된다. 조나단은 다른 갈매기들과는 다른 꿈을 가진 갈매기다. 그는 단순히 먹이를 찾기 위해 날아다니는 것이 아니라, 비행을 예술과 자유의 표현으로 보고, 더 높은 비행 기술을 익히기 위해 끊임없이 노력한다. 조나단은 자신이 꿈꾸는 비행의 한계를 넘어서기 위해 끊임없이 연습하고 도전한다. 그러나 그의 동료 갈매기들은 그의 꿈과 목표를 이해하지 못하고, 그의 비행 방식과 열정을 비웃는다. 결국 조나단은 자신이 원하는 비행을 계속할 수 없는 사회에서 쫓겨나게 되지만, 그는 포기하지 않고 자신의 꿈을 추구하며 새로운 동료들과 함께 자신만의 비행을 계속한다. 이야기는 조나단이 비행의 경지를 넘어서서 자기 자신의 본질을 이해하고, 자유롭고 완벽한 비행을 이루어가는 과정을 그린다. 그는 결국 비행의 스승이 되어 다른 갈매기들에게도 자신의 비전을 나누며, 새로운 가능성을 제시한다.',
        relatedArticles: [
            { title: '[명작에게 길을 묻다]`리처드 바크의 `갈매기의 꿈’', link: 'https://www.gjdream.com/news/articleView.html?idxno=459918' }
        ]
    },

    {
        id: 'book_5', image: 'C:\\PJT_1\\book\\book_5.jpg', title: '죽음을 보는 눈', author: '마이클 로리타', publisher: 'RHK',
        style: '액션/스릴러소설', star: '★★★☆☆', price: '14000', 
        previewPages: ['C:\\PJT_1\\book\\book_5_1.PNG', 'C:\\PJT_1\\book\\book_5_2.PNG', 'C:\\PJT_1\\book\\book_5_3.PNG', 'C:\\PJT_1\\book\\book_5_4.PNG', 'C:\\PJT_1\\book\\book_5_5.PNG'],
        summary: '마이클 코리타(Michael Corita)의 책 <죽음을 보는 눈>("Seeing Death")은 인간의 죽음을 이해하고 받아들이는 다양한 관점을 탐구하는 철학적이고 사색적인 작품이다.',
        description: '다양한 문화와 종교에서 죽음을 어떻게 바라보는지, 그리고 이러한 시각들이 개인의 삶에 어떤 영향을 미치는지를 분석한다. 죽음이라는 궁극적인 현실을 마주했을 때, 인간이 어떻게 자기 사진을 성찰하고 삶의 의미를 찾는지를 살펴본다. 또한, 죽음이 삶에 어떤 의미를 부여하는지, 죽음을 이해하는 것이 어떻게 더 나은 삶을 이끄는지를 탐구한다.',
        relatedArticles: [

        ]
    },

    {
        id: 'book_6', image: 'C:\\PJT_1\\book\\book_6.jpg', title: '크리피', author: '마에가와 유타카', publisher: '창해',
        style: '추리/미스테리소설', star: '★★★★★', price: '13500', 
        previewPages: ['C:\\PJT_1\\book\\book_6_1.PNG', 'C:\\PJT_1\\book\\book_6_2.PNG', 'C:\\PJT_1\\book\\book_6_3.PNG', 'C:\\PJT_1\\book\\book_6_4.PNG', 'C:\\PJT_1\\book\\book_6_5.PNG'],
        summary: '<크리피>는 심리 스릴러 장르의 소설로, 복잡한 인간 심리와 충격적인 사전들이 얽힌 이야기를 담고 있다.',
        description: '주인공은 평범한 일상 속에서 특이한 사건에 휘말리게 된다. 일상의 안정을 깨고 갑작스러운 위협이 다가오면서 이야기가 전개된다. 주인공은 미스터리한 사건들을 조사하면서 자신의 심리적 갈등과 내면의 어둠을 직면하게 된다. 이러한 심리적 갈등은 독자가 주인공의 감정을 깊이 이해하게 만든다. 등장인물의 간의 복잡한 관계와 감정이 얽힘이 이야기의 핵심 요소를 작용하며, 이들은 각자의 비밀과 동기를 가지고 있어, 독자는 이들의 진짜 의도를 추리하게 된다.',
        relatedArticles: [
            { title: '[신간] 탁월한 범죄심리 묘사와 섬뜩한 전개…일본 범죄스릴러 [크리피]', link: 'https://www.newspim.com/news/view/20160330000089' }
        ]
    },

    {
        id: 'book_7', image: 'C:\\PJT_1\\book\\book_7.jpg', title: '절대 잃지 않는 주식투자', author: '곽병열', publisher: '터닝페이지',
        style: '주식/펀드', star: '★★★★★', price: '19000', 
        previewPages: ['C:\\PJT_1\\book\\book_7_1.PNG', 'C:\\PJT_1\\book\\book_7_2.PNG', 'C:\\PJT_1\\book\\book_7_3.PNG', 'C:\\PJT_1\\book\\book_7_4.PNG', 'C:\\PJT_1\\book\\book_7_5.PNG'],
        summary: '이 책은 주식 투자를 통해 안정적이고 지속적인 수익을 얻는 방법에 대해 설명하는 투자 가이드다.',
        description: '주식 투자에 대한 기본적인 개념과 원칙을 소개하며, 주식 시장의 구조, 투자 방법, 그리고 기본적인 투자 용어에 대한 설명이 포함되어 있다. 또한, 투자자의 심리와 감정이 투자 성과에 미치는 영향을 다루며, 안정적이고 감정적으로 안정된 투자를 위한 심리적 준비와 조언을 제공한다',
        relatedArticles: [

        ]
    },

    {
        id: 'book_8', image: 'C:\\PJT_1\\book\\book_8.jpg', title: '마녀와의 7일', author: '히가시노 게이고', publisher: '현대문학',
        style: '추리/미스테리소설', star: '★★★★☆', price: '18800', 
        previewPages: ['C:\\PJT_1\\book\\book_8_1.PNG', 'C:\\PJT_1\\book\\book_8_2.PNG', 'C:\\PJT_1\\book\\book_8_3.PNG', 'C:\\PJT_1\\book\\book_8_4.PNG', 'C:\\PJT_1\\book\\book_8_5.PNG'],
        summary: '이 책은 일본의 인기 미스터리 작가가 쓴 작품으로, 독특한 설정과 매력적인 캐릭터로 구성된 흥미로운 스토리를 제공한다. ',
        description: '이 이야기는 한적한 일본의 마을에서 시작된다. 마을에는 ‘마녀’라는 별명이 붙은 신비로운 인물이 살고 있다. 이 마녀는 사람들의 소문과 호기심의 대상이 되어 왔다. 그리고 주인공은 어느 날 마을에서 발생한 미스터리한 사건을 조사하기 위해 이 마을을 방문하게 된다. 사전의 진상과 배경을 파헤치는 과정에서, 그는 마녀와 관련된 의심스러운 요소들과 마주하게 된다.',
        relatedArticles: [
            { title: '미래엔그룹, 올여름 무더위 날릴 대형 신간 『포스 윙』 뉴스레터, 『마녀와의 7일』 굿즈로 신간 홍보 박차', link: 'https://www.m-i.kr/news/articleView.html?idxno=1141685' }
        ]
    },

    {
        id: 'book_9', image: 'C:\\PJT_1\\book\\book_9.jpg', title: '죽은자의 결혼식', author: '제이미 린 핸드릭스', publisher: '그늘',
        style: '액션/스릴러소설', star: '★★★☆☆', price: '18800', 
        previewPages: ['C:\\PJT_1\\book\\book_9_1.PNG', 'C:\\PJT_1\\book\\book_9_2.PNG', 'C:\\PJT_1\\book\\book_9_3.PNG', 'C:\\PJT_1\\book\\book_9_4.PNG', 'C:\\PJT_1\\book\\book_9_5.PNG'],
        summary: '친구 모두를 협박해 원하는 바를 이루고자 했던 소시오패스 신랑과 그에 맞서는 친구들의 민낯을 섬세한 시선으로 그린 범죄 스릴러물, 〈죽은 자의 결혼식〉이 출간되었다. 이미 서스펜스 매거진을 통해 전미 지역에서 실력을 인정받은 ‘제이미 린 헨드릭스’의 장편 소설이다.',
        description: '소시오패스 성향의 트레버는 ‘피오나’와 결혼하기 위해 그의 여섯 친구와 긴밀한 관계를 맺는다. 그리고 그들이 죽을 때까지 숨기고자 했던 비밀을 캐내어 친구 모두에게 폭로하겠다고 협박한다. 그러니 자신과 피오나가 결혼할 수 있도록 협조하라고 말이다. 그렇게 두 사람은 친구들의 응원에 힘입어 마이애미에 신혼집을 얻고, 그곳에서 결혼식을 올리게 된다. 그러나 모두가 모인 한 낮의 웨딩홀에서 트레버는 갑자기 죽고 마는데…. ',
        relatedArticles: [

        ]
    },

    {
        id: 'book_10', image: 'C:\\PJT_1\\book\\book_10.jpg', title: '멜라닌', author: '하승민', publisher: '한겨래출판',
        style: '한국소설', star: '★☆☆☆☆', price: '16800', 
        previewPages: ['C:\\PJT_1\\book\\book_10_1.PNG', 'C:\\PJT_1\\book\\book_10_2.PNG', 'C:\\PJT_1\\book\\book_10_3.PNG', 'C:\\PJT_1\\book\\book_10_4.PNG', 'C:\\PJT_1\\book\\book_10_5.PNG'],
        summary: '<멜라닌>은 파란 피부로 태어난 한국 베트남 혼혈 소년이며, 미국 이민을 통해 디아스포라적 상황을 겪는 성장소설이다. ',
        description: '피부색과 인종으로 인해 사회에서 가장 낮은 계급으로 취급되는 존재가 학교 친구와 선생님, 이웃들에게 일상적으로 차별과 멸시를 받는 과정이 9·11테러, 총기 난사 사건, 한국 대통령 탄핵 등의 역사적 사건들과 촘촘하게 맞물리며 펼쳐진다. ',
        relatedArticles: [
            { title: '내 피부는 파랗고 엄마는 베트남 사람이다…나는 ‘당신’이다 [책&생각]', link: 'https://www.hani.co.kr/arti/culture/book/1149770.html' }
        ]
    }
];
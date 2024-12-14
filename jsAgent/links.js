console.log('link.js is loaded');
const linksDefaultOptions = {
    "url": "https://www.google.com",
    "order": 1,
    "target": true
};




bw.links={
    init:function(){
        bw.links.putIcon();
        bw.links.putPlaceHolder();
        bw.links.bindClick();
    },
    putIcon:function(){
        let temp_html = `
            <svg id="bw-links" style="position: fixed; bottom: 20px; right: 30px; z-index: 99; border: none; outline: none; cursor: pointer;" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 28V21M24 14H24.02M19.8 38.4L22.72 42.2933C23.1542 42.8723 23.3714 43.1618 23.6375 43.2653C23.8707 43.356 24.1293 43.356 24.3625 43.2653C24.6286 43.1618 24.8458 42.8723 25.28 42.2933L28.2 38.4C28.7863 37.6183 29.0794 37.2274 29.437 36.929C29.9138 36.5311 30.4766 36.2497 31.081 36.107C31.5343 36 32.0228 36 33 36C35.7956 36 37.1935 36 38.2961 35.5433C39.7663 34.9343 40.9343 33.7663 41.5433 32.2961C42 31.1935 42 29.7956 42 27V15.6C42 12.2397 42 10.5595 41.346 9.27606C40.7708 8.14708 39.8529 7.2292 38.7239 6.65396C37.4405 6 35.7603 6 32.4 6H15.6C12.2397 6 10.5595 6 9.27606 6.65396C8.14708 7.2292 7.2292 8.14708 6.65396 9.27606C6 10.5595 6 12.2397 6 15.6V27C6 29.7956 6 31.1935 6.45672 32.2961C7.06569 33.7663 8.23373 34.9343 9.7039 35.5433C10.8065 36 12.2044 36 15 36C15.9772 36 16.4657 36 16.919 36.107C17.5234 36.2497 18.0862 36.5311 18.563 36.929C18.9206 37.2274 19.2137 37.6183 19.8 38.4Z" stroke="#7F56D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        document.body.insertAdjacentHTML('beforeend', temp_html);
    },
    putPlaceHolder: function(){
        let temp_html = `<div id="bw-links-placeholder" style="display:none; position: fixed; bottom: 70px; right: 30px; z-index: 99; border: none; outline: none; cursor: pointer;">place holder</div>`;
        document.getElementById('bw-links').insertAdjacentHTML('beforebegin', temp_html);
    },
    bindClick : function(){
        bw.util.bindLive("#bw-links", "click", function(){
            bw.links.toggle();
        })
    },
    show : function(){
        document.getElementById('bw-links-placeholder').style.display = 'block';
    },
    hide : function(){
        document.getElementById('bw-links-placeholder').style.display = 'none';
    },
    toggle: function(){
        document.getElementById('bw-links-placeholder').style.display = document.getElementById('bw-links-placeholder').style.display=='none'? 'block':'none';
    }

};

(async function () {
    bw.links.init();
})();



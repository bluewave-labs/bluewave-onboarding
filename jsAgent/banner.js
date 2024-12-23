console.log('banner.js is here!');

const bannerDefaultOptions = {
    "url": "https://www.google.com",
    "order": 1,
    "target": true
};

bw.banner={
    init:function(){
        bw.banner.putIcon();
        bw.banner.putPlaceHolder();
        bw.banner.bindClick();
    },
    putIcon:function(){
        let temp_html = `
            <svg id="bw-banner" style="position: fixed; bottom: 20px; z-index: 99; border: none; outline: none; cursor: pointer;" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">

            </svg>`;
        document.body.insertAdjacentHTML('afterbegin', temp_html);
    },
    putPlaceHolder: function(){
        let temp_html = ``;
        document.getElementById('bw-banner').insertAdjacentHTML('beforebegin', temp_html);
    },
    bindClick : function(){
        bw.util.bindLive("#bw-banner", "click", function(){
            bw.links.close();
        })
    },
    close : function(){
        document.getElementById('').style.display = 'none';
    }
};

(async function () {
    bw.links.init();
})();
console.log('banner.js is here!');

const bannerDefaultOptions = {
    closeButtonAction: "no action",
    position: "top",
    url: "https://www.google.com",
    fontColor: "#2548ff",
    backgroundColor: "#80e0ff",
    bannerText: "Mad cow is here",
    actionUrl: "https://www.google.com"
};

bw.banner={
    init:function(){
        bw.banner.putHtml();
        bw.banner.bindClick();
    },
    putHtml:function(){
        let temp_html = `
            <div id="bw-banner" style="position: fixed; top: 50px; z-index: 999999; height:50px; width:435px; background-color: #80e0ff; left: 50%; transform: translate(-50%, -50%);
                line-height: 13px; font-weight: 400; display: flex; align-items: center; justify-content: space-between; padding: 0.7rem; border-radius: 5px;">
                
                    <div style="color: #2548ff; font-size: 20px; font-weight: bold; width: 100%; text-align: center;">
                        Mad cow is here
                    </div>
          
                    <svg id="bw-banner-close-icon" aria-hidden="true" viewBox="0 0 24 24" style="fill: #2548ff; font-size: 20px; cursor: pointer; width: 20px; height: 20px;">
                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                
            </div>`;
        document.body.insertAdjacentHTML('afterbegin', temp_html);
    },
    putPlaceHolder: function(){
        let temp_html = ``;
        document.getElementById('bw-banner').insertAdjacentHTML('beforebegin', temp_html);
    },
    bindClick : function(){
        //todo: bind click event for close button to remove banner
        bw.util.bindLive("#bw-banner-close-icon", "click", function(e){
            setTimeout(function(){
                e.target.parentElement.parentElement.remove();
            }, 200);
            
        })
    },
    
};

(async function () {
    bw.banner.init();
})();
const server_endpoint_base = 'https://24mzwmm3-3000.euw.devtunnels.ms';
const defaultOptions = {
    headerColor : '#EFEFEF',
    footerColor : '#EFEFEF',
    padding: 16,
    hasFooter: true
}

bw.popup = {
    
    init: function () {
        bw.popup.addOverlay();
        bw.popup.addModal(()=>{
            bw.popup.bindEvents();
        });
     },
    
    addOverlay: function () {
        document.body.insertAdjacentHTML('afterbegin', `<div id='bw-overlay' style='position: fixed;top: 0;bottom: 0;left: 0;right: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(3px); z-index: 999;'></div>`);
    },
    addModal: function (cb) {
        const options = window
        let overlay = document.getElementById('bw-overlay');
        for (let i = 0; i < options.length; i++) {
            let option = {
                ...defaultOptions,
                ...options[i]
            };
            let temp_html = `
            <div id='bw-modal' class='bw-order-${option.no}' style='display: block;position: fixed;z-index: 1;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);'>
                <div class='modal-content' style='position: relative;background-color: #fefefe;margin: auto;padding: 0;border: 1px solid #888; border-radius: 15px; width: 80%;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);'>
                    ${bw.popup.addHeader(option.headerText, option.headerBg, option.headerTextColor, option.padding)}
                    <div class="modal-body" style='padding: ${option.padding}px ${option.padding}px;'>
                        ${option.contentHtml}
                    </div>
                    ${bw.popup.addButton(option.actionButtonText, option.actionButtonColor, option.padding, `bw-popup-btn-${i}`, option.action)}
                </div>
            </div>`
            overlay.insertAdjacentHTML('afterbegin', temp_html);
        }
        cb && cb();
    },
    addHeader: function(headerTitle, bgColor, textColor, padding){
        let headerHtml = `<div class="modal-header" style='padding: ${padding}px ${padding}px;background-color: ${bgColor};border-top-left-radius: 15px; border-top-right-radius: 15px;'>
            <h2 style= 'color:${textColor}'>${headerTitle}</h2>
            <span id='bw-modal-close' class="close" style='font-size: 36px;font-weight: bold;margin-right: 0px;margin-top: -7px;display: block;position: absolute;float: right;right: 23px;cursor: pointer;'>&times;</span>
        </div>`;
        return headerHtml;
    },
    addButton: function(footerHtml_, color, padding, btnId, btnEvent){
        let footerHtml = `<div class="modal-footer" style='padding: ${padding}px ${padding}px;background-color: ${color};border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;'>
            <button id="${btnId}">${footerHtml_}</button>
        </div>`;
        
        if(btnEvent == 'close'){
            bw.util.bindLive(`#${btnId}`, 'click', function(){
                bw.popup.hideModal();
            });
        }
        return footerHtml;
    },  
    bindEvents: function(){
        bw.util.bindLive(`#bw-modal-close`, 'click', function(){
            bw.popup.hideModal();
        });
    },
    showModal: function () {
        document.getElementById('bw-overlay').style.display = 'block';
    },
    hideModal: function(){
        document.getElementById('bw-overlay').style.display = 'none';
    }
};


(async function () {
    bw.popup.init();
})();
const server_endpoint_base = 'http://localhost:3000';
let bwHelper = {
    init: function () { },
    addOverlay: function () {
        document.body.insertAdjacentHTML('afterbegin', `<div id='bw-overlay' style='position: fixed;top: 0;bottom: 0;left: 0;right: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(3px); z-index: 999;'></div>`);
    },
    addHeader: function(headerTitle, color){
        let headerHtml = `<div class="modal-header" style='padding: 2px 16px;background-color: ${color};border-top-left-radius: 15px; border-top-right-radius: 15px;'>
            <span id='bw-modal-close' class="close" style='float: right;font-size: 20px;font-weight: bold;margin-right: -7px;margin-top: -3px;'>&times;</span>
            <h2>${headerTitle}</h2>
        </div>`;
        return headerHtml;
    },
    addFooter: function(footerHtml_, color){
        let footerHtml = `<div class="modal-footer" style='padding: 2px 16px;background-color: ${color};border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;'>
            <h3>${footerHtml_}</h3>
        </div>`;
        return footerHtml;
    },
    addModal: function () {
        let overlay = document.getElementById('bw-overlay');
        overlay.insertAdjacentHTML('afterbegin', `
        <div id='bw-modal' style='display: block;position: fixed;z-index: 1;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);'>
            <div class='modal-content' style='position: relative;background-color: #fefefe;margin: auto;padding: 0;border: 1px solid #888; border-radius: 15px; width: 80%;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);'>
                ${bwHelper.addHeader('Modal Header', '#EFEFEF')}
                <div class="modal-body" style='padding: 2px 16px;'>
                 {{content}}
                </div>
                ${bwHelper.addFooter('Modal Footer', '#543543')}
            </div>
        </div>`);
    },
    bindEvents: function(){
        let closebtn = document.getElementById('bw-modal-close');
        closebtn.addEventListener('click', function(){
            document.getElementById('bw-overlay').style.display = 'none';
        });
    }
};

(function (text) {
    
    bwHelper.addOverlay();
    bwHelper.addModal();
    bwHelper.bindEvents();

})()
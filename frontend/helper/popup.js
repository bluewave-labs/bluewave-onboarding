const server_endpoint_base = 'http://localhost:3000';
const defaultOptions = {
    headerColor : '#EFEFEF',
    footerColor : '#EFEFEF',
    padding: 16,
    hasFooter: true
}
if(window.bwHelper === undefined){window.bwHelper={}}
bwHelper.popup = {  
    init: function () { },
    getData: async function(cb){ 
        const response = await fetch(`${server_endpoint_base}/mock/popup?key=A`);
        const data = await response.json();
        return data;
    },
    addOverlay: function () {
        document.body.insertAdjacentHTML('afterbegin', `<div id='bw-overlay' style='position: fixed;top: 0;bottom: 0;left: 0;right: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(3px); z-index: 999;'></div>`);
    },
    addModal: function (options, cb) {
        
        let overlay = document.getElementById('bw-overlay');
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let temp_html = `
            <div id='bw-modal' class='bw-order-${option.no}' style='display: block;position: fixed;z-index: 1;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);'>
                <div class='modal-content' style='position: relative;background-color: #fefefe;margin: auto;padding: 0;border: 1px solid #888; border-radius: 15px; width: 80%;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);'>
                    ${bwHelper.popup.addHeader(option.headerText, option.headerBg, option.padding)}
                    <div class="modal-body" style='padding: ${option.padding}px ${option.padding}px;'>
                        {{htmlContent}}
                    </div>
                    ${bwHelper.popup.addButton(option.actionButtonText, option.actionButtonColor, option.padding)}
                </div>
            </div>`
            temp_html = temp_html.replace('{{htmpContent}}', option.contentHtml);
            overlay.insertAdjacentHTML('afterbegin', temp_html);
        }
        
        cb && cb();
    },
    addHeader: function(headerTitle, color, padding){
        let headerHtml = `<div class="modal-header" style='padding: ${padding}px ${padding}px;background-color: ${color};border-top-left-radius: 15px; border-top-right-radius: 15px;'>
            <span id='bw-modal-close' class="close" style='float: right;font-size: 23px;font-weight: bold;margin-right: 0px;margin-top: -7px;'>&times;</span>
            <h2>${headerTitle}</h2>
        </div>`;
        return headerHtml;
    },
    addButton: function(footerHtml_, color, padding){
        let footerHtml = `<div class="modal-footer" style='padding: ${padding}px ${padding}px;background-color: ${color};border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;'>
            <h3>${footerHtml_}</h3>
        </div>`;
        return footerHtml;
    },
  
    bindEvents: function(){
        let closebtn = document.getElementById('bw-modal-close');
        closebtn.addEventListener('click', function(){
            document.getElementById('bw-overlay').style.display = 'none';
        });
    }
};

(async function () {
    let config = await bwHelper.popup.getData();
    console.log('config:', config);
    debugger;
    bwHelper.popup.addOverlay();
    bwHelper.popup.addModal(config, ()=>{
        bwHelper.popup.bindEvents();
    });
    
})();
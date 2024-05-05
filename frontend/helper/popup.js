const server_endpoint_base_dev = 'http://localhost:3000';
const defaultOptions = {
    headerColor : '#EFEFEF',
    footerColor : '#EFEFEF',
    padding: 16,
    hasFooter: true
}
if(!bwHelper){bwHelper={}}
bwHelper.popup = {
    init: function () { },
    getData: function(cb){ 
        cb&& cb({});
    },
    addOverlay: function () {
        document.body.insertAdjacentHTML('afterbegin', `<div id='bw-overlay' style='position: fixed;top: 0;bottom: 0;left: 0;right: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(3px); z-index: 999;'></div>`);
    },
    addModal: function (options, cb) {
        let _options ={
            ...defaultOptions,
            options
        };
        let overlay = document.getElementById('bw-overlay');
        overlay.insertAdjacentHTML('afterbegin', `
        <div id='bw-modal' style='display: block;position: fixed;z-index: 1;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);'>
            <div class='modal-content' style='position: relative;background-color: #fefefe;margin: auto;padding: 0;border: 1px solid #888; border-radius: 15px; width: 80%;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);'>
                ${bwHelper.addHeader('Modal Header', _options.headerColor, _options.padding)}
                <div class="modal-body" style='padding: ${_options.padding}px ${_options.padding}px;'>
                    {{htmlContent}}
                </div>
                ${_options.hasFooter ? bwHelper.addFooter('Modal Footer', _options.footerColor, _options.padding): ''}
            </div>
        </div>`);
        cb && cb();
    },
    addHeader: function(headerTitle, color, padding){
        let headerHtml = `<div class="modal-header" style='padding: ${padding}px ${padding}px;background-color: ${color};border-top-left-radius: 15px; border-top-right-radius: 15px;'>
            <span id='bw-modal-close' class="close" style='float: right;font-size: 23px;font-weight: bold;margin-right: 0px;margin-top: -7px;'>&times;</span>
            <h2>${headerTitle}</h2>
        </div>`;
        return headerHtml;
    },
    addFooter: function(footerHtml_, color, padding){
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

(function () {
    bwHelper.getData();
    bwHelper.addOverlay();
    bwHelper.addModal();
    bwHelper.bindEvents();

})()
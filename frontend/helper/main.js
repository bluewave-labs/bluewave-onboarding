//CONSTANTS

const BW_SERVER_ENDPOINT_BASE = 'https://24mzwmm3-3000.euw.devtunnels.ms';
const BW_POPUP_JS_URL ='';
const BW_BANNER_JS_URL ='';
const BW_TOUR_JS_URL ='';
const BW_LINKS_JS_URL ='';
const BW_USER_KEY = 'BW_USER_KEY';

//GLOBALS
window.BW_USER = '';

if (window.bwHelper === undefined) { window.bwHelper = {} }
if (bwHelper.util === undefined) { bwHelper.util = {} }

bwHelper.util = {
    isScriptLoaded : function (src) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++)
            if (scripts[i].getAttribute('src') == src) return true;
        return false;
    },
    loadScriptAsync : function (url, cb, errcb) {
        try {
            if (bwHelper.util.isScriptLoaded(url)) {
                cb && cb();
            } else {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.async = false;
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            cb && cb();
                        }
                    };
                } else {
                    script.onload = function () {
                        cb && cb();
                    };
                }
                script.onerror = function () {
                    errcb && errcb();
                };
                script.src = url;
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            }
        } catch (e) {
            console.log(e);
        }
    },
    generateGUID :function () {
        var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (o) {
            var n = Math.random() * 16 | 0,
                g = o == "x" ? n : (n & 3 | 8);
            return g.toString(16)
        });
        return guid;
    }
}

bwHelper.data={
    getData : async function(userID){
        const response = await fetch(`${server_endpoint_base}/onboarddata`,postOption);
        let dataObj =  {
            user: 22,
            type: 'popup', //banner, tour, link,
            data: {
            }
        }
        const data = await response.json();
        return data;
    }  
}

bwHelper.store = {
    insert: function (key, value) {
        localStorage.setItem(key, value);
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    get: function (key) {
        return localStorage.getItem(key);
    }
}

bwHelper.user = {
    createUser: function () {
        const generated_userId = bwHelper.util.generateGUID();
        bwHelper.store.insert(BW_USER_KEY, generated_userId);
    },
    checkIfBwUserCreated: function () {
        let result = false;
        let userID = bwHelper.store.get(BW_USER_KEY);
        if (userID != null) {
            result = true;
        }
        return result;
    },
    getUserID : function(){
        return bwHelper.store.get(BW_USER_KEY);
    },
    removeUser: function(){
        bwHelper.store.remove(BW_USER_KEY);
    }
}

bwHelper.init = function(){
    if(!bwHelper.user.checkIfBwUserCreated()){
        bwHelper.user.createUser();
    }
    window.BW_USER = bwHelper.user.getUserID();
    window.BW_ONBOARD_DATA = {};
}

(async function () {
    bwHelper.init();
    const onBoardConfig = await getData();
    if (onBoardConfig.hasPopup) {
        //load popup.js
        if(!bwHelper.util.isScriptLoaded(BW_POPUP_JS_URL)){
            bwHelper.util.loadScriptAsync(BW_POPUP_JS_URL);
        }
    }

    if (onBoardConfig.hasTour) {
        //load tour.js
        //initialize onBoardConfig parameters
    }

})();
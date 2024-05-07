const server_endpoint_base = 'https://24mzwmm3-3000.euw.devtunnels.ms';

 async  function getData(){ 

    
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

(async function(){
    const onBoardConfig = await getData();
    if(onBoardConfig.hasPopup){
        //load popup.js
        //initialize onBoardConfig parameters
    }
    if(onBoardConfig.hasTour){
        //load tour.js
        //initialize onBoardConfig parameters
    }

})();
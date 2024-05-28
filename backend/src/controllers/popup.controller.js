const { Popup } = require('../models/Popup');

const popup = async (req, res) =>{
    const { key } = req.query;
    let returnObj =[]
    // const user = await User.findOne({ where: { email } });
    // let data = Popup.find({ where: {  }})
    
    if(key==='A') {
        returnObj =[
            {
                no:1,
                headerText: 'test header text',
                headerTextColor: '#5F5014',
                headerBg : '#4F9EBF',
                contentHtml : 'tek content',
                font: '14px',
                fontColor: '#AAAAAA',
                action : 'close',
                actionButtonText: 'Kapat/Close',
                actionButtonColor: '#CCCCCC'
            }
        ];
    }else if (key==='B'){
        returnObj =[
            {
                no:1,
                headerText: 'test header text1',
                headerBg : '#A2A2A2',
                contentHtml : '11',
                font: '14px',
                fontColor: '#AAAAAA',
                action : 'close',
                actionButtonText: 'Kapat/Close1',
                actionButtonColor: '#CCCCCC'
            },
            {
                no:2,
                headerText: 'test header text2',
                headerBg : '#A2A2A2',
                contentHtml : '22',
                font: '14px',
                fontColor: '#AAAAAA',
                action : 'close',
                actionButtonText: 'Kapat/Close2',
                actionButtonColor: '#CCCCCC'
            }
            
        ];
    }

    res.status(200).json(returnObj);
}
const onboard = async (req, res) =>{
    const { userId } = req.body;
    let returnObj = {
        userId,
        popupData:
        [
            {
                no: 1,
                headerText: 'test header text',
                headerTextColor: '#5F5014',
                headerBg: '#4F9EBF',
                contentHtml: 'tek content',
                font: '14px',
                fontColor: '#AAAAAA',
                action: 'close',
                actionButtonText: 'Kapat/Close',
                actionButtonColor: '#CCCCCC'
            }
        ],
        bannerData:undefined,
        tourData: undefined,
        linkData:undefined,
    }

    res.status(200).json(returnObj);
}
module.exports = {popup, onboard};
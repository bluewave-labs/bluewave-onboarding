const popup = async (req, res) =>{
    const { key } = req.query;
    let returnObj ={}
    if(key==='A') {
        returnObj =[
            {
                no:1,
                headerText: 'test header text',
                headerBg : '#A2A2A2',
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

module.exports = {popup};
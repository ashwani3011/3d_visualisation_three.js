let oData;
let cleanData;
let typeBasedArray = []

d3.csv('data.csv').then((data) => {
    let i = -1;
    data.forEach((object) => {

        object['Daily MWh ']  = object['Daily MWh '].replace(',','')

        let height = (object['Daily MWh '] * 20)/300000;
        object.height = height;

        if (i == -1 || typeBasedArray[i].type !== object.type) {
            typeBasedArray.push(object.type)
            i++;
            let values = [];
            values.push(object)
            typeBasedArray[i] = {type: object.type, values}
        }else{
            typeBasedArray[i].values.push(object)
        }
    }) 
})

export default typeBasedArray;

//three.js

// function
  


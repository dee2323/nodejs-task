
const fs=require('fs');
const readline=require('readline')
const text=fs.createReadStream('users.csv')
const rl=readline.createInterface(
  {
    input:text,
  }
)
function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}
let users=[]
const readFromCSV = () => {
  rl.on("line", (row) => {
    users.push(row.split(","));
  });
};


const writeToCSV = () => {
  let csv = "";
  rl.on("close", () => {
    users.map((user,index)=>{
      if(index!==0)
      csv += user.join(",") + "\r\n" 
    })
    fs.writeFileSync("output.csv", csv);
  });
};

const  writeOnJSONFile=()=>{
  let users = fs.readFileSync('users.csv').toString().split('\n');
    users.shift();
    const newKeys = { '0': "name", '1': "birthDate",'2':"city",'3':'number','4':'gender' };
    users.push(users.map(row=>row.split(",")).map(line=>({...line})).map(line=>renameKeys(line,newKeys)))
    for(let i=0;i<3;i++){
      users.shift()
    }
    const final=[].concat.apply([], users);
  const json=JSON.stringify(final)
    fs.writeFileSync("output.json", json);
    console.log(final)
}
readFromCSV()
writeToCSV()
writeOnJSONFile()
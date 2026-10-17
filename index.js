import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const date = moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss');

async function main() {
  for (let i = 1; i <= 28; i++) {
    const data = {
      date: date,
      commitNumber: i,
      message: `Backdated commit ${i} of 28`
    };
    
    await jsonfile.writeFile(path, data);
    await simpleGit().add([path]);
    await simpleGit().commit(`Backdated commit ${i} - ${new Date().toLocaleTimeString()}`, { '--date': date });
    
    console.log(`✅ Commit ${i} of 28 created`);
  }
  
  await simpleGit().push();
  console.log("🎉 All 28 commits pushed! Total: 30 commits for yesterday");
}

main();
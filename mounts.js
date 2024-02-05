const ffApi = 'https://ffxivcollect.com/api/mounts'

async function main(){
    const response = await fetch(ffApi)
    console.log(response.json())
}

main();
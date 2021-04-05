const { default: axios } = require("axios")
const CLIENT_ID = 'diroxxtest';
const API_KEY = 'CzQqeDY7Qa0JPNqMbgUccrCBXtXdchpWDoqepWwbd7Z8AK8LUb'
const domain = `https://api.sandbox.mangopay.com/v2.01/${CLIENT_ID}/`
const base64keyBuffer = Buffer.from(`${CLIENT_ID}:${API_KEY}`);
const base64key = base64keyBuffer.toString('base64');
console.log(base64key);
const users = [
    {
        id:105107154,
        "Email": "cyrano@bergerac.com",
        wallet: 105194399
    }
]
const createProjectOwner = () => {
    axios.post(domain+"/users/natural",{
        "FirstName": "Cyrano",
        "LastName": "de Bergerac", 
        "Address": {
            "AddressLine1":"Street 7",
            "AddressLine2": "",
            "City": "Paris",
            "Region":"Ile de France",
             "PostalCode":"75009",
            "Country":"FR" 
        },
        "Birthday": -258443002,
        "Nationality": "FR",
        "CountryOfResidence": "FR",
        "Email": "cyrano@bergerac.com",
        "Capacity": "NORMAL",
        "Tag": "Postman create a user"
    },{
        headers:{
            'Authorization':'Basic '+base64key
        }
    }).then(res=>{
            console.log(res);
        }).catch(err=>{
            // console.log(err);
            console.log(err.message);
});

}

const createProjectOwnerWallet = async () => {
    try {
        const res = await axios.post(domain+"/wallets",{
            "Owners": ["105107154"], 
            "Description": "A very cool wallet",
            "Currency": "EUR",
            "Tag": "Postman create a wallet"
        
        },{
            headers:{
                'Authorization':'Basic '+base64key
            }
        });
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}


// createProjectOwner()
createProjectOwnerWallet()
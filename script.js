const section=document.createElement('section');
const container=document.createElement('div');
container.innerHTML=`
<h1 class="heading">Nationality, Gender and Age Finder by Name</h1>
<label for="userName">Please Enter your name below</label> <br>
<input id="userName" placeholder="Your Name"> <br> 
<button type="button" class="btn btn-success" onclick="getNationality()">Submit</button> <br>`

const countryDiv=document.createElement('div');
const genderDiv=document.createElement('div');
const ageDiv=document.createElement('div');

section.append(container);

document.body.append(section);
async function getNationality(){
  try{
    const givenName=document.querySelector("#userName").value;
    const data= await fetch(`https://api.nationalize.io/?name=${givenName}`, {method: "GET"});
    const nationalityData =await data.json();
    console.log(nationalityData);
    const name=nationalityData.name;
    console.log(name);
    const country=nationalityData.country;
    console.log(country);
    const countryID=country.map(id => id.country_id);
    console.log(countryID);
    const probability=country.map(data=>data.probability);
    console.log(probability);


    
    
    countryDiv.innerHTML='';
    if(probability[0]===undefined && probability[1]===undefined ){
      countryDiv.innerHTML=`
      Sorry... The given name<strong>(${givenName})</strong> doesn't have any <strong>country_id's</strong>.`;
    }else if(probability[0]!==undefined && probability[1]===undefined){
      countryDiv.innerHTML=`
      <h5>Given Name: <strong>${givenName}</strong></h5>
      The given name<strong>(${givenName})</strong> has only one nationality <strong>i.e. ${countryID[0]}</strong> with probability of <strong>${probability[0]}</strong>.`;
    }
    else{
      countryDiv.innerHTML=`
      <h5>Given Name: <strong>${givenName}</strong></h5>
    The Top two countries where the given name<strong>(${givenName})</strong> nationalities are <strong>${countryID[0]}</strong> and <strong>${countryID[1]}</strong>
    with the probability value of <strong>${probability[0]}</strong> and <strong>${probability[1]}</strong>.`;
    }
    section.append(countryDiv);

    const data2= await fetch(`https://api.genderize.io/?name=${givenName}`, {method:"GET"});
    const genderData= await data2.json();
    console.log(genderData);

    genderDiv.innerHTML="";
    genderDiv.innerHTML=`
    <h5>Gender: <strong>${genderData.gender}</strong></h5>
    <h5>Gender Probability: <strong>${genderData.probability}</strong></h5>
    <h5>Gender Count: <strong>${genderData.count}</strong></h5>`;


    section.append(genderDiv);

    const data3= await fetch(`https://api.agify.io/?name=${givenName}`, {method:"GET"});
    const ageData=await data3.json();
    console.log(ageData);

    ageDiv.innerHTML="";
    ageDiv.innerHTML=`
    <h5>Age: <strong>${ageData.age}</strong></h5>
    <h5>Age Count: <strong>${ageData.count}</strong></h5>`;

    section.append(ageDiv);
  }
  
  catch(err){
    console.log("Error occured");
    countryDiv.innerHTML="";
    countryDiv.innerText=`
    😞	Sorry... some error have occured`;
    document.body.append(countryDiv);
  }
}



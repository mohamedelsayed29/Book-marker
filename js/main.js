let btnSubmit=document.getElementById('btnSubmit')
let btnUpdate=document.getElementById('btnUpdate')
let siteNameInput=document.getElementById('siteName')
let siteUrlInput=document.getElementById('siteUrl')
let alertSection=document.getElementById('alertSection')
let searchInput=document.getElementById('search')
let siteContainer=[]
var objectIndex= 0
if(localStorage.getItem('allSites')){
    siteContainer=JSON.parse(localStorage.getItem('allSites'));showSite();};

function addSite(){
    if(validName()&&validURL()){
        let site={
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value,
        }
        siteContainer.push(site)
        showSite()
        clear()
        localStorage.setItem('allSites',JSON.stringify(siteContainer))
    }else{
        alertSection.classList.remove('d-none')
    }
}
function showSite(){
    let cartona=""
    for(i=0;i<siteContainer.length;i++){
        cartona+=`
        <tr>
        <td>${i+1}</td>
        <td>${siteContainer[i].siteName}</td>
        <td><a target="_blank" href="${siteContainer[i].siteUrl}"><button class="btn btn-outline-info "><i class="fa-solid fa-eye pe-1  "></i>Visit</button></a></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash pe-1"></i>Delete</button></td>
        <td><button onclick="updateForm(${i})" class="btn btn-outline-warning"><i class="fa-solid fa-wrench pe-1"></i>Update</button></td>
        </tr>

        `
    }
    document.getElementById('demo').innerHTML=cartona
}
function clear(){
    siteNameInput.value=""
    siteUrlInput.value=""
}
function deleteSite(index){
    siteContainer.splice(index,1)
    showSite()
    localStorage.setItem('allSites',JSON.stringify(siteContainer))
}
function updateForm(index){
    siteNameInput.value=siteContainer[index].siteName
    siteUrlInput.value=siteContainer[index].siteUrl
    btnSubmit.classList.add('d-none')
    btnUpdate.classList.remove('d-none')
    objectIndex=index
}
function updateSite(){
    if(validName()&&validURL()&&siteNameInput.value&&siteUrlInput.value){
        siteContainer[objectIndex].siteName=siteNameInput.value
        siteContainer[objectIndex].siteUrl=siteUrlInput.value
        showSite()
        clear()
        btnSubmit.classList.remove('d-none')
        btnUpdate.classList.add('d-none')
        localStorage.setItem('allSites',JSON.stringify(siteContainer))    
    }else{
        alertSection.classList.remove('d-none')
    }
}

function validName() {
    let regexName=/^[a-zA-ZÀ-ÖØ-öø-ÿ'.\s-]{4,100}$/ ;
    if(regexName.test(siteNameInput.value)){
        siteNameInput.classList.replace('is-invalid', 'is-valid')
        return true
    }else{
        siteNameInput.classList.add('is-invalid')
        siteNameInput.classList.remove('is-valid')
        return false
    }
}
function validURL() {
    let regexURL= /^((https|http):\/\/([A-Z]|[a-z]|[0-9]){1,}(.com)?\/?)|(www.([A-Z]|[a-z]|[0-9]){1,}.com)$/;
    if(regexURL.test(siteUrlInput.value)){
        siteUrlInput.classList.replace('is-invalid', 'is-valid')
        return true
    }else{
        siteUrlInput.classList.add('is-invalid')
        siteUrlInput.classList.remove('is-valid')
        return false
    }
}

function closeAlert(){
    alertSection.classList.add('d-none')
}
searchInput.addEventListener('keyup',function (){
    let cartona=""
    for (let i = 0; i < siteContainer.length; i++) {   
            if(siteContainer[i].siteName.toLowerCase().includes(this.value.toLowerCase())){
                    cartona+=`
                    <tr>
                    <td>${i+1}</td>
                    <td>${siteContainer[i].siteName}</td>
                    <td><a target="_blank" href="${siteContainer[i].siteUrl}"><button class="btn btn-outline-info "><i class="fa-solid fa-eye pe-1  "></i>Visit</button></a></td>
                    <td><button onclick="deleteSite(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash pe-1"></i>Delete</button></td>
                    <td><button onclick="updateForm(${i})" class="btn btn-outline-warning"><i class="fa-solid fa-wrench pe-1"></i>Update</button></td>
                    </tr>
            
                    `
                }
                document.getElementById('demo').innerHTML=cartona
            }   
    }
)
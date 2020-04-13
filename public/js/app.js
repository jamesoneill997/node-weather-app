const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
try {
   
        const data = weatherForm.addEventListener('submit',(e)=>{

    
        event.preventDefault()
        const location = search.value
        var resultImage = document.getElementById("condition-image")

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        messageThree.textContent = ''
        resultImage.innerHTML = ''

        if (location.includes(';')){
            messageOne.textContent = 'Place does not exist. Please check spelling and try again.'
            messageTwo.textContent = ''
            messageThree.textContent = ''
            resultImage.innerHTML = ''
            }

        fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                messageThree.textContent = ''
                resultImage.innerHTML = ''
            }
            else{
                messageOne.textContent = 'Location: ' + data.address + ' || Local time: ' + data.time
                messageTwo.textContent =  'Temperature: ' + data.temp
                messageThree.textContent = 'Conditions: '+ data.conditions

                resultImage.innerHTML = '<img id="weather-image" src="/img/' + data.conditions.replace(/ /g,'') + '.jpg" alt="' + data.conditions + 'Image">'
                

                console.log(data)
            }
        })
    })
})
}
catch (TypeError) {
        messageOne.textContent = 'Place does not exist. Please check spelling and try again.'
        messageTwo.textContent = ''
        messageThree.textContent = ''


}
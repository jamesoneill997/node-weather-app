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
                if (data.conditions === 'Clear') {
                    resultImage.innerHTML = '<img id="weather-image" src="/img/clear.jpg" alt="Clear Image">'

                } else if(data.conditions === 'Sunny') {
                    resultImage.innerHTML = '<img id="weather-image" src="/img/sunny.jpg" alt="Other Image">'
                }
                
                else if(data.conditions === 'Hazy') {
                    resultImage.innerHTML = '<img id="weather-image" src="/img/hazy.jpg" alt="Other Image">'
                }
                
                else if(data.conditions === 'Rain') {
                    resultImage.innerHTML = '<img id="weather-image" src="/img/rainy.jpg" alt="Other Image">'
                }

                else if(data.conditions === 'Partly cloudy') {
                    resultImage.innerHTML = '<img id="weather-image" src="/img/partly-cloudy.jpeg" alt="Other Image">'
                }
                else if(data.conditions === 'Thundery outbreaks possible') {
                    resultImage.innerHTML = '<img id="weather-image" src="/img/thunder.jpg" alt="Other Image">'
                }
                
                else{
                    resultImage.innerHTML = ''
                }
                

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
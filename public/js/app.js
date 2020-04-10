const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
try {
   
        const data = weatherForm.addEventListener('submit',(e)=>{

    
        event.preventDefault()
        const location = search.value

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        messageThree.textContent = ''

        if (location.includes(';')){
            messageOne.textContent = 'Place does not exist. Please check spelling and try again.'
            messageTwo.textContent = ''
            messageThree.textContent = ''
            }

        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                messageThree.textContent = ''
            }
            else{
                messageOne.textContent = 'Location: ' + data.address
                messageTwo.textContent =  'Temperature: ' + data.temp
                messageThree.textContent = 'Conditions: '+ data.conditions[0]
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
const notificationForm = document.getElementById('form');
notificationForm.addEventListener('submit', async (e) => {
    e.preventDefault()


    let data = new FormData(notificationForm);

    const formDataObject = Object.fromEntries(data.entries())
    const jsonFormData = JSON.stringify(formDataObject)
    console.log(jsonFormData)

    await fetch ('/sendNotification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonFormData
    })

})


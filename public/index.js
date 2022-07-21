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





// const thisForm = document.getElementById('notificationForm');
// thisForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const formData = new FormData(thisForm).entries();
//     await fetch('/sendNotification', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(Object.fromEntries(formData))
//     })
//         // .then(res=> res.json())
//         // .then(res=> console.log(res))
//         .catch(err => console.log(err, "error is happen"))
// })
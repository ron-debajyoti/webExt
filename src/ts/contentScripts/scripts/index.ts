//const url = 'https://www.youtube.com/watch?v=gfcBswn2nH8'
window.onload = () => {
    //const currentUrl = window.location.href
    const items = document.getElementById('related')
    console.log(items)
    // fetch(currentUrl)
    //     .then((response) => {
    //         if (!response.ok) {
    //             console.log('error observed')
    //             throw new Error(response.statusText)
    //         }
    //         return response.text()
    //     })
    //     .then((response) => {
    //         // const parser = new DOMParser()
    //         // const doc = parser.parseFromString(response, 'text/xml')
    //         // console.log(doc.body)
    //         // // console.log(doc.getElementById('items'))

    //         const dom = document.createElement('div')
    //         dom.innerHTML = response
    //         console.log(
    //             dom.getElementsByClassName('ytd-compact-video-renderer')
    //         )
    //     })
    // chrome.tabs.query(
    //     {
    //         active: true,
    //         currentWindow: true,
    //     },
    //     (tabs) => {
    //         console.log(tabs)
    //         const items = document.getElementById('items')
    //         console.log(items)
    //     }
    // )
}

// window.onload = () => {
//     console.log('test')
//     document.body.style.backgroundColor = 'green'
// }

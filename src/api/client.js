
const client = {
    get(url){
        fetch(url)
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

    }
}
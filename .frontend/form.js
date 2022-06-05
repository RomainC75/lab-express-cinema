const getFormValues = () =>{
    console.log('click !')
    const title = document.getElementById('title').value
    const director = document.getElementById('director').value
    const stars = document.getElementById('stars').value
    const image = document.getElementById('image').value
    const description = document.getElementById('description').value
    const showtimes = document.getElementById('showtimes').value
    console.log(title,director,stars,image,description,showtimes)
    return[title,director,stars,image,description,showtimes]
}

const postNewMovie = async () =>{
    try{
        const arrayToSend = getFormValues()
        const ans = await axios.post("http://localhost:3000/movies",{
                title: arrayToSend[0],
                director: arrayToSend[1],
                stars: arrayToSend[2],
                image: arrayToSend[3],
                description: arrayToSend[4],
                showtimes: arrayToSend[5],
            })
        console.log('ans : ',ans)
        createNewMovieLine(ans.data)
    }catch(e){

    }
}




document.getElementById('submit').addEventListener('click',(e)=>{
    e.preventDefault()
    postNewMovie()
})
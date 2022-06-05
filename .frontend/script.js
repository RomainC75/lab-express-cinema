
const body = document.querySelector('tbody')

const displayDetails = async (id) =>{
    try{
        const {data} = await axios.get(`http://localhost:3000/movies/${id}`)
        const detailParent = document.querySelector(`td[data='${id}']`)
        console.log('------',detailParent)
        console.log('data -> ',data)
        
        //fill the stars List !
        const starUl = detailParent.querySelector('.starsList')
        data[0].stars.forEach(star=>{
            const starLi = document.createElement('li')
            starLi.textContent = star
            starUl.appendChild(starLi)
        })
        
        //fill the description 
        const descriptionP = detailParent.querySelector('.description')
        descriptionP.textContent=data[0].description

        //fill the showTime list ! 
        const showUl = detailParent.querySelector('.showTimeList')
        data[0].showtimes.forEach(show=>{
            const showLi = document.createElement('li')
            showLi.textContent = show
            showUl.appendChild(showLi)
        })
        detailParent.querySelector('.spinner').style.display='none'
        detailParent.querySelector('.toShowAfterFetching').style.display="block"
        return true
    }catch(e){
        return false
    }
    
}

const getMovies = async () =>{
    const {data} = await axios.get("http://localhost:3000/movies")
    console.log(data)
    data.forEach( movie=>{
        createNewMovieLine(movie)
    })
}


const deleteLine = (tr, movie) =>{
    tr.querySelector('.delete').addEventListener('click', async ()=>{
        const ans = await axios.delete(`http://localhost:3000/movies/${movie._id}`)
        console.log('delete ans : ',ans )
        ans && tr.remove()
    })
    
}

const createNewMovieLine = (movie) =>{
    const tr = document.createElement('tr')
        
        tr.innerHTML=`
            <tr>
                <td>${movie.title}</td>
                <td>${movie.director}</td>
                <td>
                <img
                    class="movieBanner"
                    src="${movie.image}"
                />
                </td>
                <td class="detailsParent">                  
                    <svg
                        class="detailsIcon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192 512"
                    >
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                        d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z"
                        />
                    
                    </svg>
                    <div class="details">
                        <div class="spinner"></div>
                        <div class="toShowAfterFetching">
                            <h2>Details</h2>
                            <p class="details__type"></p>
                            <ul class="starsList">
                            </ul>
                            <p class="details__type">Description</p>
                            <p class="description"></p>
                            <p class="details__type"> showTimes </p>
                            <ul class="showTimeList">  
                            </ul>
                        </div>
                    </div>
                </td>
                <td class="delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg></td>
            </tr>
        `
        body.appendChild(tr)
        const detailsParent = tr.querySelector('.detailsParent')
        console.log('detailsParent',detailsParent)
        detailsParent.setAttribute('data',movie._id)
        detailsParent.addEventListener('mouseenter', async()=>{
            console.log('is downloaded : ', detailsParent.getAttribute('downloaded'))
            if( detailsParent.getAttribute('downloaded')==null ){
                console.log('try to display')
                const displayed = await displayDetails(movie._id)
                displayed && detailsParent.setAttribute('downloaded','true')
            }  
        })
        
        deleteLine(tr, movie)
}


getMovies()






const URL = "http://apiforlearning.zendvn.com/api/videos/"
let arrIdVideo = JSON.parse(localStorage.getItem("idVideo"))
let content = ""

//////////////////////////////// AJAX GET FAVOURITE VIDEO FROM LOCALSTORAGE ///////////////////////////////


for (let i = 0; i < arrIdVideo.length; i++) {
    let idVideo = arrIdVideo[i]
    $.get(URL + `${idVideo}`, function(data) {
        console.log(data)
        let thumbnail = JSON.parse(data.thumbnail).high.url
        let view = JSON.parse(data.statistics).viewCount
        let like = JSON.parse(data.statistics).likeCount
        let comment = JSON.parse(data.statistics).dislikeCount
        content += `
        <div class="col-xs-12 col-sm-12 col-lg-4 id-${idVideo}">
            <div class="card card--list">
                <div class="row">
                    <div class="col-12">
                        <div class="card__cover">
                            <img src="${thumbnail}" alt="">
                            <a href="#modal-center" rel="modal:open" class="card__play video-sm" data="${data.youtube_id}">
                                <i class="icon ion-ios-play"></i>
                            </a>
                        </div>
                        <div>
                            <span><a style="color:white;display: block;overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;" href="#modal-center" rel="modal:open" class="video-sm" data="${data.youtube_id}">${data.title}</a></span>
                        </div>
                        <div class="card__rate icon-item">
                            <div>
                                <i class="fas fa-eye"> ${view}</i>
                                <i class="fas fa-heart" style="margin: 0 15px"> ${like}</i>
                                <i class="fas fa-comments"> ${comment}</i>
                            </div>
                            <div>
                                <button type="button" class="btn-in-love" data-id="${data.id}">Bỏ yêu thích</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        $(".love-video").html(content)
    })
}

//////////////////////// FUNCTION XỬ LÍ THÔNG BÁO /////////////////////////////////////////////

function notification() {
    Toastify({
        text: "Bạn vừa bỏ một video yêu thích",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #ff55a5, #ff5860)",
        }

        // Callback after click
    }).showToast();
}

//////////////////////////////// EVENT CLICK DON'T FAVOURITE VIDEO

$(document).on("click", ".btn-in-love", function() {
    let idVideo = $(this).attr("data-id")
    $(`.id-${idVideo}`).remove()
    let arr = arrIdVideo.filter(function(item) {
        return item != idVideo
    })
    arrIdVideo = arr
    localStorage.setItem("idVideo", JSON.stringify(arrIdVideo))
    notification()
})
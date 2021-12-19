const BASE_URL = "http://apiforlearning.zendvn.com/api/playlists"
let url = window.location.href;
url = new URL(url);
let id = url.searchParams.get("id");
let timeClick = 0
let arrId = []
let arrIdVideo = []
let idVideo = 0

///////////////////////////////////////////////////////// TEST LOCALSTORAGE /////////////////////////////

if (localStorage.getItem("id")) {
    arrId = JSON.parse(localStorage.getItem("id"))
}

if (localStorage.getItem("idVideo")) {
    arrIdVideo = JSON.parse(localStorage.getItem("idVideo"))
}

//////////////////////////////////////////////////////////// AJAX GET //////////////////////////////////////

$.get(BASE_URL + `/${id}`, function(data) {
    document.title = `MYtube - ${data.title}`
    $(".details__title").text(data.title)
    btn = `
    <button type="button" class="btn-love" data-id="${data.id}">Yêu thích</button>`
    $(".btn-l").append(btn)

    for (i of arrId) {
        if (i == id) {
            $(".btn-love").addClass("bg")
            $(".btn-love").text("Bỏ yêu thích")
            timeClick = 1
        }

    }
})

$.get(BASE_URL + `/${id}/videos`, function(data) {
    let content = ""
    $(data).each(function(i, val) {
        content += `
        <tr>
            <td style="padding: 15px 0" class="table-hover">${i+1} - <a href="#" class="a" youtube-id="${val.youtube_id}">${val.title}</a></td>
                <td><i class="fas fa-heart heart" style="color:white" data-id="${val.id}"></i></td>
        </tr>`
    })
    $(".accordion__list tbody").html(content)
    for (i of arrIdVideo) {
        for (j of $(".heart")) {
            if ($(j).data("id") == i) {
                $(j).addClass("color-heart")
            }
        }
    }
    $(".video").html(`${data[0].iframe}`)
})

/////////////////////////////////////////////////////////// FUNCTION XỬ LÍ THÔNG BÁO /////////////////////////////////////////////

function notification(text) {
    Toastify({
        text: text,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #ff55a5, #ff5860)",
        }

    }).showToast();
}

/////////////////////////////////////////////////////////////// EVENT SHOW VIDEO PLAYLIST//////////////////////////////////////////////

$(document).on("click", ".a", function(e) {
    e.preventDefault()
    console.log($(this).attr("youtube-id"))
    let id = $(this).attr("youtube-id")
    let link = "https://www.youtube.com/embed/" + id
    $(".video iframe").attr("src", link)
})

////////////////////////////////////////////////////// EVENT FAVOURITE PLAYLIST////////////////////////////////////////////

$(document).on("click", ".btn-love", function() {
    let id = $(this).attr("data-id")
    if (localStorage.getItem("id")) {
        arrId = JSON.parse(localStorage.getItem("id"))
    }
    if (timeClick++ % 2 == 0) {
        $(".btn-love").addClass("bg")
        $(".btn-love").text("Bỏ yêu thích")
        arrId.push(id)
        notification("Bạn vừa yêu thích một khóa học")
    } else {
        $(".btn-love").removeClass("bg")
        $(".btn-love").text("Yêu thích")
        let arr = arrId.filter(function(item) {
            return item != id
        })
        arrId = arr
        notification("Bạn vừa hủy một khóa học")
    }
    localStorage.setItem("id", JSON.stringify(arrId))
})

//////////////////////////////////////////////////////// EVENT FAVOURITE VIDEOS ///////////////////////////////////////////////

$(document).on("click", ".heart", function() {
    idVideo = $(this).data("id")
    if (localStorage.getItem("idVideo")) {
        arrIdVideo = JSON.parse(localStorage.getItem("idVideo"))
    }
    $(this).toggleClass("color-heart")
    if ($(this).hasClass("color-heart")) {
        arrIdVideo.push(idVideo)
        notification("Bạn vừa yêu thích một video")

    } else {
        let arrVideo = arrIdVideo.filter(function(item) {
            return item != idVideo
        })
        notification("Bạn vừa hủy yêu thích một video")
        arrIdVideo = arrVideo
    }
    localStorage.setItem("idVideo", JSON.stringify(arrIdVideo))

})
const URL = "http://apiforlearning.zendvn.com/api/playlists"

let idPlayList = [3, 9, 10]
let content = ""
let tab = ""
let btn = ""

///////////////////////////////////////////////////// AJAX GET 10 PLAYLIST CAROUSEL //////////////////////////////////////////////////////////


$.get(URL, { limit: 10 }, function (data) {
    $(data).each(function (i, val) {
        let thumbnail = JSON.parse(val.thumbnail).high.url
        let content = `<div class="item">
                            <!-- card -->
                                <div class="card card--big">
                                <div class="card__cover">
                        <img src="${thumbnail}" alt="">
                        <a href="details.html?id=${val.id}" target="_blank" class="card__play">
                            <i class="icon ion-ios-play"></i>
                        </a>
                    </div>
                        <div class="card__content">
                            <h3 class="card__title"><a href="details.html?id=${val.id}" target="_blank">${val.title}</a></h3>
                        </div>
                    </div>
                    <!-- end card -->
                    </div>`
            console.log(content)
        $('.owl-carousel').trigger('add.owl.carousel', [$(`${content}`), 0]).trigger('refresh.owl.carousel');
        $(".loading").html("")
    })
})

///////////////////////////////////////////////////// AJAX GET 12 VIDEO PLAYLIST //////////////////////////////////////////////////////////


for (let i = 0; i < idPlayList.length; i++) {
    let id = idPlayList[i]
    $.get(URL + `/${id}`, function (data) {
        let index = i + 1
        let active = i == 0 ? "active" : ""
        let ariaSelected = i == 0 ? "true" : "false"

        content = `
            <li class="nav-item">
                <a class="nav-link ${active}" data-toggle="tab" href="#tab-${index}" role="tab" aria-controls="tab-${index}" aria-selected="${ariaSelected}" data-id=${id}>${data.title}</a>
                
            </li>`

        $("#content__tabs").append(content)
    })
    $.get(URL + "/" + id + "/videos", { limit: 12 }, function (data) {
        let index = i + 1
        let active = i == 0 ? "show active" : ""

        let tab = `
            <div class="tab-pane fade ${active}" id="tab-${index}" role="tabpanel" aria-labelledby="${index}-tab">
                <div class="row tab${index}">
   `
        let contentTab = ""
        $(data).each(function (j, val) {
            let title = val.title
            let thumbnail = JSON.parse(val.thumbnail).high.url
            let view = JSON.parse(val.statistics).viewCount
            let like = JSON.parse(val.statistics).likeCount
            let comment = JSON.parse(val.statistics).dislikeCount
            contentTab += `
                    <div class="col-xs-12 col-sm-12 col-lg-4">
                        <div class="card card--list">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card__cover">
                                        <img src="${thumbnail}" alt="">
                                        <a href="#modal-center" rel="modal:open" class="card__play video-sm" data="${val.youtube_id}">
                                            <i class="icon ion-ios-play"></i>
                                        </a>
                                    </div>
                                    <div>
                                        <span><a style="color:white;display: block;overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;" href="#modal-center" rel="modal:open" class="video-sm" data="${val.youtube_id}">${title}</a></span>
                                    </div>
                                    <div class="card__rate">
                                        <i class="fas fa-eye"> ${view}</i>
                                        <i class="fas fa-heart" style="margin: 0 15px"> ${like}</i>
                                        <i class="fas fa-comments"> ${comment}</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
        })
        tab += contentTab
        tab +=
            `</div>
               <div class="col-12">
                 <a href="#" class="section__btn btn-learn" data-id=${id}>Xem khóa học</a>
                </div>
            </div>`
        $(".load-spinner").remove()
        $(".tab-content").append(tab)
    })
}

///////////////////////////////////////////////////// AJAX GET 1 PLAYLIST //////////////////////////////////////////////////////////

$.get(URL + "/" + "1/videos", { limit: 6 }, function (data) {
    content = ""
    $(data).each(function (i, val) {
        let title = val.title
        let thumbnail = JSON.parse(val.thumbnail).high.url
        let view = JSON.parse(val.statistics).viewCount
        let like = JSON.parse(val.statistics).likeCount
        let comment = JSON.parse(val.statistics).dislikeCount
        content += `
        <div class="col-xs-12 col-sm-12 col-lg-4">
            <div class="card card--list">
                <div class="row">
                    <div class="col-12">
                        <div class="card__cover">
                            <img src="${thumbnail}" alt="">
                            <a href="#modal-center" rel="modal:open" class="card__play video-sm" data="${val.youtube_id}">
                                <i class="icon ion-ios-play"></i>
                            </a>
                        </div>
                        <div>
                            <span><a style="color:white;display: block;overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;" href="#modal-center" rel="modal:open" class="video-sm" data="${val.youtube_id}">${title}</a></span>
                        </div>
                        <div class="card__rate">
                            <i class="fas fa-eye"> ${view}</i>
                            <i class="fas fa-heart" style="margin: 0 15px"> ${like}</i>
                            <i class="fas fa-comments"> ${comment}</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        $(".newVideo").html(content)
    })
})


///////////////////////////////////////////////////// EVENT //////////////////////////////////////////////////////////

$(document).on("click", ".btn-learn", function () {
    console.log($(this).attr("data-id"))
    let id = $(this).attr("data-id")
    $(".btn-learn").attr({
        href: `details.html?id=${id}`,
        target: "_blank"
    })
})

$(document).on("click", ".video-sm", function () {
    console.log($(this).attr("data"))
    let iframe = `
    <iframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/${$(this).attr("data")}\" frameborder=\"0\" allowfullscreen></iframe>
    <a href="#close-modal" rel="modal:close" class="close-modal ">Close</a>`
    $("#modal-center").html(iframe)
})
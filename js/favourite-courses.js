const URL = "http://apiforlearning.zendvn.com/api/playlists/"
let arrId = JSON.parse(localStorage.getItem("id"))
let content = ""
for (let i = 0; i < arrId.length; i++) {
    let id = arrId[i]
    $.get(URL + `${id}`, function(data) {
        let thumbnail = JSON.parse(data.thumbnail).high.url
        content += `
		<div class="item col-4 id-${data.id}">
			<!-- card -->
			<div class="card card--big">
				<button type="button" class="btn-in" data-id="${data.id}">Bỏ yêu thích</button>
				<div class="card__cover">
					<img src="${thumbnail}" alt="">
					<a href="details.html?id=${data.id}" target="_blank" class="card__play">
						<i class="icon ion-ios-play"></i>
					</a>
				</div>
				<div class="card__content">
					<h3 class="card__title"><a href="details.html?id=${data.id}" target="_blank">${data.title}</a></h3>
				</div>
			</div>
			<!-- end card -->
		</div>`
        $(".love-learn").html(content)
    })
}

$(document).on("click", ".btn-in", function() {
    let id = $(this).attr("data-id")
    console.log(typeof id)
    $(`.id-${id}`).remove()
    let arr = arrId.filter(function(item) {
        return item != id
    })
    arrId = arr
    localStorage.setItem("id", JSON.stringify(arrId))
    Toastify({
        text: "Bạn vừa bỏ yêu thích một khóa học",
        duration: 3000,
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
})
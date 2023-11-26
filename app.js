window.addEventListener("DOMContentLoaded", () => {
    const imgViewBox = document.querySelector(".image-view");
    const addImage = document.querySelector(".add-image-btn");
    const imgInputModel = document.querySelector(".image-input-box");
    const imgInputUrl = document.querySelector(".image-input-box input");
    const imgSubmitBtn = document.querySelector(".image-submit-btn");
    const image = document.querySelector(".image");
    const errorMsg = document.querySelector(".error");
    const imgEditForm = document.querySelector(".image-editor");
    const editOptions = imgEditForm.querySelectorAll("input[type='range']");

    // disable and enable `range inputs`
    const disabledInputs = (check = true) => {
        editOptions.forEach((option) => {
            option.disabled = check;
        });
    }

    disabledInputs();

    // This function for Image Editing
    const editing = () => {
        imgEditForm.addEventListener("input", () => {
            // edit option values
            let blur = editOptions[0].value;
            let brightness = editOptions[1].value;
            let contrast = editOptions[2].value;
            let grayscale = editOptions[3].value;
            let opacity = editOptions[4].value;
            let saturate = editOptions[5].value;

            // apply filter styles
            if (image.complete && image.naturalWidth !== 0) {
                let filterValue = `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) opacity(${opacity}%) saturate(${saturate}%)`;

                image.style.filter = filterValue;
            }
        });
    }

    addImage.addEventListener("click", () => {
        imgInputModel.classList.add("active");
        imgInputUrl.focus();

        imgSubmitBtn.addEventListener("click", () => {
            let imgUrl = imgInputUrl.value;

            // Check if the image URL is empty or invalid
            if (imgUrl.length > 0 && (imgUrl.startsWith("https://") || imgUrl.startsWith("http://"))) {
                errorMsg.style.visibility = "";
                imgInputModel.classList.remove("active");
                imgViewBox.classList.add("image-active");
                image.src = imgUrl; // Set the image `URL` into the `src` attribute.

                disabledInputs(false);
                editing();
            } else {
                errorMsg.style.visibility = "visible";
                imgViewBox.classList.remove("image-active");
                disabledInputs();
            }
        });
    });
});
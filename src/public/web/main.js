document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("submit").addEventListener("click", () => {
        const fileInput = document.getElementById("csv");
        
        if (fileInput.files.length === 0) {
            return;
        }
    
        const file = fileInput.files[0];
    
        const formData = new FormData();
        formData.append("file", file);
    
        fetch("/api/csv", {
            method: "POST",
            body: formData
        }).then((response) => {
            return response.text();
        }
        ).then((text) => {
            alert(text);
        }
        ).catch((error) => {
            alert(error);
        });
    })
});
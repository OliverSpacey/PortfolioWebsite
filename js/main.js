var current_hovered = null

// Listen for mouse events on the floppy disks - if selected, display relevant content
function addListeners() {
    const disks = document.getElementsByClassName("floppy-disk")

    for (let disk of disks) {
        disk.addEventListener("mouseenter", function() {
            current_hovered = disk
            console.log("Mouse in")
        })

        disk.addEventListener("mouseleave", function() {
            current_hovered = null
            console.log("Mouse out")
        })
    };
}

function debugPrint() {
    console.log("Debug fired")
}

addListeners()
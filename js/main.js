// Listen for mouse events on the floppy disks - if selected, display relevant content
function addListeners() {
    const disks = document.getElementsByClassName("floppy-disk")

    for (let disk of disks) {
        disk.addEventListener("click", function() {
            selectDisk(disk)
        })
    };
}

function selectDisk(disk) {
    console.log(disk)
}